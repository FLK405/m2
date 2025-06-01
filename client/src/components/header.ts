import "../stagewise.js";
import { html } from "../utils.js";
import { LoginForm } from "./login.js";

const template = html`
    <style>
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            text-decoration: none;
        }

        .search-container {
            flex: 1;
            max-width: 600px;
            margin: 0 2rem;
        }

        .search-input {
            width: 100%;
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        .search-input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.2);
        }

        .user-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .login-btn {
            padding: 0.5rem 1rem;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-size: 14px;
        }

        .login-btn:hover {
            background-color: #357abd;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
        }
    </style>
    <header class="header">
        <a
            href="/"
            class="logo"
            >材料基因数据库</a
        >
        <div class="search-container">
            <input
                type="search"
                class="search-input"
                placeholder="搜索材料、基因、数据..."
            />
        </div>
        <div class="user-section">
            <a
                href="/user/login.html"
                class="login-btn"
                >登录</a
            >
        </div>
    </header>
`;

export class Header extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });

    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.init();
    }

    private init(): void {
        // 添加登录按钮点击事件
        this.addLoginButtonListener();
    }

    private addLoginButtonListener(): void {
        const loginBtn = this.#sr.querySelector(".login-btn");
        console.log("loginBtn", loginBtn);
        if (loginBtn) {
            loginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const loginForm = new LoginForm();
                document.body.appendChild(loginForm);
            });
        }
    }
}

// 注册自定义元素
customElements.define("material-header", Header);
