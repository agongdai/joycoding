export enum SystemParameter {
  MiniSidebarOpen = 'dom.miniSidebarOpen',
  MobileSidebarOpen = 'dom.mobileSidebarOpen',
  IsMobile = 'dom.isMobile',
  Theme = 'dom.theme',
  Favorites = 'trading.favorites',
  ShowFavorites = 'trading.showFavorites',
  WsLive = 'trading.wsLive',
}

export type SystemParameterSettings = Record<SystemParameter, string>;

export const EmptySystemParameterSettings = {} as SystemParameterSettings;

export const DefaultSystemParameterSettings: SystemParameterSettings = {
  [SystemParameter.MiniSidebarOpen]: 'false',
  [SystemParameter.MobileSidebarOpen]: 'false',
  [SystemParameter.IsMobile]: 'false',
  [SystemParameter.Theme]: 'dark',
  [SystemParameter.Favorites]: '"[]"',
  [SystemParameter.ShowFavorites]: 'false',
  [SystemParameter.WsLive]: '"[]"',
};
