import "../stagewise.js";
import { html } from "../utils.js";
import "./body.js";
import "./header.js";
import "./register.js";

const template = html`
    <style>
        :host {
            display: block;
            min-height: 100vh;
        }
    </style>
    <material-header></material-header>
    <material-body></material-body>
`;

export class MainContent extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });

    constructor() {
        super();
        this.#sr.innerHTML = template;
    }
}

// 注册自定义元素
customElements.define("material-content", MainContent);
