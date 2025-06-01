import { Request, Response } from 'express';

export const listSemImages = async (req: Request, res: Response) => {
  console.log('listSemImages called (not implemented)', req.body);
  return res.status(501).json({ message: 'listSemImages not implemented', data: { items: [], total: 0, page: 1, pageSize: 10 } });
};
