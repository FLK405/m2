import { Request, Response, NextFunction } from "express";

/**
 * 定义路由处理函数
 * @param handler 路由处理函数
 * @returns 路由处理函数
 */
export function defineHandler(
    handler: (req: Request, res: Response, next?: NextFunction) => void | Promise<void | Response>
) {
    return handler;
}
