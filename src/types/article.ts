import { Document } from '@contentful/rich-text-types';

export type ContentfulDocument = Document;

export type Author = {
  name: string;
  picture: {
    url: string;
  };
};

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

export interface ContentfulEntry {
  sys: {
    id: string;
  };
  title: string;
  type: string;
  snippet: string;
  __typename: string;
}

interface ContentfulAssetLink {
  block: ContentfulAsset[];
}

interface ContentfulEntryLink {
  block: ContentfulEntry[];
}

export interface ContentfulContent {
  json: Document;
  links: {
    assets: ContentfulAssetLink;
    entries: ContentfulEntryLink;
  };
}

export type Article = {
  slug: string;
  title: string;
  demoRepo: string;
  date: string;
  thumbnail: {
    url: string;
  };
  image: {
    url: string;
  };
  excerpt: string;
  author: Author;
  tags?: string[];
  content: ContentfulContent;
};
