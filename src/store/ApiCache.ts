import { nowMs } from '@myex/utils/moment';

type CacheKey = string;

type CacheValue = {
  /** Each cache item is allowed to have different expire time */
  expireTime: number;
  data: any;
};

// By default, cache expires in 1 minute
export const DEFAULT_CACHE_EXPIRE_TIME = 60 * 1000;

export default class ApiCache {
  private cache: Record<CacheKey, CacheValue> = {};

  constructor() {}

  /**
   * Print the cache for debugging
   */
  public printCache(): void {
    console.debug('cache', this.cache);
  }

  /**
   * Whether the data is cached
   * @param cacheKey
   */
  public isDataCached(cacheKey: string): boolean {
    if (this.expired(cacheKey)) {
      delete this.cache[cacheKey];
      return false;
    }

    return this.cache[cacheKey] !== undefined;
  }

  /**
   * Remove expired data items in cache
   * @private
   */
  private removeExpired(): void {
    Object.keys(this.cache).forEach((key) => {
      if (this.expired(key)) {
        delete this.cache[key];
      }
    });
  }

  /**
   * Whether the data in cache has expired
   * @param key
   */
  private expired(key: string): boolean {
    const cachedValue: CacheValue = this.cache[key];
    return nowMs() >= (cachedValue?.expireTime || 0);
  }

  /**
   * Get data from cache.
   * @note remove from cache if it's expired already.
   * @param key
   */
  public get(key: string): unknown {
    if (this.expired(key)) {
      delete this.cache[key];
      return undefined;
    }
    console.debug('Cache Hit!', key);
    return this.cache[key]?.data;
  }

  /**
   * Set data in cache
   * @note remove expired items so that the cache won't grow too big
   *
   * @param key
   * @param data
   * @param cachedDurationMs
   */
  public put(
    key: string,
    data: CacheValue['data'],
    cachedDurationMs: number = DEFAULT_CACHE_EXPIRE_TIME,
  ): void {
    this.removeExpired();
    this.cache[key] = {
      expireTime: nowMs() + cachedDurationMs,
      data,
    };
  }
}
