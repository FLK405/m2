import "../stagewise.js";
import { html } from "../utils.js";

const template = html`
    <style>
        .welcome-section {
            text-align: center;
            margin-bottom: 3rem;
        }

        .welcome-section h1 {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 1rem;
        }

        .welcome-section p {
            font-size: 1.2rem;
            color: #666;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-card h3 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .feature-card p {
            color: #666;
            line-height: 1.6;
        }
    </style>
    <section class="welcome-section">
        <h1>欢迎使用材料基因数据库</h1>
        <p>这是一个专注于材料基因工程研究的综合数据库平台， 为您提供全面的材料基因数据查询、分析和研究支持。</p>
    </section>

    <section class="features">
        <div class="feature-card">
            <h3>数据查询</h3>
            <p>提供全面的材料基因数据查询功能， 支持多维度、多条件的高级搜索。</p>
        </div>
        <div class="feature-card">
            <h3>数据分析</h3>
            <p>强大的数据分析工具， 帮助您深入理解材料基因之间的关系。</p>
        </div>
        <div class="feature-card">
            <h3>研究支持</h3>
            <p>为材料基因工程研究提供全方位支持， 助力科研创新。</p>
        </div>
    </section>
`;

export class HomeContent extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });

    constructor() {
        super();
        this.#sr.innerHTML = template;
    }
}

// 注册自定义元素
customElements.define("home-content", HomeContent);
