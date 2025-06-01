import "../stagewise.js";
import { html } from "../utils.js";

const template = html`
    <style>
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

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .form-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
        }

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

        .form-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-right: 2rem;
        }

        .form-header h1 {
            font-size: 1.8rem;
            color: #333;
            margin-bottom: 0.5rem;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group.full-width {
            grid-column: 1 / -1;
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

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.2);
        }

        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }

        .submit-btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 1rem;
        }

        .submit-btn:hover {
            background-color: #357abd;
        }

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
    <div class="form-container">
        <button
            class="close-btn"
            id="closeBtn"
        >
            &times;
        </button>
        <div class="form-header">
            <h1 id="formTitle">添加纺丝工艺记录</h1>
        </div>
        <form id="spinningForm">
            <div class="form-grid">
                <div class="form-group">
                    <label
                        for="fiber_batch_no"
                        class="required"
                        >纤维批号</label
                    >
                    <input
                        type="text"
                        id="fiber_batch_no"
                        name="fiber_batch_no"
                        required
                    />
                </div>
                <div class="form-group">
                    <label
                        for="resin_id"
                        class="required"
                        >树脂ID</label
                    >
                    <input
                        type="text"
                        id="resin_id"
                        name="resin_id"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="resin_grade">树脂牌号</label>
                    <input
                        type="text"
                        id="resin_grade"
                        name="resin_grade"
                    />
                </div>
                <div class="form-group">
                    <label for="resin_mn">树脂数均分子量 (g/mol)</label>
                    <input
                        type="number"
                        id="resin_mn"
                        name="resin_mn"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="resin_mw">树脂重均分子量 (g/mol)</label>
                    <input
                        type="number"
                        id="resin_mw"
                        name="resin_mw"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="resin_pdi">树脂多分散系数</label>
                    <input
                        type="number"
                        id="resin_pdi"
                        name="resin_pdi"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="resin_crystallinity">树脂结晶度 (%)</label>
                    <input
                        type="number"
                        id="resin_crystallinity"
                        name="resin_crystallinity"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="resin_melting_point">树脂熔点 (°C)</label>
                    <input
                        type="number"
                        id="resin_melting_point"
                        name="resin_melting_point"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="solution_concentration">原液浓度 (%)</label>
                    <input
                        type="number"
                        id="solution_concentration"
                        name="solution_concentration"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="spinning_temp">纺丝温度 (°C)</label>
                    <input
                        type="number"
                        id="spinning_temp"
                        name="spinning_temp"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="screw_speed">双螺杆速率 (rpm)</label>
                    <input
                        type="number"
                        id="screw_speed"
                        name="screw_speed"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="bath_composition">凝固浴组成</label>
                    <textarea
                        id="bath_composition"
                        name="bath_composition"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="bath_temp">凝固浴温度 (°C)</label>
                    <input
                        type="number"
                        id="bath_temp"
                        name="bath_temp"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="drawing_temp">拉伸温度 (°C)</label>
                    <input
                        type="number"
                        id="drawing_temp"
                        name="drawing_temp"
                        step="0.01"
                    />
                </div>
                <div class="form-group">
                    <label for="drawing_ratio">总拉伸倍数</label>
                    <input
                        type="number"
                        id="drawing_ratio"
                        name="drawing_ratio"
                        step="0.01"
                    />
                </div>
                <div class="form-group full-width">
                    <label for="solvent_removal">溶剂去除工艺</label>
                    <textarea
                        id="solvent_removal"
                        name="solvent_removal"
                    ></textarea>
                </div>
                <div class="form-group full-width">
                    <label for="post_process">后处理工艺</label>
                    <textarea
                        id="post_process"
                        name="post_process"
                    ></textarea>
                </div>
            </div>
            <div
                class="error-message"
                id="errorMessage"
            ></div>
            <button
                type="submit"
                class="submit-btn"
            >
                保存
            </button>
        </form>
    </div>
`;

interface SpinningProcess {
    fiber_batch_no: string;
    resin_id: string;
    resin_grade?: string;
    resin_mn?: number;
    resin_mw?: number;
    resin_pdi?: number;
    resin_crystallinity?: number;
    resin_melting_point?: number;
    solution_concentration?: number;
    spinning_temp?: number;
    screw_speed?: number;
    bath_composition?: string;
    bath_temp?: number;
    drawing_temp?: number;
    drawing_ratio?: number;
    solvent_removal?: string;
    post_process?: string;
}

export class ResinSpinningForm extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });
    private editMode = false;
    private editId: string | null = null;

    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.init();
    }

    private init(): void {
        const form = this.#sr.getElementById("spinningForm") as HTMLFormElement;
        const closeBtn = this.#sr.getElementById("closeBtn")!;
        const overlay = this.#sr.getElementById("overlay")!;

        form.addEventListener("submit", this.handleSubmit.bind(this));
        closeBtn.addEventListener("click", () => this.remove());
        overlay.addEventListener("click", () => this.remove());
    }

    public setEditMode(data: SpinningProcess): void {
        this.editMode = true;
        this.editId = data.fiber_batch_no;
        const form = this.#sr.getElementById("spinningForm") as HTMLFormElement;
        const title = this.#sr.getElementById("formTitle")!;

        // 设置标题
        title.textContent = "编辑纺丝工艺记录";

        // 填充表单数据
        Object.entries(data).forEach(([key, value]) => {
            const input = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
            if (input) {
                input.value = value?.toString() || "";
            }
        });

        // 禁用纤维批号字段（主键）
        const fiberBatchNoInput = form.elements.namedItem("fiber_batch_no") as HTMLInputElement;
        if (fiberBatchNoInput) {
            fiberBatchNoInput.disabled = true;
        }
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data: Record<string, any> = {};

        // 收集表单数据
        formData.forEach((value, key) => {
            if (value) {
                // 将数字类型的字段转换为数字
                if (
                    [
                        "resin_mn",
                        "resin_mw",
                        "resin_pdi",
                        "resin_crystallinity",
                        "resin_melting_point",
                        "solution_concentration",
                        "spinning_temp",
                        "screw_speed",
                        "bath_temp",
                        "drawing_temp",
                        "drawing_ratio",
                    ].includes(key)
                ) {
                    data[key] = parseFloat(value.toString());
                } else {
                    data[key] = value;
                }
            }
        });

        try {
            const url = this.editMode ? `/api/spinningProcess.update` : `/api/spinningProcess.create`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.editMode ? { fiber_batch_no: this.editId, data } : data),
            });

            const result = await response.json();
            if (result.code === 0) {
                // 关闭表单并刷新列表
                this.remove();
                // 触发自定义事件通知父组件刷新数据
                this.dispatchEvent(new CustomEvent("form-submitted"));
            } else {
                const errorMessage = this.#sr.getElementById("errorMessage")!;
                errorMessage.textContent = result.message || "保存失败";
                errorMessage.classList.add("show");
            }
        } catch (error) {
            console.error("保存失败:", error);
            const errorMessage = this.#sr.getElementById("errorMessage")!;
            errorMessage.textContent = "网络错误，请稍后重试";
            errorMessage.classList.add("show");
        }
    }
}

// 注册自定义元素
customElements.define("resin-spinning-form", ResinSpinningForm);
