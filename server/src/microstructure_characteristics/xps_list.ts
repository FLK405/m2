import { Request, Response } from 'express';

export const listXpsData = async (req: Request, res: Response) => {
  console.log('listXpsData called (not implemented)', req.body);
  return res.status(501).json({ message: 'listXpsData not implemented', data: { items: [], total: 0, page: 1, pageSize: 10 } });
};
