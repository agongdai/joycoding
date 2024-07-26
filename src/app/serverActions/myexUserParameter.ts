'use server';

import { headers } from 'next/headers';
import { userAgent } from 'next/server';

import { auth } from '@myex/auth';
import { prisma } from '@myex/db';
import { HttpStatusCode } from '@myex/types/api';
import {
  EmptySystemParameterSettings,
  SystemParameter,
  SystemParameterSettings,
} from '@myex/types/system';
import { apiFailure, apiSuccess } from '@myex/utils/api';
import { isMobile } from '@myex/utils/window';
import { Parameter, UserParameter } from '@prisma/client';

/**
 * Get the system parameter settings for the current user
 * Returns: SystemParameterSettings, like { 'parameterName': 'parameterValue' }
 * @param allParameters
 * @param userParameters
 */
function getSystemParameterSettings(
  allParameters: Parameter[],
  userParameters: UserParameter[] = [],
) {
  const myexIdToKeyMap = allParameters.reduce(
    (acc, parameter) => {
      acc[parameter.myexId] = parameter.name;
      return acc;
    },
    {} as { [key: number]: string },
  );

  // If no user parameters are there, return default settings.
  if (userParameters.length === 0) {
    return allParameters.reduce((acc, parameter) => {
      acc[parameter.name as SystemParameter] = parameter.defaultValue || '';
      return acc;
    }, EmptySystemParameterSettings);
  }

  const parameters = userParameters.reduce((acc, parameter) => {
    acc[myexIdToKeyMap[parameter.parameterMyexId] as SystemParameter] = parameter.value;
    return acc;
  }, EmptySystemParameterSettings);
  parameters[SystemParameter.IsMobile] = `${isMobile(headers().get('User-Agent') || '')}`;

  return parameters;
}

/**
 * Fetch all parameters for the current user
 */
export async function myexFetchUserParameters() {
  const session = await auth();
  if (!session?.user) {
    const allParameters = await prisma.parameter.findMany();
    return apiSuccess<SystemParameterSettings>(getSystemParameterSettings(allParameters));
  }

  const userMyexId = session.user.myexId;

  try {
    const allParameters = await prisma.parameter.findMany();

    const userParameters = await prisma.userParameter.findMany({
      where: { userMyexId },
    });

    if (userParameters.length > 0) {
      return apiSuccess<SystemParameterSettings>(
        getSystemParameterSettings(allParameters, userParameters),
      );
    }

    const newUserParameters = await Promise.all(
      allParameters.map((parameter) =>
        prisma.userParameter.create({
          data: {
            userMyexId,
            parameterMyexId: parameter.myexId,
            value: parameter.defaultValue || '',
          },
        }),
      ),
    );

    return apiSuccess<SystemParameterSettings>(
      getSystemParameterSettings(allParameters, newUserParameters),
    );
  } catch (e) {
    return apiFailure();
  }
}

/**
 * For admin to update a parameter
 * @param myexId
 * @param parameterName
 * @param parameterValue
 */
export async function myexUpdateUserParameter(parameterName: string, parameterValue: string) {
  const session = await auth();
  if (!session?.user) {
    return apiFailure(HttpStatusCode.Unauthorized);
  }

  // Get the parameter by name
  const parameter = await prisma.parameter.findFirst({
    where: {
      name: parameterName,
    },
  });

  if (!parameter) {
    return apiFailure(HttpStatusCode.NotFound);
  }

  // Get user's parameter, which should be there if nothing wrong.
  const userParameter = await prisma.userParameter.findFirst({
    where: {
      userMyexId: session.user.myexId,
      parameterMyexId: parameter.myexId,
    },
  });

  if (!userParameter) {
    return apiFailure(HttpStatusCode.NotFound);
  }

  try {
    const updated = await prisma.userParameter.update({
      where: { myexId: userParameter.myexId },
      data: {
        ...userParameter,
        value: parameterValue,
      },
    });

    return apiSuccess<UserParameter>(updated);
  } catch (e) {
    return apiFailure();
  }
}
