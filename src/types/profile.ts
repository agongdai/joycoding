import { Status } from '@jses/types/common';

export type Feature = {
  name: string;
  description: string;
  url: string;
};

export type WorkExp = {
  hidden?: boolean;
  company: string;
  companyUrl: string;
  companyLogo: string;
  startDate: string;
  endDate: string;
  title: string;
  responsibilities: string[];
  projects: string[];
};

export type Project = {
  hidden?: boolean;
  slug: string;
  company: string;
  companyLogo: string;
  companyUrl: string;
  description: string;
  endDate: string;
  facebook?: string;
  features: Feature[];
  github?: string;
  image: string;
  video: string;
  name: string;
  startDate?: string;
  tags: string[];
  title: string;
  url: string;
  authRequired: boolean;
  status: Status;
  responsibilities: string[];
};
