import "../stagewise.js";
import { html } from "../utils.js";
import "./home-content.js";
import "./nav.js";
import "./resin-spinning-content.js";

const template = html`
    <style>
        :host {
            display: block;
            min-height: 100vh;
            background-color: #f5f5f5;
        }

        .main-content {
            padding: 2rem 0 0 0;
            display: flex;
            gap: 2rem;
            margin: 0 auto;
        }

        .content-wrapper {
            flex: 1;
            max-width: 1200px;
        }
    </style>
    <main class="main-content">
        <material-nav></material-nav>
        <div class="content-wrapper">
            <home-content></home-content>
        </div>
    </main>
`;

export class Body extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });

    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.init();
    }

    private init(): void {
        const nav = this.#sr.querySelector("material-nav");
        const contentWrapper = this.#sr.querySelector(".content-wrapper") as HTMLElement;

        if (nav && contentWrapper) {
            nav.addEventListener("nav-click", ((e: CustomEvent) => {
                const path = e.detail.path;
                if (path) {
                    this.loadContent(path, contentWrapper);
                }
            }) as EventListener);
        }
    }

    private loadContent(path: string, container: HTMLElement): void {
        // 清除当前内容
        container.innerHTML = "";

        // 根据路径加载对应的组件
        switch (path) {
            case "/":
                container.appendChild(document.createElement("home-content"));
                break;
            case "/resin-spinning":
                container.appendChild(document.createElement("resin-spinning-content"));
                break;
            case "/fiber-properties":
                container.textContent = "纤维性能内容";
                break;
            case "/microstructure":
                container.textContent = "微观结构特征内容";
                break;
            case "/resin-interface":
                container.textContent = "树脂及界面性能内容";
                break;
            case "/composite-structure":
                container.textContent = "复合材料结构与性能内容";
                break;
            case "/ballistic-performance":
                container.textContent = "终端产品防弹性能内容";
                break;
            case "/literature-standards":
                container.textContent = "文献与标准内容";
                break;
            default:
                container.appendChild(document.createElement("home-content"));
        }
    }
}

// 注册自定义元素
customElements.define("material-body", Body);
