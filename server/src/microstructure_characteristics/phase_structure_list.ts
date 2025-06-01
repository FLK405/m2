import { Request, Response } from 'express';
import { FiberMicrostructurePhaseStructure } from './model.js';

export const listPhaseStructures = async (req: Request, res: Response) => {
  const { fiber_id, page = 1, pageSize = 10 } = req.body; // Assuming fiber_id might be part of request for filtering
  console.log(`listPhaseStructures called for fiber_id: ${fiber_id} (returning mock data)`, req.body);

  const mockItems: FiberMicrostructurePhaseStructure[] = [
    {
      test_id: 101,
      fiber_id: fiber_id || 1, // Use provided fiber_id or a default mock
      test_method: 'NMR',
      test_date: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
      testing_institution: 'Mock NMR Lab',
      test_equipment: 'NMR Spec 300',
      amorphous_phase_percent_nmr: 30.5,
      intermediate_phase_percent_nmr: 15.2,
      crystalline_phase_percent_nmr: 50.3,
      defective_crystalline_percent_nmr: 4.0,
      entry_date: new Date().toISOString(),
      added_by: 'mock_user_nmr',
      remarks: 'Initial NMR scan for batch X.',
    },
    {
      test_id: 102,
      fiber_id: fiber_id || 1,
      test_method: 'Raman',
      test_date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      testing_institution: 'Mock Raman Services',
      test_equipment: 'RamanScope Mark II',
      crystallinity_percent_raman: 65.8,
      characteristic_peaks_raman: 'Peak at 1130 cm-1, Peak at 1060 cm-1',
      result_chart_path: '/charts/raman_fiberX_002.png',
      entry_date: new Date().toISOString(),
      added_by: 'mock_user_raman',
      remarks: 'Raman analysis focusing on crystallinity.',
    }
  ];

  // Filter mock items if fiber_id was provided and we want to simulate filtering
  const filteredItems = fiber_id ? mockItems.filter(item => item.fiber_id === fiber_id) : mockItems;

  const total = filteredItems.length;
  const paginatedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  return res.status(200).json({
    code: 0,
    message: '获取相结构数据成功 (mock)',
    data: {
      total: total,
      items: paginatedItems,
      page: parseInt(page as string, 10),
      pageSize: parseInt(pageSize as string, 10),
    },
  });
};
