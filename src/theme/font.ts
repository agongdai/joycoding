import { Lato, Outfit, Space_Mono } from 'next/font/google';

const outfitFont = Outfit({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

const latoFont = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const fonts = {
  default: outfitFont,
  spaceMono,
};

export default fonts;
