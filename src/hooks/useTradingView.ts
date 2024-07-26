import { myexUpdateUserParameter } from '@myex/app/serverActions/myexUserParameter';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import {
  setCurrentCurrency,
  toggleFavorite,
  toggleShowFavorites,
  toggleShowTradingView,
} from '@myex/store/trading/actions';
import {
  selectCurrentCurrency,
  selectFavorites,
  selectShowFavorites,
  selectShowTradingView,
} from '@myex/store/trading/selectors';
import { SystemParameter } from '@myex/types/system';
import { toggleItemInArray } from '@myex/utils/array';
import { isOnServer } from '@myex/utils/window';

export default function useTradingView(
  showTradingViewServer: boolean = false,
  currentCurrencyServer: string = 'BTC',
) {
  const dispatch = useMyexDispatch();
  const showTradingViewClient = useMyexSelector(selectShowTradingView);
  const currentCurrencyClient = useMyexSelector(selectCurrentCurrency);
  const showTradingView = isOnServer() ? showTradingViewServer : showTradingViewClient;
  const currentCurrency = isOnServer() ? currentCurrencyServer : currentCurrencyClient;

  const setCurrentCurrencySync = (currency: string) => {
    dispatch(setCurrentCurrency(currency?.toUpperCase()));
    myexUpdateUserParameter(SystemParameter.CurrentCurrency, currency?.toUpperCase());
  };

  const toggleShowTradingViewSync = () => {
    dispatch(toggleShowTradingView());
    myexUpdateUserParameter(SystemParameter.ShowTradingView, String(!showTradingView));
  };

  return {
    showTradingView,
    currentCurrency,
    toggleShowTradingViewSync,
    setCurrentCurrencySync,
  };
}
