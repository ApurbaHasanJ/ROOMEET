import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
};

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   const response: any = {
//     success: data?.success,
//     statusCode: data?.statusCode,
//     message: data?.message,
//     token: data.token && data.token,
//     data : data?.data,
//   };

// Conditionally add the token if it exists
// if (data?.token) {
//   response.token = data.token;
// }
//   res.status(data?.statusCode).json(response);
// };

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    token: data.token && data.token,
    data: data?.data,
  });
};

export default sendResponse;
