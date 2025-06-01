import express from "express";
import spinningProcessRoutes from "./spinning_process/index.js";
import userRoutes from "./user/index.js";

const app = express();
const PORT = 8080;

// 中间件配置
app.use(function (req, res, next) {
    console.log("url: " + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 注册路由
app.use("/api/user", userRoutes);
app.use("/api", spinningProcessRoutes);

// 基本路由
app.get("/", (_req, res) => {
    res.json({ message: "服务器运行正常" });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT} 上运行`);
});
