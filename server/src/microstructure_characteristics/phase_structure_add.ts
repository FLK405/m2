import { Request, Response } from 'express';
import { FiberMicrostructurePhaseStructure } from './model.js';

export const addPhaseStructure = async (req: Request, res: Response) => {
  console.log('addPhaseStructure called (mock implementation)');
  const newRecordData: Partial<FiberMicrostructurePhaseStructure> = req.body;
  console.log('Received data:', newRecordData);

  if (!newRecordData.fiber_id || !newRecordData.test_method) {
    return res.status(400).json({
      code: 1,
      message: 'Validation Error: fiber_id and test_method are required (mock).',
      data: null,
    });
  }

  const mockCreatedRecord: FiberMicrostructurePhaseStructure = {
    test_id: Date.now(), // Mock ID
    fiber_id: newRecordData.fiber_id,
    test_method: newRecordData.test_method,
    test_date: newRecordData.test_date || new Date().toISOString().split('T')[0],
    testing_institution: newRecordData.testing_institution || 'Mock Institution',
    test_equipment: newRecordData.test_equipment || 'Mock Equipment',
    amorphous_phase_percent_nmr: newRecordData.amorphous_phase_percent_nmr || null,
    intermediate_phase_percent_nmr: newRecordData.intermediate_phase_percent_nmr || null,
    crystalline_phase_percent_nmr: newRecordData.crystalline_phase_percent_nmr || null,
    defective_crystalline_percent_nmr: newRecordData.defective_crystalline_percent_nmr || null,
    crystallinity_percent_raman: newRecordData.crystallinity_percent_raman || null,
    characteristic_peaks_raman: newRecordData.characteristic_peaks_raman || null,
    result_chart_path: newRecordData.result_chart_path || null,
    raw_data_path: newRecordData.raw_data_path || null,
    remarks: newRecordData.remarks || 'Mock remarks for phase structure.',
    entry_date: new Date().toISOString(),
    added_by: 'mock_user_ps_add',
  };

  return res.status(201).json({
    code: 0,
    message: '相结构数据创建成功 (mock)',
    data: mockCreatedRecord,
  });
};
