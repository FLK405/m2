import { Request, Response } from 'express';
import { Fiber } from './model.js'; // Assuming Fiber interface is exported

/**
 * Mock implementation for adding a new fiber.
 * Logs received data and returns a success response with a mock created object.
 */
export const addFiber = async (req: Request, res: Response) => {
  console.log('addFiber called (mock implementation)');
  console.log('Received data:', req.body);

  const newFiberData: Partial<Fiber> = req.body;

  // Basic validation example (can be expanded)
  if (!newFiberData.grade || !newFiberData.batch_no) {
    return res.status(400).json({
      code: 1, // Assuming non-zero is error
      message: 'Validation Error: Grade and Batch No are required (mock).',
      data: null,
    });
  }

  // Simulate creating a new fiber object
  const mockCreatedFiber: Fiber = {
    fiber_id: Date.now(), // Mock ID using timestamp
    manufacturer: newFiberData.manufacturer || null,
    grade: newFiberData.grade,
    batch_no: newFiberData.batch_no,
    spinning_process_id: newFiberData.spinning_process_id || null,
    linear_density_dtex: newFiberData.linear_density_dtex || null,
    filament_diameter_um: newFiberData.filament_diameter_um || null,
    filament_count: newFiberData.filament_count || null,
    source: newFiberData.source || null,
    production_date: newFiberData.production_date || new Date().toISOString().split('T')[0],
    image_path: newFiberData.image_path || null,
    remarks: newFiberData.remarks || null,
    entry_date: new Date().toISOString(),
    added_by: 'mock_user_add', // Simulate added_by
  };

  return res.status(201).json({
    code: 0, // Assuming 0 is success code
    message: '纤维记录创建成功 (mock)',
    data: mockCreatedFiber,
  });
};

// Future: Add functions for adding specific performance data, e.g.:
// export const addFiberMolecularWeight = async (req: Request, res: Response) => { ... }
// export const addFiberTensileProperties = async (req: Request, res: Response) => { ... }
// etc.
