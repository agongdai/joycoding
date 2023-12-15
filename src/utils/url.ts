import slugify from 'slugify';

export const prefixSlash = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const jsesSlugify = (s: string) => slugify(s, { remove: /[*+~.()'"!:@]/g, lower: true });
