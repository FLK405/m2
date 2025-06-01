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
