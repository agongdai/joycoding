export type Locale = 'en' | 'zh';

export type Language = {
  code: Locale;
  name: string;
};

export type ParamsWithLng = {
  lang: Locale;
};
