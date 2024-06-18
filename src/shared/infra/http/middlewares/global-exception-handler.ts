/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '@/shared/errors/app-error'
import { ResHelper } from '@/shared/helpers/reponse-helper'
import { NextFunction, Request, Response } from 'express'

export const globalExceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof AppError) {
    return ResHelper.sendResponse({
      res,
      status: err.statusCode,
      message: err.message,
    })
  }

  console.log('Error: ', err)

  return ResHelper.sendResponse({
    res,
    status: 500,
    message: 'Internal server error.',
  })
}
