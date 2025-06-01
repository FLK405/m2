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
