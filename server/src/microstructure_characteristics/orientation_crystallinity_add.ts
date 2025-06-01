import { Request, Response } from 'express';

export const addOrientationCrystallinity = async (req: Request, res: Response) => {
  console.log('addOrientationCrystallinity called (not implemented)', req.body);
  return res.status(501).json({ message: 'addOrientationCrystallinity not implemented' });
};
