export interface IFormNewCoin {
  name: string;
  currency: string;
  projectUrl: string;
  cmcUrl: string;
  rating: number;
  icon?: string | null;
  exchangeSymbols?: string | null;
}
