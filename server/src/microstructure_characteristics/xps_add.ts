import { Request, Response } from 'express';

export const addXpsData = async (req: Request, res: Response) => {
  console.log('addXpsData called (not implemented)', req.body);
  return res.status(501).json({ message: 'addXpsData not implemented' });
};
