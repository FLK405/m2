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
