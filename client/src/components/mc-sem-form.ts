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
