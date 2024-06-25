'use server';

import { setTimeout } from 'timers/promises';

export async function sleep(ms) {
  await setTimeout(ms);
}
