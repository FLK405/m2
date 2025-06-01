import { Request, Response } from 'express';

export const addSemImage = async (req: Request, res: Response) => {
  console.log('addSemImage called (not implemented)', req.body);
  return res.status(501).json({ message: 'addSemImage not implemented' });
};
