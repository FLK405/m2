/**
 * 用户管理路由模块
 * 包含用户相关的所有路由处理
 * 如：注册、登录、信息修改等
 */

import { Router } from "express";
import register from "./register.js";

// 创建路由实例
const router = Router();
router.use(function (req, _res, next) {
    console.log("url: " + req.url, req.method);
    next();
});
router.post("/register", register);

// 导出路由实例
export default router;
