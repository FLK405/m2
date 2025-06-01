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
