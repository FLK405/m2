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
  private currentFiberId: number | null = null;

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
    // For now, list calls are commented out as backend returns 501 and structure might change
    // this.fetchPhaseStructures(); // Uncomment when backend list is ready
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
    try {
      const response = await fetch(endpoint, {
        method: 'POST', // Assuming .list are POST as per other modules
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fiber_id: this.currentFiberId /*, page, pageSize if implemented */ })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      (this[propertyName] as any) = result.data.items || [];
    } catch (error) {
      this.errorMessage = (error as Error).message;
      console.error(`Error fetching ${propertyName}:`, error);
    } finally {
      this.isLoading = false;
    }
  }

  // Example fetch, others would be similar
  fetchPhaseStructures() { this.fetchData('/api/microstructure/phase_structure.list', 'phaseStructures'); }
  fetchOrientationCrystallinities() { this.fetchData('/api/microstructure/orientation_crystallinity.list', 'orientationCrystallinities'); }
  fetchSemImages() { this.fetchData('/api/microstructure/sem.list', 'semImages'); }
  fetchXpsData() { this.fetchData('/api/microstructure/xps.list', 'xpsData'); }


  handleFormSubmitted = (event: CustomEvent) => {
    // Close the specific form that was submitted, if needed.
    // For now, just log and potentially refresh relevant data.
    console.log('Form submitted event received in content:', event.detail);
    const formType = (event.target as HTMLElement).tagName.toLowerCase();

    const formsToClose: { [key: string]: string } = {
        'mc-phase-structure-form': 'mc-phase-structure-form',
        'mc-orientation-crystallinity-form': 'mc-orientation-crystallinity-form',
        'mc-sem-form': 'mc-sem-form',
        'mc-xps-form': 'mc-xps-form',
    };

    if (formsToClose[formType]) {
        const form = this.shadowRoot?.querySelector(formsToClose[formType]);
        if (form && typeof (form as any).close === 'function') {
            (form as any).close();
        }
        // Optionally, refresh the specific list based on event.detail.type
        // e.g., if (event.detail.type === 'phase_structure') this.fetchPhaseStructures();
    }
  }

  openForm(formTagName: string) {
    let form = this.shadowRoot?.querySelector(formTagName);
    if (!form) {
      form = document.createElement(formTagName);
      this.shadowRoot?.appendChild(form);
    }
    // Pass currentFiberId. This assumes forms have a fiber_id_context property.
    if (this.currentFiberId !== null) {
        (form as any).fiber_id_context = this.currentFiberId;
    }
    (form as any).show();
  }

  renderSection<T>(title: string, data: T[], formTagName: string, renderItem: (item: T) => any, headers: string[]) {
    return html`
      <section>
        <h3>${title}</h3>
        <button class="add-button" @click="${() => this.openForm(formTagName)}">添加${title}数据</button>
        ${this.isLoading ? html`<p>加载中...</p>` : ''}
        ${this.errorMessage && this.errorMessage.toLowerCase().includes(title.toLowerCase()) ? html`<p style="color:red;">加载${title}错误: ${this.errorMessage}</p>` : ''}
        <table>
          <thead>
            <tr>${headers.map(h => html`<th>${h}</th>`)}<th>操作</th></tr>
          </thead>
          <tbody>
            ${data.length > 0
              ? data.map(item => renderItem(item))
              : html`<tr><td colspan="${headers.length + 1}">无数据</td></tr>`}
          </tbody>
        </table>
      </section>
    `;
  }

  render() {
    return html`
      <h2>微观结构特征</h2>
      <p>当前纤维ID: ${this.currentFiberId || '未选择'}</p>
      ${'' /* Add a fiber selector component here eventually */}

      ${this.renderSection<FiberMicrostructurePhaseStructure>(
        '相结构 (NMR/Raman)',
        this.phaseStructures,
        'mc-phase-structure-form',
        (item) => html`<tr><td>${item.test_id}</td><td>${item.test_method}</td><td>${item.test_date || 'N/A'}</td><td><button disabled>编辑</button> <button disabled>删除</button></td></tr>`,
        ['测试ID', '方法', '日期']
      )}

      ${this.renderSection<FiberMicrostructureOrientationCrystallinity>(
        '取向与结晶度 (WAXD/Sonic)',
        this.orientationCrystallinities,
        'mc-orientation-crystallinity-form',
        (item) => html`<tr><td>${item.test_id}</td><td>${item.test_method}</td><td>${item.test_date || 'N/A'}</td><td><button disabled>编辑</button> <button disabled>删除</button></td></tr>`,
        ['测试ID', '方法', '日期']
      )}

      ${this.renderSection<FiberMicrostructureSem>(
        'SEM图像',
        this.semImages,
        'mc-sem-form',
        (item) => html`<tr><td>${item.id}</td><td>${item.sample_name_sem || 'N/A'}</td><td>${item.image_path ? html`<img src="${item.image_path}" width="50" alt="SEM"/>` : 'N/A'}</td><td><button disabled>编辑</button> <button disabled>删除</button></td></tr>`,
        ['图像ID', '样品名', '图像']
      )}

      ${this.renderSection<FiberMicrostructureXps>(
        'XPS分析',
        this.xpsData,
        'mc-xps-form',
        (item) => html`<tr><td>${item.test_id}</td><td>${item.carbon_at_percent || 'N/A'}% C</td><td>${item.test_date || 'N/A'}</td><td><button disabled>编辑</button> <button disabled>删除</button></td></tr>`,
        ['测试ID', 'C (at%)', '日期']
      )}

      <mc-phase-structure-form .fiber_id_context="${this.currentFiberId}"></mc-phase-structure-form>
      <mc-orientation-crystallinity-form .fiber_id_context="${this.currentFiberId}"></mc-orientation-crystallinity-form>
      <mc-sem-form .fiber_id_context="${this.currentFiberId}"></mc-sem-form>
      <mc-xps-form .fiber_id_context="${this.currentFiberId}"></mc-xps-form>
    `;
  }
}
