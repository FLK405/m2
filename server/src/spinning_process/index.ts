import { Router } from "express";
import add from "./add.js";
// import del from "./delete.js";
// import get from "./get.js";
import list from "./list.js";
// import update from "./update.js";

const router = Router();

// 创建新记录
router.post("/spinningProcess.create", add);

// 获取记录列表
router.post("/spinningProcess.list", list);

// // 获取单条记录
// router.post("/spinningProcess.get", get);

// // 更新记录
// router.post("/spinningProcess.update", update);

// // 删除记录
// router.post("/spinningProcess.delete", del);

export default router;
