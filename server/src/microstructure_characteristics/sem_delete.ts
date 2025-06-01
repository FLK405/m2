import { Request, Response } from 'express';

export const deleteSemImage = async (req: Request, res: Response) => {
  // SEM table uses 'id' as its primary key
  const { id } = req.body; // Or req.params
  console.log(`deleteSemImage called for id: ${id} (not implemented)`, req.body);
  return res.status(501).json({ message: 'deleteSemImage not implemented' });
};
