'use server';

import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import { IFormNewParameter } from '@myex/types/parameter';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { Parameter } from '@prisma/client';

/**
 * For admin to fetch all parameters
 */
export async function myexFetchParameters() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }
  return apiSuccess<Parameter[]>(await prisma.parameter.findMany({}));
}

/**
 * For admin to fetch a parameter by its ID
 */
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

/**
 * For admin to create a parameter
 * @param parameter
 */
export async function myexCreateParameter(parameter: IFormNewParameter) {
  try {
    const created = await prisma.parameter.create({
      data: parameter,
    });
    return apiSuccess<Parameter>(created);
  } catch (e) {
    return apiFailure();
  }
}

/**
 * For admin to update a parameter
 * @param myexId
 * @param parameter
 */
export async function myexUpdateParameter(myexId: number, parameter: IFormNewParameter) {
  try {
    const updated = await prisma.parameter.update({
      where: { myexId },
      data: parameter,
    });
    return apiSuccess<Parameter>(updated);
  } catch (e) {
    return apiFailure();
  }
}
