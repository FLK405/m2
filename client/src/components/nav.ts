import "../stagewise.js";
import { html } from "../utils.js";

const template = html`
    <style>
        :host {
            display: block;
            width: 250px;
            background-color: #fff;
            box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            height: fit-content;
        }

        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .nav-item {
            padding: 0;
            margin: 0;
        }

        .nav-link {
            display: flex;
            align-items: center;
            padding: 12px 24px;
            color: #333;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
            cursor: pointer;
        }

        .nav-link:hover {
            background-color: #f5f5f5;
            color: #4a90e2;
            border-left-color: #4a90e2;
        }

        .nav-link.active {
            background-color: #f0f7ff;
            color: #4a90e2;
            border-left-color: #4a90e2;
        }

        .nav-icon {
            margin-right: 12px;
            font-size: 20px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
    <nav>
        <ul class="nav-list">
            <li class="nav-item">
                <a
                    href="/"
                    class="nav-link"
                >
                    <span class="nav-icon">🏠</span>
                    首页
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/resin-spinning"
                    class="nav-link"
                >
                    <span class="nav-icon">🧪</span>
                    前端树脂与纺丝工艺
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/fiber-properties"
                    class="nav-link"
                >
                    <span class="nav-icon">📊</span>
                    纤维性能
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/microstructure"
                    class="nav-link"
                >
                    <span class="nav-icon">🔬</span>
                    微观结构特征
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/resin-interface"
                    class="nav-link"
                >
                    <span class="nav-icon">⚛️</span>
                    树脂及界面性能
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/composite-structure"
                    class="nav-link"
                >
                    <span class="nav-icon">🏗️</span>
                    复合材料结构与性能
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/ballistic-performance"
                    class="nav-link"
                >
                    <span class="nav-icon">🛡️</span>
                    终端产品防弹性能
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="/literature-standards"
                    class="nav-link"
                >
                    <span class="nav-icon">📚</span>
                    文献与标准
                </a>
            </li>
        </ul>
    </nav>
`;

export class Navigation extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });

    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.init();
    }

    private init(): void {
        // 获取当前路径
        const currentPath = window.location.pathname;

        // 为当前页面的导航链接添加active类
        const navLinks = this.#sr.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }

            // 添加点击事件监听器
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const path = link.getAttribute("href");
                if (path) {
                    // 移除所有active类
                    navLinks.forEach((l) => l.classList.remove("active"));
                    // 添加active类到当前点击的链接
                    link.classList.add("active");
                    // 触发自定义事件
                    this.dispatchEvent(
                        new CustomEvent("nav-click", {
                            detail: { path },
                            bubbles: true,
                            composed: true,
                        })
                    );
                }
            });
        });
    }
}

// 注册自定义元素
customElements.define("material-nav", Navigation);
