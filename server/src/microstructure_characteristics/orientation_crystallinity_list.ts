import { Request, Response } from 'express';

export const listOrientationCrystallinities = async (req: Request, res: Response) => {
  console.log('listOrientationCrystallinities called (not implemented)', req.body);
  return res.status(501).json({ message: 'listOrientationCrystallinities not implemented', data: { items: [], total: 0, page: 1, pageSize: 10 } });
};
