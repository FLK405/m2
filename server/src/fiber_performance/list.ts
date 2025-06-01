import { Request, Response } from 'express';
import { Fiber } from './model.js'; // Assuming Fiber interface is exported from model.ts

/**
 * Returns a mock list of fibers.
 */
export const listFibers = async (req: Request, res: Response) => {
  console.log('listFibers called (returning mock data)', req.body);

  const mockFibers: Fiber[] = [
    {
      fiber_id: 1,
      manufacturer: 'MockManufacturer A',
      grade: 'Grade X1',
      batch_no: 'BATCH-001',
      linear_density_dtex: 1100,
      filament_diameter_um: 15,
      filament_count: 200,
      source: 'Lab A',
      production_date: new Date().toISOString(),
      image_path: '/images/fiber_1.jpg',
      remarks: 'First mock fiber for testing.',
      added_by: 'mock_user',
      entry_date: new Date().toISOString(),
    },
    {
      fiber_id: 2,
      manufacturer: 'MockTech Fiber',
      grade: 'Grade Y2',
      batch_no: 'BATCH-002',
      linear_density_dtex: 1670,
      filament_diameter_um: 12,
      filament_count: 400,
      source: 'Lab B',
      production_date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      image_path: '/images/fiber_2.jpg',
      remarks: 'Second mock fiber, higher density.',
      added_by: 'mock_user',
      entry_date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    },
    {
      fiber_id: 3,
      manufacturer: 'FiberCorp',
      grade: 'Grade Z-Ultra',
      batch_no: 'BATCH-003',
      linear_density_dtex: 880,
      filament_diameter_um: 18,
      filament_count: 150,
      source: 'Pilot Plant',
      production_date: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
      image_path: null, // No image
      remarks: 'Third mock fiber, different properties.',
      added_by: 'test_admin',
      entry_date: new Date().toISOString(),
    }
  ];

  // Extract pagination from request body or use defaults
  const page = parseInt(req.body.page || '1', 10);
  const pageSize = parseInt(req.body.pageSize || '10', 10);

  // Simulate pagination for the mock data
  const total = mockFibers.length;
  const paginatedItems = mockFibers.slice((page - 1) * pageSize, page * pageSize);

  // Simulate the structure expected by the frontend (similar to resin-spinning-content.ts)
  return res.status(200).json({
    code: 0, // Assuming 0 is success code
    message: '获取纤维列表成功 (mock)',
    data: {
      total: total,
      items: paginatedItems,
      page: page,
      pageSize: pageSize,
    },
  });
};
