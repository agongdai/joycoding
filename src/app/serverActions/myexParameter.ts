'use server';

import { prisma } from '@myex/db';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { Parameter } from '@prisma/client';

export async function myexFetchParameters(): Promise<Parameter[]> {
  return prisma.parameter.findMany({});
}

export async function myexSetParameterEnabled(myexId: number, enabled: boolean) {
  try {
    const updated = await prisma.parameter.update({
      where: { myexId },
      data: { enabled },
    });
    return apiSuccess<Parameter>(updated);
  } catch (e) {
    return apiFailure();
  }
}
