import "../stagewise.js";
import { html } from "../utils.js";
import "./resin-spinning-form.js";
import { ResinSpinningForm } from "./resin-spinning-form.js";

const template = html`
    <style>
        .content-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-header {
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .section-header h1 {
            font-size: 2rem;
            color: #333;
            margin-bottom: 1rem;
        }

        .section-header p {
            color: #666;
            line-height: 1.6;
        }

        .add-btn {
            background-color: #4a90e2;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }

        .add-btn:hover {
            background-color: #357abd;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 2rem;
        }

        .data-table th,
        .data-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }

        .data-table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .data-table tr:hover {
            background-color: #f8f9fa;
        }

        .action-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 0.5rem;
            font-size: 0.9rem;
            transition: background-color 0.3s ease;
        }

        .edit-btn {
            background-color: #4a90e2;
            color: white;
        }

        .edit-btn:hover {
            background-color: #357abd;
        }

        .delete-btn {
            background-color: #dc3545;
            color: white;
        }

        .delete-btn:hover {
            background-color: #c82333;
        }

        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
            gap: 1rem;
        }

        .pagination-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #dee2e6;
            background-color: white;
            color: #4a90e2;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .pagination-btn:hover {
            background-color: #4a90e2;
            color: white;
        }

        .pagination-btn:disabled {
            background-color: #e9ecef;
            color: #6c757d;
            cursor: not-allowed;
        }

        .search-bar {
            margin-bottom: 2rem;
            display: flex;
            gap: 1rem;
        }

        .search-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            font-size: 1rem;
        }

        .search-input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
    </style>
    <div class="content-section">
        <div class="section-header">
            <div>
                <h1>前端树脂与纺丝工艺</h1>
                <p>本模块提供树脂合成、纺丝工艺等关键工艺参数的查询与分析功能，帮助研究人员优化材料制备工艺。</p>
            </div>
            <button
                class="add-btn"
                id="addBtn"
            >
                添加新记录
            </button>
        </div>

        <div class="search-bar">
            <input
                type="text"
                class="search-input"
                id="searchInput"
                placeholder="搜索纤维批号或树脂ID..."
            />
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>纤维批号</th>
                    <th>树脂ID</th>
                    <th>树脂牌号</th>
                    <th>纺丝温度</th>
                    <th>拉伸温度</th>
                    <th>总拉伸倍数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="dataTableBody">
                <!-- 数据将通过 JavaScript 动态填充 -->
            </tbody>
        </table>

        <div class="pagination">
            <button
                class="pagination-btn"
                id="prevPage"
                disabled
            >
                上一页
            </button>
            <span id="pageInfo">第 1 页</span>
            <button
                class="pagination-btn"
                id="nextPage"
            >
                下一页
            </button>
        </div>
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

export class ResinSpinningContent extends HTMLElement {
    readonly #sr = this.attachShadow({ mode: "open" });
    private currentPage = 1;
    private pageSize = 10;
    private searchKeyword = "";

    constructor() {
        super();
        this.#sr.innerHTML = template;
        this.init();
    }

    private init(): void {
        const addBtn = this.#sr.getElementById("addBtn")!;
        const searchInput = this.#sr.getElementById("searchInput")!;
        const prevPageBtn = this.#sr.getElementById("prevPage")!;
        const nextPageBtn = this.#sr.getElementById("nextPage")!;

        // 加载初始数据
        this.loadData();

        // 添加按钮点击事件
        addBtn.addEventListener("click", () => {
            const form = document.createElement("resin-spinning-form");
            form.addEventListener("form-submitted", () => {
                this.loadData();
            });
            document.body.appendChild(form);
        });

        // 搜索输入事件
        searchInput.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.searchKeyword = target.value;
            this.currentPage = 1;
            this.loadData();
        });

        // 分页按钮点击事件
        prevPageBtn.addEventListener("click", () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadData();
            }
        });

        nextPageBtn.addEventListener("click", () => {
            this.currentPage++;
            this.loadData();
        });
    }

    private async loadData(): Promise<void> {
        try {
            const response = await fetch("/api/spinningProcess.list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.searchKeyword,
                }),
            });

            const result = await response.json();
            if (result.code === 0) {
                this.renderData(result.data);
            } else {
                console.error("加载数据失败:", result.message);
            }
        } catch (error) {
            console.error("加载数据失败:", error);
        }
    }

    private renderData(data: { items: SpinningProcess[]; total: number }): void {
        const tbody = this.#sr.getElementById("dataTableBody")!;
        const pageInfo = this.#sr.getElementById("pageInfo")!;
        const prevPageBtn = this.#sr.getElementById("prevPage") as HTMLButtonElement;
        const nextPageBtn = this.#sr.getElementById("nextPage") as HTMLButtonElement;

        // 更新分页信息
        const totalPages = Math.ceil(data.total / this.pageSize);
        pageInfo.textContent = `第 ${this.currentPage} 页 / 共 ${totalPages} 页`;
        prevPageBtn.disabled = this.currentPage <= 1;
        nextPageBtn.disabled = this.currentPage >= totalPages;

        // 渲染表格数据
        tbody.innerHTML = data.items
            .map(
                (item) => `
                <tr>
                    <td>${item.fiber_batch_no}</td>
                    <td>${item.resin_id}</td>
                    <td>${item.resin_grade || "-"}</td>
                    <td>${item.spinning_temp || "-"}</td>
                    <td>${item.drawing_temp || "-"}</td>
                    <td>${item.drawing_ratio || "-"}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${item.fiber_batch_no}">编辑</button>
                        <button class="action-btn delete-btn" data-id="${item.fiber_batch_no}">删除</button>
                    </td>
                </tr>
            `
            )
            .join("");

        // 添加编辑和删除按钮的事件监听
        tbody.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const target = e.target as HTMLButtonElement;
                const id = target.dataset["id"];
                try {
                    const response = await fetch("/api/spinningProcess.get", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ fiber_batch_no: id }),
                    });
                    const result = await response.json();
                    if (result.code === 0) {
                        const form = document.createElement("resin-spinning-form") as ResinSpinningForm;
                        form.setEditMode(result.data);
                        form.addEventListener("form-submitted", () => {
                            this.loadData();
                        });
                        document.body.appendChild(form);
                    } else {
                        console.error("获取记录失败:", result.message);
                    }
                } catch (error) {
                    console.error("获取记录失败:", error);
                }
            });
        });

        tbody.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const target = e.target as HTMLButtonElement;
                const id = target.dataset["id"];
                if (confirm("确定要删除这条记录吗？")) {
                    try {
                        const response = await fetch("/api/spinningProcess.delete", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ fiber_batch_no: id }),
                        });
                        const result = await response.json();
                        if (result.code === 0) {
                            this.loadData();
                        } else {
                            console.error("删除记录失败:", result.message);
                        }
                    } catch (error) {
                        console.error("删除记录失败:", error);
                    }
                }
            });
        });
    }
}

// 注册自定义元素
customElements.define("resin-spinning-content", ResinSpinningContent);
