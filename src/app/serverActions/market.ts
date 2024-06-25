import { myexFetchCoins } from '@myex/app/serverActions/myexCoin';
import { ApiResponse, HttpStatusCode } from '@myex/types/api';
import { MarketCoin } from '@myex/types/coin';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { CoinGeokoApiBaseUrl } from '@myex/utils/endpoints';
import { Coin } from '@prisma/client';

export async function fetchMarketCoins(): Promise<ApiResponse<MarketCoin[]>> {
  const coins = await myexFetchCoins();
  const coinGeokoIdsStr = coins.map((coin: Coin) => coin.coinGeckoId || '').join(',');

  try {
    console.debug('fetching coins from GeokoCoin ...');
    const res = await fetch(
      `${CoinGeokoApiBaseUrl}/coins/markets?ids=${coinGeokoIdsStr}&vs_currency=usd&price_change_percentage=24h`,
      {
        // @ts-ignore
        headers: {
          'x-cg-api-key': process.env.COIN_GEOKO_API_KEY,
        },
        cache: 'force-cache',
      },
    );
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error('Error fetching market coins:', data);
      return apiFailure(HttpStatusCode.BadRequest, 'Geoko API failed to fetch your coins');
    }

    const marketCoins = (data || []).map((coin: any) => {
      const coinInMyex = coins.find((c: Coin) => c.currency.toLowerCase() === coin.symbol);
      return {
        geckoId: coin.id,
        currency: coin.symbol.toUpperCase(),
        image: coin.image,
        price: coin.current_price,
        priceChangePercentage24h: coin.price_change_percentage_24h,
        priceHigh24h: coin.high_24h,
        priceLow24h: coin.low_24h,
        marketCap: coin.market_cap,
        marketCapRank: coin.market_cap_rank,
        volume24h: coin.total_volume, // ??
        lastUpdated: coin.last_updated,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
        rating: coinInMyex?.rating || 0,
        myexCoin: coinInMyex,
        exchanges: coinInMyex?.exchanges || '',
      } as MarketCoin;
    });
    return apiSuccess<MarketCoin[]>(marketCoins);
  } catch (error) {
    console.error('Error fetching market coins:', error);
    return apiFailure(HttpStatusCode.BadRequest, 'Geoko API failed to fetch your coins');
  }
}
