import { Response } from 'express'

interface ISendResponse {
  res: Response
  status: number
  message?: string
  data?: any
}

class ResponseHelper {
  public sendResponse({ res, status, message, data }: ISendResponse): Response {
    return res.status(status).json({
      status: status,
      message: message ? message : '',
      data: data ? data : {},
    })
  }
}

export const ResHelper = new ResponseHelper()
