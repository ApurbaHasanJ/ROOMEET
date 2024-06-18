import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
  };

  // Conditionally add the token if it exists
  if (data?.token) {
    response.token = data.token;
  }

  response.data = data?.data;
  res.status(data?.statusCode).json(response);
};

export default sendResponse;
