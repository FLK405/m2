import "../stagewise.js";
import { html } from "../utils.js";

/**
 * 注册组件的模板定义
 * 包含样式和HTML结构
 */
const template = html`
    <style>
        /* 组件根元素样式 */
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* 遮罩层样式 */
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        /* 注册容器样式 */
        .register-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            position: relative;
        }

        /* 关闭按钮样式 */
        .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
            transition: color 0.3s ease;
        }

        .close-btn:hover {
            color: #333;
        }

        /* 注册头部样式 */
        .register-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-right: 2rem;
        }

        .register-header h1 {
            font-size: 1.8rem;
            color: #333;
            margin-bottom: 0.5rem;
        }

        /* 表单组样式 */
        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-size: 0.9rem;
        }

        .required::after {
            content: " *";
            color: #ff4d4f;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.2);
        }

        /* 注册按钮样式 */
        .register-btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .register-btn:hover {
            background-color: #357abd;
        }

        /* 注册页脚样式 */
        .register-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: #666;
        }

        .register-footer a {
            color: #4a90e2;
            text-decoration: none;
        }

        .register-footer a:hover {
            text-decoration: underline;
        }

        /* 错误消息样式 */
        .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: none;
        }

        .error-message.show {
            display: block;
        }
    </style>
    <div
        class="overlay"
        id="overlay"
    ></div>
    <div class="register-container">
        <button
            class="close-btn"
            id="closeBtn"
        >
            &times;
        </button>
        <div class="register-header">
            <h1>用户注册</h1>
        </div>
        <form id="registerForm">
            <div class="form-group">
                <label
                    for="username"
                    class="required"
                    >用户名</label
                >
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="请输入用户名"
                />
            </div>
            <div class="form-group">
                <label
                    for="password"
                    class="required"
                    >密码</label
                >
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="请输入密码"
                />
            </div>
            <div class="form-group">
                <label
                    for="confirmPassword"
                    class="required"
                    >确认密码</label
                >
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="请再次输入密码"
                />
            </div>
            <div
                class="error-message"
                id="errorMessage"
            ></div>
            <button
                type="submit"
                class="register-btn"
            >
                注册
            </button>
        </form>
        <div class="register-footer">
            已有账号？<a
                href="#"
                id="loginLink"
                >去登录</a
            >
        </div>
    </div>
`;

interface RegisterFormData {
    username: string;
    password: string;
}

/**
 * 注册表单组件
 * 提供用户注册功能，包括：
 * - 用户名和密码输入
 * - 密码确认
 * - 表单验证
 * - 注册请求处理
 * - 错误信息显示
 */
export class RegisterForm extends HTMLElement {
    /** Shadow DOM 根节点 */
    readonly #sr = this.attachShadow({ mode: "open" });

    /** 注册表单元素 */
    private form: HTMLFormElement;

    /**
     * 构造函数
     * 初始化组件，设置模板和事件监听
     */
    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.form = this.#sr.querySelector("#registerForm") as HTMLFormElement;
        this.init();
    }

    /**
     * 初始化组件
     * 设置表单提交、关闭按钮、遮罩层和登录链接的点击事件
     */
    private init(): void {
        const closeBtn = this.#sr.getElementById("closeBtn")!;
        const overlay = this.#sr.getElementById("overlay")!;
        const loginLink = this.#sr.getElementById("loginLink")!;

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        closeBtn.addEventListener("click", () => this.remove());
        overlay.addEventListener("click", () => this.remove());
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            this.remove();
            const loginForm = document.createElement("material-login");
            document.body.appendChild(loginForm);
        });
    }

    /**
     * 处理表单提交
     * 验证密码并发送注册请求
     * @param event 表单提交事件
     */
    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const formData = new FormData(this.form);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            const errorMessage = this.#sr.getElementById("errorMessage")!;
            errorMessage.textContent = "两次输入的密码不一致";
            errorMessage.classList.add("show");
            return;
        }

        const data: RegisterFormData = {
            username: formData.get("username") as string,
            password: password,
        };

        try {
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.code === 0) {
                // 注册成功，移除注册表单并显示登录表单
                this.remove();
                const loginForm = document.createElement("material-login");
                document.body.appendChild(loginForm);
            } else {
                // 显示错误信息
                const errorMessage = this.#sr.getElementById("errorMessage")!;
                errorMessage.textContent = result.message || "注册失败";
                errorMessage.classList.add("show");
            }
        } catch (error) {
            console.error("注册失败:", error);
            const errorMessage = this.#sr.getElementById("errorMessage")!;
            errorMessage.textContent = "网络错误，请稍后重试";
            errorMessage.classList.add("show");
        }
    }
}

// 注册自定义元素
customElements.define("register-form", RegisterForm);
