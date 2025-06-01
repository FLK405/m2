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
