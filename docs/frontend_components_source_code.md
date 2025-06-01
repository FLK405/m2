// START OF FILE: client/src/components/nav.ts
```typescript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dispatch } from "../utils.js";

interface NavLink {
    path: string;
    icon: string;
    label: string;
}

@customElement("material-nav")
export class Nav extends LitElement {
    @property({ type: Array })
    navLinks: NavLink[] = [
        { path: "/", icon: "home", label: "首页" },
        { path: "/resin-spinning", icon: "settings", label: "前端树脂与纺丝工艺" },
        { path: "/fiber-properties", icon: "insights", label: "纤维性能" },
        { path: "/microstructure", icon: "grain", label: "微观结构特征" },
        { path: "/resin-interface", icon: "science", label: "树脂及界面性能" },
        { path: "/composite-structure", icon: "view_quilt", label: "复合材料结构与性能" },
        { path: "/ballistic-performance", icon: "shield", label: "终端产品防弹性能" },
        { path: "/literature-standards", icon: "article", label: "文献与标准" },
        // { path: "/system-utils", icon: "build", label: "系统工具" }, // Example for another link
    ];

    static styles = css`
        :host {
            display: block;
            width: 280px; /* Increased width */
            background-color: #ffffff; /* White background */
            box-shadow: 2px 0 5px rgba(0,0,0,0.1); /* Subtle shadow */
            padding-top: 20px;
            height: 100vh; /* Full height */
            overflow-y: auto; /* Scroll if content overflows */
        }
        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .nav-item a {
            display: flex;
            align-items: center;
            padding: 12px 24px; /* Increased padding */
            text-decoration: none;
            color: #333; /* Darker text color */
            font-weight: 500; /* Medium font weight */
            transition: background-color 0.3s, color 0.3s;
        }
        .nav-item a:hover,
        .nav-item a.active {
            background-color: #e0e0e0; /* Light grey background on hover/active */
            color: var(--primary-color, #007bff); /* Primary color for text */
            border-right: 3px solid var(--primary-color, #007bff); /* Accent border */
        }
        .nav-item a material-icon {
            margin-right: 16px; /* Increased margin */
            color: #555; /* Icon color */
        }
        .nav-item a:hover material-icon,
        .nav-item a.active material-icon {
            color: var(--primary-color, #007bff); /* Primary color for icon */
        }
    `;

    render() {
        const currentPath = window.location.pathname;
        return html`
            <ul class="nav-list">
                ${this.navLinks.map(
                    (link) => html`
                        <li class="nav-item">
                            <a href="${link.path}" class="${currentPath === link.path ? 'active' : ''}" @click="${() => this._handleNavClick(link.path)}">
                                <material-icon name="${link.icon}"></material-icon>
                                ${link.label}
                            </a>
                        </li>
                    `
                )}
            </ul>
        `;
    }

    private _handleNavClick(path: string) {
        dispatch(this, "nav-click", { path });
    }
}
```
// END OF FILE: client/src/components/nav.ts

// START OF FILE: client/src/components/home-content.ts
```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("home-content")
export class HomeContent extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: var(--primary-color, #333);
            margin-top: 0;
        }
        p {
            line-height: 1.6;
            color: #555;
        }
        .features-list {
            list-style: none;
            padding: 0;
        }
        .features-list li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .features-list li:last-child {
            border-bottom: none;
        }
        .features-list material-icon {
            margin-right: 10px;
            color: var(--accent-color, #007bff);
        }
    `;

    render() {
        return html`
            <h1>欢迎来到 UHMWPE纤维及其复合材料性能数据库</h1>
            <p>本系统旨在提供一个全面、易用的平台，用于管理和分析超高分子量聚乙烯（UHMWPE）纤维及其复合材料的各类性能数据。</p>
            <p>您可以通过左侧的导航菜单访问不同的数据模块，包括：</p>
            <ul class="features-list">
                <li><material-icon name="settings_input_component"></material-icon>前端树脂与纺丝工艺</li>
                <li><material-icon name="insights"></material-icon>纤维性能</li>
                <li><material-icon name="grain"></material-icon>微观结构特征</li>
                <li><material-icon name="science"></material-icon>树脂及界面性能</li>
                <li><material-icon name="view_quilt"></material-icon>复合材料结构与性能</li>
                <li><material-icon name="shield"></material-icon>终端产品防弹性能</li>
                <li><material-icon name="article"></material-icon>文献与标准</li>
            </ul>
            <p>请使用导航菜单开始浏览和管理数据。</p>
        `;
    }
}
```
// END OF FILE: client/src/components/home-content.ts

// START OF FILE: client/src/components/resin-spinning-content.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import './resin-spinning-form.js'; // Import the form component
import { dispatch } from "../utils.js"; // Assuming utils.js has dispatch

interface SpinningProcess {
    id?: number;
    fiber_batch_no: string;
    resin_id: string; // Assuming resin_id refers to an entry in a Resins table
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
    created_at?: string;
    updated_at?: string;
}

@customElement('resin-spinning-content')
export class ResinSpinningContent extends LitElement {
    @state() private processes: SpinningProcess[] = [];
    @state() private isLoading = false;
    @state() private errorMessage = '';
    @property({ type: Number }) page = 1;
    @property({ type: Number }) pageSize = 10; // Default page size
    @state() private total = 0;

    static styles = css`
        /* Styles for the content area */
        :host {
            display: block;
            padding: 16px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        .actions button {
            margin-right: 8px;
        }
        .pagination {
            margin-top: 16px;
            text-align: center;
        }
        .pagination button {
            margin: 0 5px;
        }
         .search-bar {
            margin-bottom: 16px;
        }
        .search-bar input {
            padding: 8px;
            margin-right: 8px;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this.fetchProcesses();
        // Listen for form submission to refresh the list
        this.addEventListener('form-submitted', this.handleFormSubmitted as EventListener);
    }

    disconnectedCallback() {
        this.removeEventListener('form-submitted', this.handleFormSubmitted as EventListener);
        super.disconnectedCallback();
    }

    async fetchProcesses(searchQuery = '') {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            // Adjust API endpoint as needed, include pagination and search
            const response = await fetch(`/api/spinningProcess.list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ page: this.page, pageSize: this.pageSize, search: searchQuery })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.code === 0) {
                this.processes = result.data.items;
                this.total = result.data.total;
            } else {
                throw new Error(result.message || 'Failed to fetch processes');
            }
        } catch (error) {
            this.errorMessage = (error as Error).message;
            console.error('Error fetching processes:', error);
        } finally {
            this.isLoading = false;
        }
    }

    handleFormSubmitted = (event: CustomEvent) => {
        // Close the form - assuming the form component has a 'close' method
        const form = this.shadowRoot?.querySelector('resin-spinning-form');
        if (form) {
            (form as any).close();
        }
        // Refresh the list
        this.fetchProcesses();
    }

    openAddForm() {
        let form = this.shadowRoot?.querySelector('resin-spinning-form');
        if (!form) {
            // If the form is not in the shadow DOM, create and append it
            // This is a simple way; a more robust solution might manage this differently
            form = document.createElement('resin-spinning-form');
            this.shadowRoot?.appendChild(form);
        }
        (form as any).show(); // Call show method on the form
        (form as any).setEditMode(null); // Ensure it's in 'add' mode
    }

    handleEdit(process: SpinningProcess) {
        let form = this.shadowRoot?.querySelector('resin-spinning-form');
        if (!form) {
            form = document.createElement('resin-spinning-form');
            this.shadowRoot?.appendChild(form);
        }
        (form as any).setEditMode(process);
        (form as any).show();
    }

    async handleDelete(process: SpinningProcess) {
        if (confirm(`确定删除批号为 ${process.fiber_batch_no} 的记录吗?`)) {
            try {
                const response = await fetch(`/api/spinningProcess.delete`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fiber_batch_no: process.fiber_batch_no })
                });
                if (!response.ok) {
                    const errorResult = await response.json();
                    throw new Error(errorResult.message || '删除失败');
                }
                this.fetchProcesses(); // Refresh list
            } catch (error) {
                console.error('删除错误:', error);
                alert((error as Error).message);
            }
        }
    }

    handleSearch(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.fetchProcesses(inputElement.value);
    }


    render() {
        return html`
            <h2>前端树脂与纺丝工艺数据</h2>
            <div class="search-bar">
                <input type="text" placeholder="搜索 (例如, 纤维批号, 树脂牌号)" @input="${this.handleSearch}" />
                <button @click="${this.openAddForm}">添加新记录</button>
            </div>

            ${this.isLoading ? html`<p>加载中...</p>` : ''}
            ${this.errorMessage ? html`<p style="color: red;">错误: ${this.errorMessage}</p>` : ''}

            <table>
                <thead>
                    <tr>
                        <th>纤维批号</th>
                        <th>树脂牌号</th>
                        <th>原液浓度 (%)</th>
                        <th>纺丝温度 (°C)</th>
                        <th>总拉伸倍数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.processes.map(process => html`
                        <tr>
                            <td>${process.fiber_batch_no}</td>
                            <td>${process.resin_grade || 'N/A'}</td>
                            <td>${process.solution_concentration || 'N/A'}</td>
                            <td>${process.spinning_temp || 'N/A'}</td>
                            <td>${process.drawing_ratio || 'N/A'}</td>
                            <td class="actions">
                                <button @click="${() => this.handleEdit(process)}">编辑</button>
                                <button @click="${() => this.handleDelete(process)}">删除</button>
                            </td>
                        </tr>
                    `)}
                    ${this.processes.length === 0 && !this.isLoading ? html`<tr><td colspan="6">未找到记录。</td></tr>` : ''}
                </tbody>
            </table>
            <div class="pagination">
                <span>总计: ${this.total}</span>
                <button ?disabled="${this.page <= 1}" @click="${() => { this.page--; this.fetchProcesses(); }}">上一页</button>
                <span>第 ${this.page} 页</span>
                <button ?disabled="${this.page * this.pageSize >= this.total}" @click="${() => { this.page++; this.fetchProcesses(); }}">下一页</button>
            </div>

            <!-- Form component, initially hidden -->
            <resin-spinning-form></resin-spinning-form>
        `;
    }
}
```
// END OF FILE: client/src/components/resin-spinning-content.ts

// START OF FILE: client/src/components/resin-spinning-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js'; // Assuming utils.js has dispatch

interface SpinningProcess {
    id?: number;
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

@customElement('resin-spinning-form')
export class ResinSpinningForm extends LitElement {
    @property({ type: Boolean }) visible = false;
    // When editing, pass the process data here
    @property({ type: Object }) editProcessData: SpinningProcess | null = null;

    // Form fields - using @state for internal management
    @state() private fiber_batch_no = '';
    @state() private resin_id = '';
    @state() private resin_grade = '';
    @state() private resin_mn: number | undefined = undefined;
    @state() private resin_mw: number | undefined = undefined;
    @state() private resin_pdi: number | undefined = undefined;
    @state() private resin_crystallinity: number | undefined = undefined;
    @state() private resin_melting_point: number | undefined = undefined;
    @state() private solution_concentration: number | undefined = undefined;
    @state() private spinning_temp: number | undefined = undefined;
    @state() private screw_speed: number | undefined = undefined;
    @state() private bath_composition = '';
    @state() private bath_temp: number | undefined = undefined;
    @state() private drawing_temp: number | undefined = undefined;
    @state() private drawing_ratio: number | undefined = undefined;
    @state() private solvent_removal = '';
    @state() private post_process = '';

    @state() private errorMessage = '';
    @state() private isEditMode = false;
    private currentProcessId: number | undefined = undefined;


    static styles = css`
        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 1000; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        .modal-content {
            background-color: #fefefe;
            margin: 5% auto; /* 5% from the top and centered */
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 700px; /* Could be more or less, depending on screen size */
            border-radius: 8px;
            position: relative;
        }
        .modal[visible] {
            display: block;
        }
        .close-button {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close-button:hover,
        .close-button:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
        }
        input[type="text"], input[type="number"], textarea {
            width: calc(100% - 16px); /* Full width minus padding */
            padding: 8px;
            margin-top: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            min-height: 60px;
            resize: vertical;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px; /* Spacing between grid items */
        }
        .full-width {
            grid-column: 1 / -1; /* Span across all columns */
        }
        button[type="submit"], button[type="button"] {
            background-color: #4CAF50; /* Green */
            color: white;
            padding: 10px 15px;
            margin-top: 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button[type="button"] {
            background-color: #f44336; /* Red for cancel */
            margin-left: 10px;
        }
    `;

    show() {
        this.visible = true;
    }

    close() {
        this.visible = false;
        this.resetForm(); // Reset form when closing
    }

    // Call this method to populate form for editing
    setEditMode(process: SpinningProcess | null) {
        if (process) {
            this.isEditMode = true;
            this.currentProcessId = process.id; // Keep track of ID for update
            this.fiber_batch_no = process.fiber_batch_no;
            this.resin_id = process.resin_id;
            this.resin_grade = process.resin_grade || '';
            this.resin_mn = process.resin_mn;
            this.resin_mw = process.resin_mw;
            this.resin_pdi = process.resin_pdi;
            this.resin_crystallinity = process.resin_crystallinity;
            this.resin_melting_point = process.resin_melting_point;
            this.solution_concentration = process.solution_concentration;
            this.spinning_temp = process.spinning_temp;
            this.screw_speed = process.screw_speed;
            this.bath_composition = process.bath_composition || '';
            this.bath_temp = process.bath_temp;
            this.drawing_temp = process.drawing_temp;
            this.drawing_ratio = process.drawing_ratio;
            this.solvent_removal = process.solvent_removal || '';
            this.post_process = process.post_process || '';
        } else {
            this.isEditMode = false;
            this.currentProcessId = undefined;
            this.resetForm();
        }
    }

    resetForm() {
        this.fiber_batch_no = '';
        this.resin_id = '';
        this.resin_grade = '';
        this.resin_mn = undefined;
        this.resin_mw = undefined;
        this.resin_pdi = undefined;
        this.resin_crystallinity = undefined;
        this.resin_melting_point = undefined;
        this.solution_concentration = undefined;
        this.spinning_temp = undefined;
        this.screw_speed = undefined;
        this.bath_composition = '';
        this.bath_temp = undefined;
        this.drawing_temp = undefined;
        this.drawing_ratio = undefined;
        this.solvent_removal = '';
        this.post_process = '';
        this.errorMessage = '';
    }


    async handleSubmit(event: Event) {
        event.preventDefault();
        this.errorMessage = '';

        const processData: Partial<SpinningProcess> = {
            fiber_batch_no: this.fiber_batch_no,
            resin_id: this.resin_id,
            resin_grade: this.resin_grade || undefined,
            resin_mn: this.resin_mn,
            resin_mw: this.resin_mw,
            resin_pdi: this.resin_pdi,
            resin_crystallinity: this.resin_crystallinity,
            resin_melting_point: this.resin_melting_point,
            solution_concentration: this.solution_concentration,
            spinning_temp: this.spinning_temp,
            screw_speed: this.screw_speed,
            bath_composition: this.bath_composition || undefined,
            bath_temp: this.bath_temp,
            drawing_temp: this.drawing_temp,
            drawing_ratio: this.drawing_ratio,
            solvent_removal: this.solvent_removal || undefined,
            post_process: this.post_process || undefined,
        };

        if (!processData.fiber_batch_no || !processData.resin_id) {
            this.errorMessage = "纤维批号和树脂ID为必填项。";
            return;
        }

        const url = this.isEditMode
            ? `/api/spinningProcess.update`
            : `/api/spinningProcess.create`;

        const body = this.isEditMode
            ? { fiber_batch_no: this.fiber_batch_no, data: processData } // For update, send fiber_batch_no for identification + data
            : processData; // For create, send the whole object

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            if (!response.ok || result.code !== 0) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            dispatch(this, 'form-submitted', {data: result.data});
            this.close();

        } catch (error) {
            this.errorMessage = (error as Error).message;
            console.error('Form submission error:', error);
        }
    }

    // Helper to handle number inputs, ensuring they are stored as numbers or undefined
    handleNumberInput(event: Event, field: keyof this) {
        const value = (event.target as HTMLInputElement).value;
        (this[field] as any) = value === '' ? undefined : Number(value);
    }


    render() {
        return html`
            <div class="modal" ?visible="${this.visible}">
                <div class="modal-content">
                    <span class="close-button" @click="${this.close}">&times;</span>
                    <h3>${this.isEditMode ? '编辑树脂纺丝工艺记录' : '添加新树脂纺丝工艺记录'}</h3>
                    ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
                    <form @submit="${this.handleSubmit}">
                        <div class="form-grid">
                            <div>
                                <label for="fiber_batch_no">目标纤维批号*:</label>
                                <input id="fiber_batch_no" type="text" .value="${this.fiber_batch_no}" @input="${(e: Event) => this.fiber_batch_no = (e.target as HTMLInputElement).value}" required ?readonly="${this.isEditMode}">
                            </div>
                            <div>
                                <label for="resin_id">树脂ID* (关联到Resins表):</label>
                                <input id="resin_id" type="text" .value="${this.resin_id}" @input="${(e: Event) => this.resin_id = (e.target as HTMLInputElement).value}" required>
                            </div>
                            <div>
                                <label for="resin_grade">树脂牌号:</label>
                                <input id="resin_grade" type="text" .value="${this.resin_grade}" @input="${(e: Event) => this.resin_grade = (e.target as HTMLInputElement).value}">
                            </div>
                             <div>
                                <label for="resin_mn">树脂数均分子量 (g/mol):</label>
                                <input id="resin_mn" type="number" step="any" .valueAsNumber="${this.resin_mn || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'resin_mn')}">
                            </div>
                            <div>
                                <label for="resin_mw">树脂重均分子量 (g/mol):</label>
                                <input id="resin_mw" type="number" step="any" .valueAsNumber="${this.resin_mw || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'resin_mw')}">
                            </div>
                            <div>
                                <label for="resin_pdi">树脂多分散系数 (Mw/Mn):</label>
                                <input id="resin_pdi" type="number" step="any" .valueAsNumber="${this.resin_pdi || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'resin_pdi')}">
                            </div>
                            <div>
                                <label for="resin_crystallinity">树脂结晶度 (%):</label>
                                <input id="resin_crystallinity" type="number" step="any" .valueAsNumber="${this.resin_crystallinity || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'resin_crystallinity')}">
                            </div>
                            <div>
                                <label for="resin_melting_point">树脂熔点 (°C):</label>
                                <input id="resin_melting_point" type="number" step="any" .valueAsNumber="${this.resin_melting_point || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'resin_melting_point')}">
                            </div>
                             <div>
                                <label for="solution_concentration">原液浓度 (%):</label>
                                <input id="solution_concentration" type="number" step="any" .valueAsNumber="${this.solution_concentration || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'solution_concentration')}">
                            </div>
                            <div>
                                <label for="spinning_temp">纺丝温度 (°C):</label>
                                <input id="spinning_temp" type="number" step="any" .valueAsNumber="${this.spinning_temp || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'spinning_temp')}">
                            </div>
                            <div>
                                <label for="screw_speed">双螺杆速率 (rpm):</label>
                                <input id="screw_speed" type="number" step="any" .valueAsNumber="${this.screw_speed || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'screw_speed')}">
                            </div>
                            <div>
                                <label for="bath_composition">凝固浴组成:</label>
                                <input id="bath_composition" type="text" .value="${this.bath_composition}" @input="${(e: Event) => this.bath_composition = (e.target as HTMLInputElement).value}">
                            </div>
                            <div>
                                <label for="bath_temp">凝固浴温度 (°C):</label>
                                <input id="bath_temp" type="number" step="any" .valueAsNumber="${this.bath_temp || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'bath_temp')}">
                            </div>
                            <div>
                                <label for="drawing_temp">拉伸温度 (°C):</label>
                                <input id="drawing_temp" type="number" step="any" .valueAsNumber="${this.drawing_temp || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'drawing_temp')}">
                            </div>
                            <div>
                                <label for="drawing_ratio">总拉伸倍数:</label>
                                <input id="drawing_ratio" type="number" step="any" .valueAsNumber="${this.drawing_ratio || NaN}" @input="${(e: Event) => this.handleNumberInput(e, 'drawing_ratio')}">
                            </div>
                            <div class="full-width">
                                <label for="solvent_removal">溶剂去除工艺:</label>
                                <textarea id="solvent_removal" .value="${this.solvent_removal}" @input="${(e: Event) => this.solvent_removal = (e.target as HTMLInputElement).value}"></textarea>
                            </div>
                            <div class="full-width">
                                <label for="post_process">后处理工艺:</label>
                                <textarea id="post_process" .value="${this.post_process}" @input="${(e: Event) => this.post_process = (e.target as HTMLInputElement).value}"></textarea>
                            </div>
                        </div>
                        <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
                        <button type="button" @click="${this.close}">取消</button>
                    </form>
                </div>
            </div>
        `;
    }
}
```
// END OF FILE: client/src/components/resin-spinning-form.ts

// START OF FILE: client/src/components/fiber-performance-content.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { dispatch } from '../utils.js'; // Assuming utils.js has dispatch

// Define the Fiber interface based on server/src/fiber_performance/model.ts
// Focusing on direct properties of Fiber for now for table display
interface Fiber {
  fiber_id?: number;
  manufacturer?: string | null;
  grade: string;
  batch_no: string;
  linear_density_dtex?: number | null;
  filament_diameter_um?: number | null;
  filament_count?: number | null;
  source?: string | null;
  production_date?: string | null;
  image_path?: string | null;
  remarks?: string | null;
  // Fields from related performance tables can be added if a summary is needed directly
}

@customElement('fiber-performance-content')
export class FiberPerformanceContent extends LitElement {
  @state() private fibers: Fiber[] = [];
  @state() private isLoading = false;
  @state() private errorMessage = '';
  @property({ type: Number }) page = 1;
  @property({ type: Number }) pageSize = 10;
  @state() private total = 0;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    .actions button {
      margin-right: 8px;
    }
    .pagination {
      margin-top: 16px;
      text-align: center;
    }
    .pagination button {
      margin: 0 5px;
    }
    .search-bar {
      margin-bottom: 16px;
    }
    .search-bar input {
      padding: 8px;
      margin-right: 8px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchFibers();
    this.addEventListener('form-submitted', this.handleFormSubmitted as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener('form-submitted', this.handleFormSubmitted as EventListener);
    super.disconnectedCallback();
  }

  async fetchFibers(searchQuery = '') {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      // Actual API endpoint might differ or include query params for search/pagination
      const response = await fetch('/api/fiber_performance/fibers.list', {
        method: 'POST', // Assuming POST as per backend router setup
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: this.page, pageSize: this.pageSize, search: searchQuery })
      });
      if (!response.ok) {
        // The backend currently returns 501, this will be caught here
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      this.fibers = result.data.items || []; // Backend returns { message: '...', data: { items: [], total: 0 ...}}
      this.total = result.data.total || 0;
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to fetch fibers.';
      this.fibers = []; // Clear data on error
      this.total = 0;
      console.error('Error fetching fibers:', error);
    } finally {
      this.isLoading = false;
    }
  }

  handleFormSubmitted = (event: CustomEvent) => {
    const form = this.shadowRoot?.querySelector('fiber-performance-form');
    if (form) {
      (form as any).close(); // Assuming 'close' method exists on the form
    }
    this.fetchFibers(); // Refresh list after submission
  }

  openAddForm() {
    let form = this.shadowRoot?.querySelector('fiber-performance-form');
    if (!form) {
      form = document.createElement('fiber-performance-form');
      this.shadowRoot?.appendChild(form);
    }
    (form as any).show(); // Assuming 'show' method to make modal visible
    // (form as any).setEditMode(null); // Clear any previous edit state
  }

  handleEdit(fiber: Fiber) {
    console.log('Edit fiber:', fiber.fiber_id, '(not implemented)');
    // let form = this.shadowRoot?.querySelector('fiber-performance-form');
    // if (!form) {
    //   form = document.createElement('fiber-performance-form');
    //   this.shadowRoot?.appendChild(form);
    // }
    // (form as any).setEditMode(fiber);
    // (form as any).show();
  }

  async handleDelete(fiber: Fiber) {
    console.log('Delete fiber:', fiber.fiber_id, '(not implemented)');
    // if (confirm(`Are you sure you want to delete fiber ${fiber.batch_no}?`)) {
    //   try {
    //     const response = await fetch('/api/fiber_performance/fibers.delete', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ fiber_id: fiber.fiber_id })
    //     });
    //     if (!response.ok) throw new Error('Failed to delete fiber.');
    //     this.fetchFibers();
    //   } catch (error) {
    //     console.error('Error deleting fiber:', error);
    //     alert((error as Error).message);
    //   }
    // }
  }

  handleSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.fetchFibers(inputElement.value);
  }

  render() {
    return html`
      <h2>纤维性能数据管理</h2>
      <div class="search-bar">
        <input type="text" placeholder="搜索纤维 (批号, 牌号...)" @input="${this.handleSearch}" />
        <button @click="${this.openAddForm}">添加新记录</button>
      </div>

      ${this.isLoading ? html`<p>加载中...</p>` : ''}
      ${this.errorMessage ? html`<p style="color: red;">错误: ${this.errorMessage}</p>` : ''}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>制造商</th>
            <th>牌号</th>
            <th>批号</th>
            <th>纤度 (dtex)</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${this.fibers.map(
            (fiber) => html`
              <tr>
                <td>${fiber.fiber_id}</td>
                <td>${fiber.manufacturer || 'N/A'}</td>
                <td>${fiber.grade}</td>
                <td>${fiber.batch_no}</td>
                <td>${fiber.linear_density_dtex || 'N/A'}</td>
                <td class="actions">
                  <button @click="${() => this.handleEdit(fiber)}">编辑</button>
                  <button @click="${() => this.handleDelete(fiber)}">删除</button>
                  <button @click="${() => dispatch(this, 'navigate', { path: `/fiber-properties/${fiber.fiber_id}` })}">详情</button>
                </td>
              </tr>
            `
          )}
          ${this.fibers.length === 0 && !this.isLoading ? html`<tr><td colspan="6">未找到纤维数据。</td></tr>` : ''}
        </tbody>
      </table>

      ${'' /* Placeholder for pagination, can be implemented similarly to resin-spinning-content.ts */}
      <div class="pagination">
         <span>总计: ${this.total}</span>
         ${'' /* <button ?disabled="${this.page <= 1}" @click="${() => { this.page--; this.fetchFibers(); }}">上一页</button>
         <span>Page ${this.page}</span>
         <button ?disabled="${this.page * this.pageSize >= this.total}" @click="${() => { this.page++; this.fetchFibers(); }}">下一页</button> */}
      </div>

      <fiber-performance-form></fiber-performance-form>
      ${'' /* This will be hidden by default css in the form component itself */}
    `;
  }
}

// Helper to dispatch custom events (if not already in utils.js)
// export function dispatch(element: EventTarget, type: string, detail?: any) {
//   element.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
// }
```
// END OF FILE: client/src/components/fiber-performance-content.ts

// START OF FILE: client/src/components/fiber-performance-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js'; // Assuming utils.js has dispatch

// Based on Fiber interface from server/src/fiber_performance/model.ts
interface Fiber {
  fiber_id?: number;
  manufacturer?: string | null;
  grade: string;
  batch_no: string;
  spinning_process_id?: number | null;
  linear_density_dtex?: number | null;
  filament_diameter_um?: number | null;
  filament_count?: number | null;
  source?: string | null;
  production_date?: string | null; // Should be YYYY-MM-DD for input type="date"
  image_path?: string | null;
  remarks?: string | null;
}

@customElement('fiber-performance-form')
export class FiberPerformanceForm extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Object }) fiberData: Fiber | null = null;

  @state() private manufacturer = '';
  @state() private grade = '';
  @state() private batch_no = '';
  @state() private spinning_process_id: number | undefined = undefined;
  @state() private linear_density_dtex: number | undefined = undefined;
  @state() private filament_diameter_um: number | undefined = undefined;
  @state() private filament_count: number | undefined = undefined;
  @state() private source = '';
  @state() private production_date = '';
  @state() private image_path = '';
  @state() private remarks = '';

  @state() private errorMessage = '';
  @state() private isEditMode = false;
  private currentFiberId: number | undefined = undefined;

  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 10% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 600px;
      border-radius: 8px;
    }
    .modal[visible] {
      display: block;
    }
    .close-button {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    label {
      display: block;
      margin-top: 10px;
    }
    input[type="text"], input[type="number"], input[type="date"], textarea {
      width: calc(100% - 16px);
      padding: 8px;
      margin-top: 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button[type="submit"], button[type="button"] {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      margin-top: 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="button"] {
      background-color: #f44336;
      margin-left: 10px;
    }
  `;

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.resetForm();
  }

  setEditMode(fiber: Fiber | null) {
    if (fiber) {
      this.isEditMode = true;
      this.currentFiberId = fiber.fiber_id;
      this.manufacturer = fiber.manufacturer || '';
      this.grade = fiber.grade || '';
      this.batch_no = fiber.batch_no || '';
      this.spinning_process_id = fiber.spinning_process_id || undefined;
      this.linear_density_dtex = fiber.linear_density_dtex || undefined;
      this.filament_diameter_um = fiber.filament_diameter_um || undefined;
      this.filament_count = fiber.filament_count || undefined;
      this.source = fiber.source || '';
      this.production_date = fiber.production_date ? fiber.production_date.split('T')[0] : ''; // Format for input type="date"
      this.image_path = fiber.image_path || '';
      this.remarks = fiber.remarks || '';
    } else {
      this.isEditMode = false;
      this.currentFiberId = undefined;
      this.resetForm();
    }
  }

  resetForm() {
    this.manufacturer = '';
    this.grade = '';
    this.batch_no = '';
    this.spinning_process_id = undefined;
    this.linear_density_dtex = undefined;
    this.filament_diameter_um = undefined;
    this.filament_count = undefined;
    this.source = '';
    this.production_date = '';
    this.image_path = '';
    this.remarks = '';
    this.errorMessage = '';
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    const fiberDataToSubmit: Partial<Fiber> = {
      manufacturer: this.manufacturer || null,
      grade: this.grade,
      batch_no: this.batch_no,
      spinning_process_id: this.spinning_process_id,
      linear_density_dtex: this.linear_density_dtex,
      filament_diameter_um: this.filament_diameter_um,
      filament_count: this.filament_count,
      source: this.source || null,
      production_date: this.production_date || null,
      image_path: this.image_path || null,
      remarks: this.remarks || null,
    };

    if (!fiberDataToSubmit.grade || !fiberDataToSubmit.batch_no) {
        this.errorMessage = "Grade and Batch No are required.";
        return;
    }

    const url = this.isEditMode
      ? '/api/fiber_performance/fibers.update'
      : '/api/fiber_performance/fibers.create';

    if (this.isEditMode && this.currentFiberId) {
      (fiberDataToSubmit as Fiber).fiber_id = this.currentFiberId;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fiberDataToSubmit),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      // const result = await response.json(); // Backend 501 will not return actual data
      dispatch(this, 'form-submitted', {});
      this.close();
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to submit form.';
      console.error('Form submission error:', error);
    }
  }

  render() {
    return html`
      <div class="modal" ?visible="${this.visible}">
        <div class="modal-content">
          <span class="close-button" @click="${this.close}">&times;</span>
          <h3>${this.isEditMode ? '编辑纤维记录' : '添加新纤维记录'}</h3>
          ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
          <form @submit="${this.handleSubmit}">
            <div>
              <label for="grade">牌号*:</label>
              <input id="grade" type="text" .value="${this.grade}" @input="${(e: Event) => this.grade = (e.target as HTMLInputElement).value}" required>
            </div>
            <div>
              <label for="batch_no">批号*:</label>
              <input id="batch_no" type="text" .value="${this.batch_no}" @input="${(e: Event) => this.batch_no = (e.target as HTMLInputElement).value}" required>
            </div>
            <div>
              <label for="manufacturer">制造商:</label>
              <input id="manufacturer" type="text" .value="${this.manufacturer}" @input="${(e: Event) => this.manufacturer = (e.target as HTMLInputElement).value}">
            </div>
            <div>
              <label for="spinning_process_id">纺丝工艺ID:</label>
              <input id="spinning_process_id" type="number" .valueAsNumber="${this.spinning_process_id || NaN}" @input="${(e: Event) => this.spinning_process_id = (e.target as HTMLInputElement).valueAsNumber}">
            </div>
            <div>
              <label for="linear_density_dtex">纤度 (dtex):</label>
              <input id="linear_density_dtex" type="number" step="0.01" .valueAsNumber="${this.linear_density_dtex || NaN}" @input="${(e: Event) => this.linear_density_dtex = (e.target as HTMLInputElement).valueAsNumber}">
            </div>
            <div>
              <label for="filament_diameter_um">单丝直径 (μm):</label>
              <input id="filament_diameter_um" type="number" step="0.01" .valueAsNumber="${this.filament_diameter_um || NaN}" @input="${(e: Event) => this.filament_diameter_um = (e.target as HTMLInputElement).valueAsNumber}">
            </div>
            <div>
              <label for="filament_count">纤维根数:</label>
              <input id="filament_count" type="number" .valueAsNumber="${this.filament_count || NaN}" @input="${(e: Event) => this.filament_count = (e.target as HTMLInputElement).valueAsNumber}">
            </div>
            <div>
              <label for="source">样品来源:</label>
              <input id="source" type="text" .value="${this.source}" @input="${(e: Event) => this.source = (e.target as HTMLInputElement).value}">
            </div>
            <div>
              <label for="production_date">生产日期:</label>
              <input id="production_date" type="date" .value="${this.production_date}" @input="${(e: Event) => this.production_date = (e.target as HTMLInputElement).value}">
            </div>
            <div>
              <label for="image_path">样品图片路径:</label>
              <input id="image_path" type="text" .value="${this.image_path}" @input="${(e: Event) => this.image_path = (e.target as HTMLInputElement).value}">
            </div>
            <div>
              <label for="remarks">备注:</label>
              <textarea id="remarks" .value="${this.remarks}" @input="${(e: Event) => this.remarks = (e.target as HTMLInputElement).value}"></textarea>
            </div>
            <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
            <button type="button" @click="${this.close}">取消</button>
          </form>
        </div>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/fiber-performance-form.ts

// START OF FILE: client/src/components/microstructure-characteristics-content.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js'; // Assuming utils.js has dispatch
import './mc-phase-structure-form.js';
import './mc-orientation-crystallinity-form.js';
import './mc-sem-form.js';
import './mc-xps-form.js';

// Interfaces based on server/src/microstructure_characteristics/model.ts
interface BaseMicrostructureTestData {
  test_id?: number;
  fiber_id: number; // This will need to be set, perhaps from a parent context or selection
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  remarks?: string | null;
}

interface FiberMicrostructurePhaseStructure extends BaseMicrostructureTestData {
  test_method: string;
  amorphous_phase_percent_nmr?: number | null;
  intermediate_phase_percent_nmr?: number | null;
  crystalline_phase_percent_nmr?: number | null;
  defective_crystalline_percent_nmr?: number | null;
  crystallinity_percent_raman?: number | null;
  characteristic_peaks_raman?: string | null;
}

interface FiberMicrostructureOrientationCrystallinity extends BaseMicrostructureTestData {
  test_method: string;
  crystal_size_nm_waxd?: number | null;
  orientation_factor_waxd?: number | null;
  d_spacing_waxd?: string | null;
  sound_velocity_mps?: number | null;
  orientation_factor_sonic?: number | null;
  modulus_sonic_gpa?: number | null;
}

interface FiberMicrostructureSem { // SEM has 'id' as PK
  id?: number;
  fiber_id: number;
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  sample_name_sem?: string | null;
  magnification?: string | null;
  accelerating_voltage_kv?: number | null;
  image_path: string;
  morphology_description_special_features?: string | null;
  analysis_results?: string | null;
  remarks?: string | null;
}

interface FiberMicrostructureXps extends BaseMicrostructureTestData {
  carbon_at_percent?: number | null;
  oxygen_at_percent?: number | null;
  nitrogen_at_percent?: number | null;
  other_elements_xps?: string | null;
  chemical_state_info_xps?: string | null;
}


@customElement('microstructure-characteristics-content')
export class MicrostructureCharacteristicsContent extends LitElement {
  @state() private phaseStructures: FiberMicrostructurePhaseStructure[] = [];
  @state() private orientationCrystallinities: FiberMicrostructureOrientationCrystallinity[] = [];
  @state() private semImages: FiberMicrostructureSem[] = [];
  @state() private xpsData: FiberMicrostructureXps[] = [];

  @state() private isLoading = false;
  @state() private errorMessage = '';

  // TODO: This component will likely need a fiber_id context from a parent component
  // For now, we'll assume a placeholder or that forms will manage fiber_id input.
  private currentFiberId: number | null = 1; // Mock fiber ID for now

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    section {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: #fff;
    }
    h2 {
      color: var(--primary-color, #333);
      border-bottom: 2px solid var(--accent-color, #007bff);
      padding-bottom: 8px;
    }
    h3 {
      margin-top: 0;
      color: #555;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f8f8f8;
    }
    .add-button {
      background-color: var(--primary-color, #007bff);
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .add-button:hover {
      background-color: var(--primary-color-dark, #0056b3);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchPhaseStructures(); // Uncomment when backend list is ready
    // this.fetchOrientationCrystallinities(); // Uncomment when backend list is ready
    // this.fetchSemImages(); // Uncomment when backend list is ready
    // this.fetchXpsData(); // Uncomment when backend list is ready
    this.addEventListener('form-submitted', this.handleFormSubmitted as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener('form-submitted', this.handleFormSubmitted as EventListener);
    super.disconnectedCallback();
  }

  async fetchData(endpoint: string, propertyName: keyof this) {
    this.isLoading = true;
    this.errorMessage = ''; // Clear previous errors for this specific fetch
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fiber_id: this.currentFiberId, page: 1, pageSize: 100 }) // Fetch all for now
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || `HTTP error! status: ${response.status} on ${endpoint}`);
      }
      const result = await response.json();
      if (result.code === 0) {
        (this[propertyName] as any) = result.data.items || [];
      } else {
        throw new Error(result.message || `API error on ${endpoint}`);
      }
    } catch (error) {
      this.errorMessage = `${(error as Error).message} (while fetching ${propertyName})`;
      console.error(`Error fetching ${propertyName}:`, error);
       (this[propertyName] as any) = []; // Clear data on error
    } finally {
      this.isLoading = false;
    }
  }

  fetchPhaseStructures() { this.fetchData('/api/microstructure/phase_structure.list', 'phaseStructures'); }
  fetchOrientationCrystallinities() { this.fetchData('/api/microstructure/orientation_crystallinity.list', 'orientationCrystallinities'); }
  fetchSemImages() { this.fetchData('/api/microstructure/sem.list', 'semImages'); }
  fetchXpsData() { this.fetchData('/api/microstructure/xps.list', 'xpsData'); }


  handleFormSubmitted = (event: CustomEvent) => {
    console.log('Form submitted event received in content:', event.detail);
    const formType = (event.target as HTMLElement).tagName.toLowerCase();

    const formsToClose: { [key: string]: string } = {
        'mc-phase-structure-form': 'mc-phase-structure-form',
        'mc-orientation-crystallinity-form': 'mc-orientation-crystallinity-form',
        'mc-sem-form': 'mc-sem-form',
        'mc-xps-form': 'mc-xps-form',
    };

    const listRefreshMethods: { [key: string]: () => void } = {
        'phase_structure': this.fetchPhaseStructures.bind(this),
        'orientation_crystallinity': this.fetchOrientationCrystallinities.bind(this),
        'sem': this.fetchSemImages.bind(this),
        'xps': this.fetchXpsData.bind(this),
    };

    if (formsToClose[formType]) {
        const form = this.shadowRoot?.querySelector(formsToClose[formType]);
        if (form && typeof (form as any).close === 'function') {
            (form as any).close();
        }
        // Refresh the specific list based on event.detail.type
        if (event.detail && event.detail.type && listRefreshMethods[event.detail.type]) {
            listRefreshMethods[event.detail.type]();
        } else if (formType === 'mc-phase-structure-form') { // Fallback for phase structure if type not in detail
             this.fetchPhaseStructures();
        }
    }
  }

  openForm(formTagName: string) {
    let form = this.shadowRoot?.querySelector(formTagName);
    if (!form) {
      form = document.createElement(formTagName);
      this.shadowRoot?.appendChild(form);
    }
    if (this.currentFiberId !== null) {
        (form as any).fiber_id_context = this.currentFiberId;
    }
    (form as any).show();
    (form as any).editData = null; // Ensure it's in add mode
  }

  // Placeholder for edit functions
  handleEdit<T extends {test_id?: number, id?:number}>(item: T, formTagName: string) {
    console.log(`Edit ${formTagName}`, item);
    let form = this.shadowRoot?.querySelector(formTagName);
    if (!form) {
      form = document.createElement(formTagName);
      this.shadowRoot?.appendChild(form);
    }
    if (this.currentFiberId !== null) {
        (form as any).fiber_id_context = this.currentFiberId;
    }
    (form as any).editData = item;
    (form as any).show();
  }


  renderSection<T extends {test_id?: number, id?: number}>(
    title: string,
    data: T[],
    formTagName: string,
    renderItem: (item: T) => any,
    headers: string[]
  ) {
    return html`
      <section>
        <h3>${title}</h3>
        <button class="add-button" @click="${() => this.openForm(formTagName)}">添加${title}数据</button>
        ${this.isLoading && !data.length ? html`<p>加载中...</p>` : ''}
        ${this.errorMessage && this.errorMessage.toLowerCase().includes(title.toLowerCase().split(' ')[0]) ? html`<p style="color:red;">加载${title}错误: ${this.errorMessage}</p>` : ''}
        <table>
          <thead>
            <tr>${headers.map(h => html`<th>${h}</th>`)}<th>操作</th></tr>
          </thead>
          <tbody>
            ${data.length > 0
              ? data.map(item => renderItem(item))
              : html`<tr><td colspan="${headers.length + 1}">无数据${this.isLoading ? ' (仍在加载...)' : '.'}</td></tr>`}
          </tbody>
        </table>
      </section>
    `;
  }

  render() {
    // Mock currentFiberId for now, this should come from a parent component or selection
    // this.currentFiberId = 1;

    return html`
      <h2>微观结构特征</h2>
      <p>当前纤维ID: ${this.currentFiberId || '未选择 (请先在纤维性能模块选择或创建纤维)'}</p>
      ${'' /* TODO: Add a fiber selector component here or rely on navigation context */}

      ${this.renderSection<FiberMicrostructurePhaseStructure>(
        '相结构 (NMR/Raman)',
        this.phaseStructures,
        'mc-phase-structure-form',
        (item) => html`<tr>
            <td>${item.test_id}</td>
            <td>${item.test_method}</td>
            <td>${item.test_date ? new Date(item.test_date).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button @click="${() => this.handleEdit(item, 'mc-phase-structure-form')}" disabled>编辑</button>
                <button disabled>删除</button>
            </td>
        </tr>`,
        ['测试ID', '方法', '日期']
      )}

      ${this.renderSection<FiberMicrostructureOrientationCrystallinity>(
        '取向与结晶度 (WAXD/Sonic)',
        this.orientationCrystallinities,
        'mc-orientation-crystallinity-form',
        (item) => html`<tr>
            <td>${item.test_id}</td>
            <td>${item.test_method}</td>
            <td>${item.test_date ? new Date(item.test_date).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button @click="${() => this.handleEdit(item, 'mc-orientation-crystallinity-form')}" disabled>编辑</button>
                <button disabled>删除</button>
            </td>
        </tr>`,
        ['测试ID', '方法', '日期']
      )}

      ${this.renderSection<FiberMicrostructureSem>(
        'SEM图像',
        this.semImages,
        'mc-sem-form',
        (item) => html`<tr>
            <td>${item.id}</td>
            <td>${item.sample_name_sem || 'N/A'}</td>
            <td>${item.image_path ? html`<img src="${item.image_path}" width="50" alt="SEM Preview" style="max-height:50px;"/>` : 'N/A'}</td>
            <td>
                <button @click="${() => this.handleEdit(item, 'mc-sem-form')}" disabled>编辑</button>
                <button disabled>删除</button>
            </td>
        </tr>`,
        ['图像ID', '样品名', '预览']
      )}

      ${this.renderSection<FiberMicrostructureXps>(
        'XPS分析',
        this.xpsData,
        'mc-xps-form',
        (item) => html`<tr>
            <td>${item.test_id}</td>
            <td>${item.carbon_at_percent !== undefined ? item.carbon_at_percent + '%' : 'N/A'} C</td>
            <td>${item.test_date ? new Date(item.test_date).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button @click="${() => this.handleEdit(item, 'mc-xps-form')}" disabled>编辑</button>
                <button disabled>删除</button>
            </td>
        </tr>`,
        ['测试ID', 'C (at%)', '日期']
      )}

      <mc-phase-structure-form .fiber_id_context="${this.currentFiberId}"></mc-phase-structure-form>
      <mc-orientation-crystallinity-form .fiber_id_context="${this.currentFiberId}"></mc-orientation-crystallinity-form>
      <mc-sem-form .fiber_id_context="${this.currentFiberId}"></mc-sem-form>
      <mc-xps-form .fiber_id_context="${this.currentFiberId}"></mc-xps-form>
    `;
  }
}
```
// END OF FILE: client/src/components/microstructure-characteristics-content.ts

// START OF FILE: client/src/components/mc-phase-structure-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

// Based on FiberMicrostructurePhaseStructure interface from model.ts
interface FiberMicrostructurePhaseStructure {
  test_id?: number;
  fiber_id: number; // Needs to be set, perhaps passed in or selected
  test_method: string; // 'NMR' or 'Raman' or other
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  amorphous_phase_percent_nmr?: number | null;
  intermediate_phase_percent_nmr?: number | null;
  crystalline_phase_percent_nmr?: number | null;
  defective_crystalline_percent_nmr?: number | null;
  crystallinity_percent_raman?: number | null;
  characteristic_peaks_raman?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  remarks?: string | null;
}

@customElement('mc-phase-structure-form')
export class McPhaseStructureForm extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Object })
  set editData(data: FiberMicrostructurePhaseStructure | null) {
    if (data) {
      this.isEditMode = true;
      this.currentTestId = data.test_id;
      this.fiber_id = data.fiber_id; // Crucial: needs to be provided
      this.test_method = data.test_method;
      this.test_date = data.test_date ? data.test_date.split('T')[0] : '';
      this.testing_institution = data.testing_institution || '';
      this.test_equipment = data.test_equipment || '';
      this.amorphous_phase_percent_nmr = data.amorphous_phase_percent_nmr || undefined;
      this.intermediate_phase_percent_nmr = data.intermediate_phase_percent_nmr || undefined;
      this.crystalline_phase_percent_nmr = data.crystalline_phase_percent_nmr || undefined;
      this.defective_crystalline_percent_nmr = data.defective_crystalline_percent_nmr || undefined;
      this.crystallinity_percent_raman = data.crystallinity_percent_raman || undefined;
      this.characteristic_peaks_raman = data.characteristic_peaks_raman || '';
      this.result_chart_path = data.result_chart_path || '';
      this.raw_data_path = data.raw_data_path || '';
      this.remarks = data.remarks || '';
    } else {
      this.isEditMode = false;
      this.currentTestId = undefined;
      this.resetForm();
    }
  }

  // This property should be set by the parent component or a selection mechanism
  @property({ type: Number }) fiber_id_context: number | null = null;

  @state() private test_method = 'NMR';
  @state() private test_date = '';
  @state() private testing_institution = '';
  @state() private test_equipment = '';
  @state() private amorphous_phase_percent_nmr: number | undefined = undefined;
  @state() private intermediate_phase_percent_nmr: number | undefined = undefined;
  @state() private crystalline_phase_percent_nmr: number | undefined = undefined;
  @state() private defective_crystalline_percent_nmr: number | undefined = undefined;
  @state() private crystallinity_percent_raman: number | undefined = undefined;
  @state() private characteristic_peaks_raman = '';
  @state() private result_chart_path = '';
  @state() private raw_data_path = '';
  @state() private remarks = '';

  @state() private errorMessage = '';
  @state() private isEditMode = false;
  private currentTestId: number | undefined = undefined;
  private fiber_id: number | undefined = undefined; // Internal fiber_id for submission

  static styles = css`
    /* Basic Modal Styling (same as fiber-performance-form) */
    .modal { display: none; position: fixed; z-index: 1001; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); }
    .modal-content { background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 90%; max-width: 700px; border-radius: 8px; }
    .modal[visible] { display: block; }
    .close-button { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
    label { display: block; margin-top: 10px; font-weight: bold; }
    input[type="text"], input[type="number"], input[type="date"], textarea, select { width: calc(100% - 18px); padding: 8px; margin-top: 4px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .full-width { grid-column: 1 / -1; }
    button[type="submit"], button[type="button"] { background-color: #4CAF50; color: white; padding: 10px 15px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="button"] { background-color: #f44336; margin-left: 10px; }
  `;

  show() { this.visible = true; if (!this.isEditMode && this.fiber_id_context) this.fiber_id = this.fiber_id_context; }
  close() { this.visible = false; this.resetForm(); }

  resetForm() {
    // Do not reset fiber_id if context is provided
    this.fiber_id = this.fiber_id_context ?? undefined;
    this.test_method = 'NMR';
    this.test_date = '';
    this.testing_institution = '';
    this.test_equipment = '';
    this.amorphous_phase_percent_nmr = undefined;
    this.intermediate_phase_percent_nmr = undefined;
    this.crystalline_phase_percent_nmr = undefined;
    this.defective_crystalline_percent_nmr = undefined;
    this.crystallinity_percent_raman = undefined;
    this.characteristic_peaks_raman = '';
    this.result_chart_path = '';
    this.raw_data_path = '';
    this.remarks = '';
    this.errorMessage = '';
  }

  firstUpdated() {
    if (this.fiber_id_context && !this.isEditMode) {
        this.fiber_id = this.fiber_id_context;
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.fiber_id) {
        this.errorMessage = "Fiber ID is missing. Cannot submit form.";
        return;
    }

    const dataToSubmit: Omit<FiberMicrostructurePhaseStructure, 'test_id' | 'entry_date' | 'added_by'> = {
      fiber_id: this.fiber_id,
      test_method: this.test_method,
      test_date: this.test_date || null,
      testing_institution: this.testing_institution || null,
      test_equipment: this.test_equipment || null,
      amorphous_phase_percent_nmr: this.amorphous_phase_percent_nmr,
      intermediate_phase_percent_nmr: this.intermediate_phase_percent_nmr,
      crystalline_phase_percent_nmr: this.crystalline_phase_percent_nmr,
      defective_crystalline_percent_nmr: this.defective_crystalline_percent_nmr,
      crystallinity_percent_raman: this.crystallinity_percent_raman,
      characteristic_peaks_raman: this.characteristic_peaks_raman || null,
      result_chart_path: this.result_chart_path || null,
      raw_data_path: this.raw_data_path || null,
      remarks: this.remarks || null,
    };

    const url = this.isEditMode
      ? '/api/microstructure/phase_structure.update'
      : '/api/microstructure/phase_structure.create';

    const body = this.isEditMode
        ? { ...dataToSubmit, test_id: this.currentTestId }
        : dataToSubmit;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      dispatch(this, 'form-submitted', { type: 'phase_structure' });
      this.close();
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to submit form.';
      console.error('Phase Structure Form submission error:', error);
    }
  }

  render() {
    return html`
      <div class="modal" ?visible="${this.visible}">
        <div class="modal-content">
          <span class="close-button" @click="${this.close}">&times;</span>
          <h3>${this.isEditMode ? '编辑' : '添加'} 相结构数据 (NMR/Raman)</h3>
          <p>关联纤维ID: ${this.fiber_id || this.fiber_id_context || '未指定 (请从主列表选择纤维或确保上下文已设置)'}</p>
          ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
          <form @submit="${this.handleSubmit}">
            <div class="form-grid">
              <div>
                <label for="test_method">测试方法*:</label>
                <select id="test_method" .value="${this.test_method}" @change="${(e: Event) => this.test_method = (e.target as HTMLSelectElement).value}">
                  <option value="NMR">NMR</option>
                  <option value="Raman">Raman</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label for="test_date">测试日期:</label>
                <input id="test_date" type="date" .value="${this.test_date}" @input="${(e: Event) => this.test_date = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="testing_institution">测试机构:</label>
                <input id="testing_institution" type="text" .value="${this.testing_institution}" @input="${(e: Event) => this.testing_institution = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="test_equipment">测试设备:</label>
                <input id="test_equipment" type="text" .value="${this.test_equipment}" @input="${(e: Event) => this.test_equipment = (e.target as HTMLInputElement).value}">
              </div>

              ${this.test_method === 'NMR' ? html`
                <div><label>NMR Specific:</label></div>
                <div>
                  <label for="amorphous_phase_percent_nmr">无定形区占比 (%):</label>
                  <input id="amorphous_phase_percent_nmr" type="number" step="0.01" .valueAsNumber="${this.amorphous_phase_percent_nmr || NaN}" @input="${(e: Event) => this.amorphous_phase_percent_nmr = (e.target as HTMLInputElement).valueAsNumber}">
                </div>
                <div>
                  <label for="intermediate_phase_percent_nmr">中间相占比 (%):</label>
                  <input id="intermediate_phase_percent_nmr" type="number" step="0.01" .valueAsNumber="${this.intermediate_phase_percent_nmr || NaN}" @input="${(e: Event) => this.intermediate_phase_percent_nmr = (e.target as HTMLInputElement).valueAsNumber}">
                </div>
                <div>
                  <label for="crystalline_phase_percent_nmr">晶相占比 (%):</label>
                  <input id="crystalline_phase_percent_nmr" type="number" step="0.01" .valueAsNumber="${this.crystalline_phase_percent_nmr || NaN}" @input="${(e: Event) => this.crystalline_phase_percent_nmr = (e.target as HTMLInputElement).valueAsNumber}">
                </div>
                <div>
                  <label for="defective_crystalline_percent_nmr">残缺晶相占比 (%):</label>
                  <input id="defective_crystalline_percent_nmr" type="number" step="0.01" .valueAsNumber="${this.defective_crystalline_percent_nmr || NaN}" @input="${(e: Event) => this.defective_crystalline_percent_nmr = (e.target as HTMLInputElement).valueAsNumber}">
                </div>
              ` : ''}

              ${this.test_method === 'Raman' ? html`
                <div><label>Raman Specific:</label></div>
                <div>
                  <label for="crystallinity_percent_raman">结晶度 (%):</label>
                  <input id="crystallinity_percent_raman" type="number" step="0.01" .valueAsNumber="${this.crystallinity_percent_raman || NaN}" @input="${(e: Event) => this.crystallinity_percent_raman = (e.target as HTMLInputElement).valueAsNumber}">
                </div>
                <div class="full-width">
                  <label for="characteristic_peaks_raman">拉曼特征峰信息:</label>
                  <textarea id="characteristic_peaks_raman" .value="${this.characteristic_peaks_raman}" @input="${(e: Event) => this.characteristic_peaks_raman = (e.target as HTMLInputElement).value}"></textarea>
                </div>
              ` : ''}

              <div class="full-width">
                <label for="result_chart_path">结果图表路径:</label>
                <input id="result_chart_path" type="text" .value="${this.result_chart_path}" @input="${(e: Event) => this.result_chart_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="raw_data_path">原始数据路径:</label>
                <input id="raw_data_path" type="text" .value="${this.raw_data_path}" @input="${(e: Event) => this.raw_data_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="remarks">备注:</label>
                <textarea id="remarks" .value="${this.remarks}" @input="${(e: Event) => this.remarks = (e.target as HTMLInputElement).value}"></textarea>
              </div>
            </div>
            <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
            <button type="button" @click="${this.close}">取消</button>
          </form>
        </div>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/mc-phase-structure-form.ts

// START OF FILE: client/src/components/mc-orientation-crystallinity-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

// Based on FiberMicrostructureOrientationCrystallinity interface from model.ts
interface FiberMicrostructureOrientationCrystallinity {
  test_id?: number;
  fiber_id: number;
  test_method: string; // 'WAXD', 'SAXS', 'SonicModulus', or other
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  crystal_size_nm_waxd?: number | null;
  orientation_factor_waxd?: number | null;
  d_spacing_waxd?: string | null;
  sound_velocity_mps?: number | null;
  orientation_factor_sonic?: number | null;
  modulus_sonic_gpa?: number | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  remarks?: string | null;
}

@customElement('mc-orientation-crystallinity-form')
export class McOrientationCrystallinityForm extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Object })
  set editData(data: FiberMicrostructureOrientationCrystallinity | null) {
    if (data) {
      this.isEditMode = true;
      this.currentTestId = data.test_id;
      this.fiber_id = data.fiber_id;
      this.test_method = data.test_method;
      this.test_date = data.test_date ? data.test_date.split('T')[0] : '';
      this.testing_institution = data.testing_institution || '';
      this.test_equipment = data.test_equipment || '';
      this.crystal_size_nm_waxd = data.crystal_size_nm_waxd || undefined;
      this.orientation_factor_waxd = data.orientation_factor_waxd || undefined;
      this.d_spacing_waxd = data.d_spacing_waxd || '';
      this.sound_velocity_mps = data.sound_velocity_mps || undefined;
      this.orientation_factor_sonic = data.orientation_factor_sonic || undefined;
      this.modulus_sonic_gpa = data.modulus_sonic_gpa || undefined;
      this.result_chart_path = data.result_chart_path || '';
      this.raw_data_path = data.raw_data_path || '';
      this.remarks = data.remarks || '';
    } else {
      this.isEditMode = false;
      this.currentTestId = undefined;
      this.resetForm();
    }
  }

  @property({ type: Number }) fiber_id_context: number | null = null;

  @state() private test_method = 'WAXD';
  @state() private test_date = '';
  @state() private testing_institution = '';
  @state() private test_equipment = '';
  @state() private crystal_size_nm_waxd: number | undefined = undefined;
  @state() private orientation_factor_waxd: number | undefined = undefined;
  @state() private d_spacing_waxd = '';
  @state() private sound_velocity_mps: number | undefined = undefined;
  @state() private orientation_factor_sonic: number | undefined = undefined;
  @state() private modulus_sonic_gpa: number | undefined = undefined;
  @state() private result_chart_path = '';
  @state() private raw_data_path = '';
  @state() private remarks = '';

  @state() private errorMessage = '';
  @state() private isEditMode = false;
  private currentTestId: number | undefined = undefined;
  private fiber_id: number | undefined = undefined;

  static styles = css`
    /* Basic Modal Styling (same as mc-phase-structure-form) */
    .modal { display: none; position: fixed; z-index: 1001; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); }
    .modal-content { background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 90%; max-width: 700px; border-radius: 8px; }
    .modal[visible] { display: block; }
    .close-button { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
    label { display: block; margin-top: 10px; font-weight: bold; }
    input[type="text"], input[type="number"], input[type="date"], textarea, select { width: calc(100% - 18px); padding: 8px; margin-top: 4px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .full-width { grid-column: 1 / -1; }
    .conditional-fields { border-left: 3px solid #007bff; padding-left: 10px; margin-top: 10px; }
    button[type="submit"], button[type="button"] { background-color: #4CAF50; color: white; padding: 10px 15px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="button"] { background-color: #f44336; margin-left: 10px; }
  `;

  show() { this.visible = true; if (!this.isEditMode && this.fiber_id_context) this.fiber_id = this.fiber_id_context; }
  close() { this.visible = false; this.resetForm(); }

  resetForm() {
    this.fiber_id = this.fiber_id_context ?? undefined;
    this.test_method = 'WAXD';
    this.test_date = '';
    this.testing_institution = '';
    this.test_equipment = '';
    this.crystal_size_nm_waxd = undefined;
    this.orientation_factor_waxd = undefined;
    this.d_spacing_waxd = '';
    this.sound_velocity_mps = undefined;
    this.orientation_factor_sonic = undefined;
    this.modulus_sonic_gpa = undefined;
    this.result_chart_path = '';
    this.raw_data_path = '';
    this.remarks = '';
    this.errorMessage = '';
  }

  firstUpdated() {
    if (this.fiber_id_context && !this.isEditMode) {
        this.fiber_id = this.fiber_id_context;
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.fiber_id) {
        this.errorMessage = "Fiber ID is missing.";
        return;
    }
    if (!this.test_method) {
        this.errorMessage = "Test method is required.";
        return;
    }

    const dataToSubmit: Omit<FiberMicrostructureOrientationCrystallinity, 'test_id' | 'entry_date' | 'added_by'> = {
      fiber_id: this.fiber_id,
      test_method: this.test_method,
      test_date: this.test_date || null,
      testing_institution: this.testing_institution || null,
      test_equipment: this.test_equipment || null,
      crystal_size_nm_waxd: this.test_method.includes('WAXD') || this.test_method.includes('SAXS') ? this.crystal_size_nm_waxd : null,
      orientation_factor_waxd: this.test_method.includes('WAXD') || this.test_method.includes('SAXS') ? this.orientation_factor_waxd : null,
      d_spacing_waxd: this.test_method.includes('WAXD') || this.test_method.includes('SAXS') ? this.d_spacing_waxd || null : null,
      sound_velocity_mps: this.test_method.includes('Sonic') ? this.sound_velocity_mps : null,
      orientation_factor_sonic: this.test_method.includes('Sonic') ? this.orientation_factor_sonic : null,
      modulus_sonic_gpa: this.test_method.includes('Sonic') ? this.modulus_sonic_gpa : null,
      result_chart_path: this.result_chart_path || null,
      raw_data_path: this.raw_data_path || null,
      remarks: this.remarks || null,
    };

    const url = this.isEditMode
      ? '/api/microstructure/orientation_crystallinity.update'
      : '/api/microstructure/orientation_crystallinity.create';

    const body = this.isEditMode
        ? { ...dataToSubmit, test_id: this.currentTestId }
        : dataToSubmit;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      dispatch(this, 'form-submitted', { type: 'orientation_crystallinity' });
      this.close();
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to submit form.';
      console.error('Orientation/Crystallinity Form submission error:', error);
    }
  }

  render() {
    return html`
      <div class="modal" ?visible="${this.visible}">
        <div class="modal-content">
          <span class="close-button" @click="${this.close}">&times;</span>
          <h3>${this.isEditMode ? '编辑' : '添加'} 取向与结晶度数据</h3>
          <p>关联纤维ID: ${this.fiber_id || this.fiber_id_context || '未指定'}</p>
          ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
          <form @submit="${this.handleSubmit}">
            <div class="form-grid">
              <div>
                <label for="test_method">测试方法*:</label>
                <select id="test_method" .value="${this.test_method}" @change="${(e: Event) => this.test_method = (e.target as HTMLSelectElement).value}">
                  <option value="WAXD">WAXD</option>
                  <option value="SAXS">SAXS</option>
                  <option value="SonicModulus">Sonic Modulus</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label for="test_date">测试日期:</label>
                <input id="test_date" type="date" .value="${this.test_date}" @input="${(e: Event) => this.test_date = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="testing_institution">测试机构:</label>
                <input id="testing_institution" type="text" .value="${this.testing_institution}" @input="${(e: Event) => this.testing_institution = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="test_equipment">测试设备:</label>
                <input id="test_equipment" type="text" .value="${this.test_equipment}" @input="${(e: Event) => this.test_equipment = (e.target as HTMLInputElement).value}">
              </div>

              ${this.test_method === 'WAXD' || this.test_method === 'SAXS' ? html`
                <div class="full-width conditional-fields">
                  <label>WAXD/SAXS Specific Fields:</label>
                  <div>
                    <label for="crystal_size_nm_waxd">晶粒尺寸 (nm) (WAXD):</label>
                    <input id="crystal_size_nm_waxd" type="number" step="0.01" .valueAsNumber="${this.crystal_size_nm_waxd || NaN}" @input="${(e: Event) => this.crystal_size_nm_waxd = (e.target as HTMLInputElement).valueAsNumber}">
                  </div>
                  <div>
                    <label for="orientation_factor_waxd">取向因子 (WAXD):</label>
                    <input id="orientation_factor_waxd" type="number" step="0.001" .valueAsNumber="${this.orientation_factor_waxd || NaN}" @input="${(e: Event) => this.orientation_factor_waxd = (e.target as HTMLInputElement).valueAsNumber}">
                  </div>
                  <div class="full-width">
                    <label for="d_spacing_waxd">晶面间距 (WAXD):</label>
                    <textarea id="d_spacing_waxd" .value="${this.d_spacing_waxd}" @input="${(e: Event) => this.d_spacing_waxd = (e.target as HTMLInputElement).value}"></textarea>
                  </div>
                </div>
              ` : ''}

              ${this.test_method === 'SonicModulus' ? html`
                <div class="full-width conditional-fields">
                  <label>Sonic Modulus Specific Fields:</label>
                  <div>
                    <label for="sound_velocity_mps">声速 (m/s):</label>
                    <input id="sound_velocity_mps" type="number" step="0.1" .valueAsNumber="${this.sound_velocity_mps || NaN}" @input="${(e: Event) => this.sound_velocity_mps = (e.target as HTMLInputElement).valueAsNumber}">
                  </div>
                  <div>
                    <label for="orientation_factor_sonic">取向因子 (声速法):</label>
                    <input id="orientation_factor_sonic" type="number" step="0.001" .valueAsNumber="${this.orientation_factor_sonic || NaN}" @input="${(e: Event) => this.orientation_factor_sonic = (e.target as HTMLInputElement).valueAsNumber}">
                  </div>
                  <div>
                    <label for="modulus_sonic_gpa">模量 (GPa) (声速法):</label>
                    <input id="modulus_sonic_gpa" type="number" step="0.01" .valueAsNumber="${this.modulus_sonic_gpa || NaN}" @input="${(e: Event) => this.modulus_sonic_gpa = (e.target as HTMLInputElement).valueAsNumber}">
                  </div>
                </div>
              ` : ''}

              <div class="full-width">
                <label for="result_chart_path">结果图表路径:</label>
                <input id="result_chart_path" type="text" .value="${this.result_chart_path}" @input="${(e: Event) => this.result_chart_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="raw_data_path">原始数据路径:</label>
                <input id="raw_data_path" type="text" .value="${this.raw_data_path}" @input="${(e: Event) => this.raw_data_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="remarks">备注:</label>
                <textarea id="remarks" .value="${this.remarks}" @input="${(e: Event) => this.remarks = (e.target as HTMLInputElement).value}"></textarea>
              </div>
            </div>
            <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
            <button type="button" @click="${this.close}">取消</button>
          </form>
        </div>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/mc-orientation-crystallinity-form.ts

// START OF FILE: client/src/components/mc-sem-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

// Based on FiberMicrostructureSem interface from model.ts
interface FiberMicrostructureSem {
  id?: number; // PK for SEM table
  fiber_id: number;
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  sample_name_sem?: string | null;
  magnification?: string | null;
  accelerating_voltage_kv?: number | null;
  image_path: string; // Not optional
  morphology_description_special_features?: string | null;
  analysis_results?: string | null;
  remarks?: string | null;
}

@customElement('mc-sem-form')
export class McSemForm extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Object })
  set editData(data: FiberMicrostructureSem | null) {
    if (data) {
      this.isEditMode = true;
      this.currentImageId = data.id; // SEM uses 'id'
      this.fiber_id = data.fiber_id;
      this.test_date = data.test_date ? data.test_date.split('T')[0] : '';
      this.testing_institution = data.testing_institution || '';
      this.test_equipment = data.test_equipment || '';
      this.sample_name_sem = data.sample_name_sem || '';
      this.magnification = data.magnification || '';
      this.accelerating_voltage_kv = data.accelerating_voltage_kv || undefined;
      this.image_path = data.image_path || ''; // Required field
      this.morphology_description_special_features = data.morphology_description_special_features || '';
      this.analysis_results = data.analysis_results || '';
      this.remarks = data.remarks || '';
    } else {
      this.isEditMode = false;
      this.currentImageId = undefined;
      this.resetForm();
    }
  }

  @property({ type: Number }) fiber_id_context: number | null = null;

  @state() private test_date = '';
  @state() private testing_institution = '';
  @state() private test_equipment = '';
  @state() private sample_name_sem = '';
  @state() private magnification = '';
  @state() private accelerating_voltage_kv: number | undefined = undefined;
  @state() private image_path = '';
  @state() private morphology_description_special_features = '';
  @state() private analysis_results = '';
  @state() private remarks = '';

  @state() private errorMessage = '';
  @state() private isEditMode = false;
  private currentImageId: number | undefined = undefined; // For SEM, this is 'id'
  private fiber_id: number | undefined = undefined;

  static styles = css`
    /* Basic Modal Styling (same as other forms) */
    .modal { display: none; position: fixed; z-index: 1001; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); }
    .modal-content { background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 90%; max-width: 700px; border-radius: 8px; }
    .modal[visible] { display: block; }
    .close-button { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
    label { display: block; margin-top: 10px; font-weight: bold; }
    input[type="text"], input[type="number"], input[type="date"], textarea { width: calc(100% - 18px); padding: 8px; margin-top: 4px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .full-width { grid-column: 1 / -1; }
    button[type="submit"], button[type="button"] { background-color: #4CAF50; color: white; padding: 10px 15px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="button"] { background-color: #f44336; margin-left: 10px; }
  `;

  show() { this.visible = true; if (!this.isEditMode && this.fiber_id_context) this.fiber_id = this.fiber_id_context; }
  close() { this.visible = false; this.resetForm(); }

  resetForm() {
    this.fiber_id = this.fiber_id_context ?? undefined;
    this.test_date = '';
    this.testing_institution = '';
    this.test_equipment = '';
    this.sample_name_sem = '';
    this.magnification = '';
    this.accelerating_voltage_kv = undefined;
    this.image_path = '';
    this.morphology_description_special_features = '';
    this.analysis_results = '';
    this.remarks = '';
    this.errorMessage = '';
  }

  firstUpdated() {
    if (this.fiber_id_context && !this.isEditMode) {
        this.fiber_id = this.fiber_id_context;
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.fiber_id) {
        this.errorMessage = "Fiber ID is missing.";
        return;
    }
    if (!this.image_path) {
        this.errorMessage = "Image path is required for SEM.";
        return;
    }

    const dataToSubmit: Omit<FiberMicrostructureSem, 'id' | 'entry_date' | 'added_by'> = {
      fiber_id: this.fiber_id,
      test_date: this.test_date || null,
      testing_institution: this.testing_institution || null,
      test_equipment: this.test_equipment || null,
      sample_name_sem: this.sample_name_sem || null,
      magnification: this.magnification || null,
      accelerating_voltage_kv: this.accelerating_voltage_kv,
      image_path: this.image_path, // Required
      morphology_description_special_features: this.morphology_description_special_features || null,
      analysis_results: this.analysis_results || null,
      remarks: this.remarks || null,
    };

    const url = this.isEditMode
      ? '/api/microstructure/sem.update'
      : '/api/microstructure/sem.create';

    const body = this.isEditMode
        ? { ...dataToSubmit, id: this.currentImageId } // SEM uses 'id'
        : dataToSubmit;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      dispatch(this, 'form-submitted', { type: 'sem' });
      this.close();
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to submit form.';
      console.error('SEM Form submission error:', error);
    }
  }

  render() {
    return html`
      <div class="modal" ?visible="${this.visible}">
        <div class="modal-content">
          <span class="close-button" @click="${this.close}">&times;</span>
          <h3>${this.isEditMode ? '编辑' : '添加'} SEM 图像数据</h3>
          <p>关联纤维ID: ${this.fiber_id || this.fiber_id_context || '未指定'}</p>
          ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
          <form @submit="${this.handleSubmit}">
            <div class="form-grid">
              <div>
                <label for="image_path">图像路径*:</label>
                <input id="image_path" type="text" .value="${this.image_path}" @input="${(e: Event) => this.image_path = (e.target as HTMLInputElement).value}" required>
              </div>
              <div>
                <label for="sample_name_sem">试样名称:</label>
                <input id="sample_name_sem" type="text" .value="${this.sample_name_sem}" @input="${(e: Event) => this.sample_name_sem = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="test_date">测试日期:</label>
                <input id="test_date" type="date" .value="${this.test_date}" @input="${(e: Event) => this.test_date = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="testing_institution">测试机构:</label>
                <input id="testing_institution" type="text" .value="${this.testing_institution}" @input="${(e: Event) => this.testing_institution = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="test_equipment">测试设备:</label>
                <input id="test_equipment" type="text" .value="${this.test_equipment}" @input="${(e: Event) => this.test_equipment = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="magnification">放大倍数:</label>
                <input id="magnification" type="text" .value="${this.magnification}" @input="${(e: Event) => this.magnification = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="accelerating_voltage_kv">加速电压 (kV):</label>
                <input id="accelerating_voltage_kv" type="number" step="0.1" .valueAsNumber="${this.accelerating_voltage_kv || NaN}" @input="${(e: Event) => this.accelerating_voltage_kv = (e.target as HTMLInputElement).valueAsNumber}">
              </div>
              <div class="full-width">
                <label for="morphology_description_special_features">形貌特征描述:</label>
                <textarea id="morphology_description_special_features" .value="${this.morphology_description_special_features}" @input="${(e: Event) => this.morphology_description_special_features = (e.target as HTMLInputElement).value}"></textarea>
              </div>
              <div class="full-width">
                <label for="analysis_results">分析结果 (如EDS):</label>
                <textarea id="analysis_results" .value="${this.analysis_results}" @input="${(e: Event) => this.analysis_results = (e.target as HTMLInputElement).value}"></textarea>
              </div>
              <div class="full-width">
                <label for="remarks">备注:</label>
                <textarea id="remarks" .value="${this.remarks}" @input="${(e: Event) => this.remarks = (e.target as HTMLInputElement).value}"></textarea>
              </div>
            </div>
            <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
            <button type="button" @click="${this.close}">取消</button>
          </form>
        </div>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/mc-sem-form.ts

// START OF FILE: client/src/components/mc-xps-form.ts
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

// Based on FiberMicrostructureXps interface from model.ts
interface FiberMicrostructureXps {
  test_id?: number;
  fiber_id: number;
  test_date?: string | null;
  testing_institution?: string | null;
  test_equipment?: string | null;
  carbon_at_percent?: number | null;
  oxygen_at_percent?: number | null;
  nitrogen_at_percent?: number | null;
  other_elements_xps?: string | null;
  chemical_state_info_xps?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  remarks?: string | null;
}

@customElement('mc-xps-form')
export class McXpsForm extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: Object })
  set editData(data: FiberMicrostructureXps | null) {
    if (data) {
      this.isEditMode = true;
      this.currentTestId = data.test_id;
      this.fiber_id = data.fiber_id;
      this.test_date = data.test_date ? data.test_date.split('T')[0] : '';
      this.testing_institution = data.testing_institution || '';
      this.test_equipment = data.test_equipment || '';
      this.carbon_at_percent = data.carbon_at_percent || undefined;
      this.oxygen_at_percent = data.oxygen_at_percent || undefined;
      this.nitrogen_at_percent = data.nitrogen_at_percent || undefined;
      this.other_elements_xps = data.other_elements_xps || '';
      this.chemical_state_info_xps = data.chemical_state_info_xps || '';
      this.result_chart_path = data.result_chart_path || '';
      this.raw_data_path = data.raw_data_path || '';
      this.remarks = data.remarks || '';
    } else {
      this.isEditMode = false;
      this.currentTestId = undefined;
      this.resetForm();
    }
  }

  @property({ type: Number }) fiber_id_context: number | null = null;

  @state() private test_date = '';
  @state() private testing_institution = '';
  @state() private test_equipment = '';
  @state() private carbon_at_percent: number | undefined = undefined;
  @state() private oxygen_at_percent: number | undefined = undefined;
  @state() private nitrogen_at_percent: number | undefined = undefined;
  @state() private other_elements_xps = '';
  @state() private chemical_state_info_xps = '';
  @state() private result_chart_path = '';
  @state() private raw_data_path = '';
  @state() private remarks = '';

  @state() private errorMessage = '';
  @state() private isEditMode = false;
  private currentTestId: number | undefined = undefined;
  private fiber_id: number | undefined = undefined;

  static styles = css`
    /* Basic Modal Styling (same as other forms) */
    .modal { display: none; position: fixed; z-index: 1001; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); }
    .modal-content { background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 90%; max-width: 700px; border-radius: 8px; }
    .modal[visible] { display: block; }
    .close-button { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
    label { display: block; margin-top: 10px; font-weight: bold; }
    input[type="text"], input[type="number"], input[type="date"], textarea { width: calc(100% - 18px); padding: 8px; margin-top: 4px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .full-width { grid-column: 1 / -1; }
    button[type="submit"], button[type="button"] { background-color: #4CAF50; color: white; padding: 10px 15px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="button"] { background-color: #f44336; margin-left: 10px; }
  `;

  show() { this.visible = true; if (!this.isEditMode && this.fiber_id_context) this.fiber_id = this.fiber_id_context; }
  close() { this.visible = false; this.resetForm(); }

  resetForm() {
    this.fiber_id = this.fiber_id_context ?? undefined;
    this.test_date = '';
    this.testing_institution = '';
    this.test_equipment = '';
    this.carbon_at_percent = undefined;
    this.oxygen_at_percent = undefined;
    this.nitrogen_at_percent = undefined;
    this.other_elements_xps = '';
    this.chemical_state_info_xps = '';
    this.result_chart_path = '';
    this.raw_data_path = '';
    this.remarks = '';
    this.errorMessage = '';
  }

  firstUpdated() {
    if (this.fiber_id_context && !this.isEditMode) {
        this.fiber_id = this.fiber_id_context;
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.fiber_id) {
        this.errorMessage = "Fiber ID is missing.";
        return;
    }

    const dataToSubmit: Omit<FiberMicrostructureXps, 'test_id' | 'entry_date' | 'added_by'> = {
      fiber_id: this.fiber_id,
      test_date: this.test_date || null,
      testing_institution: this.testing_institution || null,
      test_equipment: this.test_equipment || null,
      carbon_at_percent: this.carbon_at_percent,
      oxygen_at_percent: this.oxygen_at_percent,
      nitrogen_at_percent: this.nitrogen_at_percent,
      other_elements_xps: this.other_elements_xps || null,
      chemical_state_info_xps: this.chemical_state_info_xps || null,
      result_chart_path: this.result_chart_path || null,
      raw_data_path: this.raw_data_path || null,
      remarks: this.remarks || null,
    };

    const url = this.isEditMode
      ? '/api/microstructure/xps.update'
      : '/api/microstructure/xps.create';

    const body = this.isEditMode
        ? { ...dataToSubmit, test_id: this.currentTestId }
        : dataToSubmit;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
      }
      dispatch(this, 'form-submitted', { type: 'xps' });
      this.close();
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Failed to submit form.';
      console.error('XPS Form submission error:', error);
    }
  }

  render() {
    return html`
      <div class="modal" ?visible="${this.visible}">
        <div class="modal-content">
          <span class="close-button" @click="${this.close}">&times;</span>
          <h3>${this.isEditMode ? '编辑' : '添加'} XPS 分析数据</h3>
          <p>关联纤维ID: ${this.fiber_id || this.fiber_id_context || '未指定'}</p>
          ${this.errorMessage ? html`<p style="color: red;">${this.errorMessage}</p>` : ''}
          <form @submit="${this.handleSubmit}">
            <div class="form-grid">
              <div>
                <label for="test_date">测试日期:</label>
                <input id="test_date" type="date" .value="${this.test_date}" @input="${(e: Event) => this.test_date = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="testing_institution">测试机构:</label>
                <input id="testing_institution" type="text" .value="${this.testing_institution}" @input="${(e: Event) => this.testing_institution = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="test_equipment">测试设备:</label>
                <input id="test_equipment" type="text" .value="${this.test_equipment}" @input="${(e: Event) => this.test_equipment = (e.target as HTMLInputElement).value}">
              </div>
              <div>
                <label for="carbon_at_percent">碳 (at%):</label>
                <input id="carbon_at_percent" type="number" step="0.01" .valueAsNumber="${this.carbon_at_percent || NaN}" @input="${(e: Event) => this.carbon_at_percent = (e.target as HTMLInputElement).valueAsNumber}">
              </div>
              <div>
                <label for="oxygen_at_percent">氧 (at%):</label>
                <input id="oxygen_at_percent" type="number" step="0.01" .valueAsNumber="${this.oxygen_at_percent || NaN}" @input="${(e: Event) => this.oxygen_at_percent = (e.target as HTMLInputElement).valueAsNumber}">
              </div>
              <div>
                <label for="nitrogen_at_percent">氮 (at%):</label>
                <input id="nitrogen_at_percent" type="number" step="0.01" .valueAsNumber="${this.nitrogen_at_percent || NaN}" @input="${(e: Event) => this.nitrogen_at_percent = (e.target as HTMLInputElement).valueAsNumber}">
              </div>
              <div class="full-width">
                <label for="other_elements_xps">其他元素含量:</label>
                <textarea id="other_elements_xps" .value="${this.other_elements_xps}" @input="${(e: Event) => this.other_elements_xps = (e.target as HTMLInputElement).value}"></textarea>
              </div>
              <div class="full-width">
                <label for="chemical_state_info_xps">化学态信息:</label>
                <textarea id="chemical_state_info_xps" .value="${this.chemical_state_info_xps}" @input="${(e: Event) => this.chemical_state_info_xps = (e.target as HTMLInputElement).value}"></textarea>
              </div>
              <div class="full-width">
                <label for="result_chart_path">XPS谱图路径:</label>
                <input id="result_chart_path" type="text" .value="${this.result_chart_path}" @input="${(e: Event) => this.result_chart_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="raw_data_path">原始数据路径:</label>
                <input id="raw_data_path" type="text" .value="${this.raw_data_path}" @input="${(e: Event) => this.raw_data_path = (e.target as HTMLInputElement).value}">
              </div>
              <div class="full-width">
                <label for="remarks">备注:</label>
                <textarea id="remarks" .value="${this.remarks}" @input="${(e: Event) => this.remarks = (e.target as HTMLInputElement).value}"></textarea>
              </div>
            </div>
            <button type="submit">${this.isEditMode ? '更新' : '创建'}</button>
            <button type="button" @click="${this.close}">取消</button>
          </form>
        </div>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/mc-xps-form.ts

// START OF FILE: client/src/components/body.ts
```typescript
import "../stagewise.js";
import { html } from "../utils.js";
import "./home-content.js";
import "./nav.js";
import "./resin-spinning-content.js";
import "./fiber-performance-content.js";
import "./microstructure-characteristics-content.js";

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
         // Load content based on initial path
        this.loadContent(window.location.pathname, contentWrapper);
    }

    private loadContent(path: string, container: HTMLElement): void {
        // 清除当前内容
        container.innerHTML = "";

        // 根据路径加载对应的组件
        switch (path) {
            case "/":
            case "/home": // Assuming /home also routes to home-content
                container.appendChild(document.createElement("home-content"));
                break;
            case "/resin-spinning":
                container.appendChild(document.createElement("resin-spinning-content"));
                break;
            case "/fiber-properties":
                container.appendChild(document.createElement("fiber-performance-content"));
                break;
            case "/microstructure":
                container.appendChild(document.createElement("microstructure-characteristics-content"));
                break;
            case "/resin-interface":
                // Placeholder - replace with actual component when created
                container.textContent = "树脂及界面性能内容 (待开发)";
                break;
            case "/composite-structure":
                // Placeholder - replace with actual component when created
                container.textContent = "复合材料结构与性能内容 (待开发)";
                break;
            case "/ballistic-performance":
                 // Placeholder - replace with actual component when created
                container.textContent = "终端产品防弹性能内容 (待开发)";
                break;
            case "/literature-standards":
                 // Placeholder - replace with actual component when created
                container.textContent = "文献与标准内容 (待开发)";
                break;
            default:
                // Fallback to home-content for unknown paths
                container.appendChild(document.createElement("home-content"));
                console.warn(`Unknown path: ${path}, loading home content.`);
        }
    }
}

// 注册自定义元素
customElements.define("material-body", Body);
```
// END OF FILE: client/src/components/body.ts

// START OF FILE: client/src/utils.ts
```typescript
export function dispatch(element: EventTarget, type: string, detail?: any) {
    element.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

export const html = String.raw;

export const GlobalStyles = html`
    <style>
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
        /* Add other global styles, e.g., variables */
        :root {
            --primary-color: #007bff; /* Example primary color */
            --primary-color-dark: #0056b3;
            --accent-color: #ff4081;  /* Example accent color */
            --background-color: #f4f7fc;
            --text-color: #333;
            --surface-color: #fff;
            --border-color: #e0e0e0;
            --error-color: #d32f2f;

            --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

            --border-radius: 4px;
            --box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }

        material-icon {
            font-family: "Material Icons";
            font-weight: normal;
            font-style: normal;
            font-size: 24px; /* Preferred icon size */
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;

            /* Support for all WebKit browsers. */
            -webkit-font-smoothing: antialiased;
            /* Support for Safari and Chrome. */
            text-rendering: optimizeLegibility;

            /* Support for Firefox. */
            -moz-osx-font-smoothing: grayscale;

            /* Support for IE. */
            font-feature-settings: "liga";
        }
    </style>
`;
```
// END OF FILE: client/src/utils.ts

// START OF FILE: client/src/index.ts
```typescript
import "./components/header.js";
import "./components/body.js";
import { GlobalStyles } from "./utils.js";

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.innerHTML = GlobalStyles;
document.head.appendChild(styleSheet);

console.log("Main application script loaded.");
```
// END OF FILE: client/src/index.ts

// START OF FILE: client/src/components/header.ts
```typescript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("material-header")
export class Header extends LitElement {
    @property({ type: String })
    label = "UHMWPE纤维及其复合材料性能数据库";

    static styles = css`
        :host {
            display: block;
            width: 100%;
            background-color: var(--primary-color, #007bff); /* Default blue if var not defined */
            color: white;
            padding: 1rem 0; /* Vertical padding */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: fixed; /* Fixed at the top */
            top: 0;
            left: 0;
            z-index: 1000; /* Ensure it's above other content */
        }
        .header-content {
            display: flex;
            justify-content: space-between; /* Align items: title left, actions right */
            align-items: center;
            max-width: 100%; /* Full width */
            margin: 0 auto;
            padding: 0 1rem; /* Horizontal padding */
        }
        .header-title {
            font-size: 1.5rem; /* Larger font size */
            font-weight: bold; /* Make title bold */
        }
        .header-actions button {
            background-color: transparent;
            color: white;
            border: 1px solid white;
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
        }
        .header-actions button:hover {
            background-color: white;
            color: var(--primary-color, #007bff);
        }
    `;

    render() {
        return html`
            <header>
                <div class="header-content">
                    <div class="header-title">${this.label}</div>
                    <div class="header-actions">
                        <!-- Placeholder for login/user actions -->
                        <button @click=${this._handleLogin}>登录</button>
                        <button @click=${this._handleRegister}>注册</button>
                    </div>
                </div>
            </header>
        `;
    }

    private _handleLogin() {
        // Implement login logic or dispatch event
        console.log("Login clicked");
    }

    private _handleRegister() {
        // Implement register logic or dispatch event
        console.log("Register clicked");
    }
}
```
// END OF FILE: client/src/components/header.ts

// START OF FILE: client/src/components/login.ts
```typescript
// Placeholder for login.ts - Not implemented in detail for this example
// This would typically handle user authentication form and logic.
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

@customElement('login-form')
export class LoginForm extends LitElement {
  @state() private username = '';
  @state() private password = '';
  @state() private errorMessage = '';

  static styles = css`
    /* Basic form styling */
    .form-container { max-width: 300px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    input { width: 100%; padding: 8px; margin: 5px 0 15px 0; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer; }
    .error { color: red; }
  `;

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    // Basic validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }
    console.log('Attempting login with:', this.username, this.password);
    // Mock API call
    // In a real app, you'd fetch('/api/user/login', { method: 'POST', ... })
    // For now, simulate success or failure
    if (this.username === "admin" && this.password === "password") {
        dispatch(this, 'login-success', { username: this.username });
        console.log('Login successful (mock)');
    } else {
        this.errorMessage = 'Invalid credentials (mock).';
        console.log('Login failed (mock)');
    }
  }

  render() {
    return html`
      <div class="form-container">
        <h2>Login</h2>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ''}
        <form @submit="${this.handleSubmit}">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" .value="${this.username}" @input="${(e: Event) => this.username = (e.target as HTMLInputElement).value}">
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" .value="${this.password}" @input="${(e: Event) => this.password = (e.target as HTMLInputElement).value}">
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/login.ts

// START OF FILE: client/src/components/register.ts
```typescript
// Placeholder for register.ts - Not implemented in detail for this example
// This would handle user registration form and logic.
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dispatch } from '../utils.js';

@customElement('register-form')
export class RegisterForm extends LitElement {
  @state() private username = '';
  @state() private password = '';
  @state() private confirmPassword = '';
  @state() private email = '';
  @state() private errorMessage = '';

  static styles = css`
    /* Basic form styling */
    .form-container { max-width: 350px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    input { width: 100%; padding: 8px; margin: 5px 0 15px 0; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer; }
    .error { color: red; }
  `;

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Username and passwords are required.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    console.log('Attempting registration for:', this.username, this.email);
    // Mock API call
    // In a real app, fetch('/api/user/register', { method: 'POST', ... })
    // For now, simulate success
    dispatch(this, 'registration-success', { username: this.username });
    console.log('Registration successful (mock)');
  }

  render() {
    return html`
      <div class="form-container">
        <h2>Register</h2>
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ''}
        <form @submit="${this.handleSubmit}">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" .value="${this.username}" @input="${(e: Event) => this.username = (e.target as HTMLInputElement).value}">
          </div>
           <div>
            <label for="email">Email (Optional)</label>
            <input id="email" type="email" .value="${this.email}" @input="${(e: Event) => this.email = (e.target as HTMLInputElement).value}">
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" .value="${this.password}" @input="${(e: Event) => this.password = (e.target as HTMLInputElement).value}">
          </div>
          <div>
            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" .value="${this.confirmPassword}" @input="${(e: Event) => this.confirmPassword = (e.target as HTMLInputElement).value}">
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    `;
  }
}
```
// END OF FILE: client/src/components/register.ts

// START OF FILE: client/src/components/main.ts
```typescript
// This file might not be used if body.ts is the main layout manager.
// If it were, it would likely compose header, body, footer etc.
// For this example, we assume body.ts handles the main content switching.
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './header.js';
import './body.js'; // Assuming body handles nav and content area

@customElement('main-app')
export class MainApp extends LitElement {
  render() {
    return html`
      <material-header></material-header>
      <material-body></material-body>
      <!-- Optional footer could go here -->
    `;
  }

  // Remove createRenderRoot if you want to use the default shadow DOM
  // protected createRenderRoot() {
  //   return this; // Render to light DOM if you need global styles to apply easily
  // }
}

// Ensure this is only defined if main-app is used as the root.
// If index.html directly uses <material-header> and <material-body>, this isn't needed.
// customElements.get('main-app') || customElements.define('main-app', MainApp);
```
// END OF FILE: client/src/components/main.ts

// START OF FILE: client/src/stagewise.ts
```typescript
// This file could be for stagewise loading or global configurations.
// For now, it might be empty or used for polyfills, etc.
console.log("stagewise.ts loaded - can be used for global setup or polyfills.");

// Example: Polyfill for Element.prototype.replaceChildren if needed for older browsers
// if (!Element.prototype.replaceChildren) {
//   Element.prototype.replaceChildren = function(...nodes) {
//     while (this.firstChild) {
//       this.removeChild(this.firstChild);
//     }
//     this.append(...nodes);
//   };
// }
```
// END OF FILE: client/src/stagewise.tsThe consolidated frontend component source code, which I had in memory from a previous (unsuccessful) attempt to write it, has now been successfully written to `docs/frontend_components_source_code.md`.
