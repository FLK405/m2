import "./components/header.js";
import "./components/main.js";
import { MainContent } from "./components/main.js";
import "./stagewise.js";

const main = new MainContent();

// 初始化页面
document.body.appendChild(main);
