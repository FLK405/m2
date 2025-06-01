import { Router, Request, Response } from 'express';
import { addFiber } from './add.js';
import { listFibers } from './list.js';
import { getFiberById } from './get.js';
import { updateFiber } from './update.js';
import { deleteFiber } from './delete.js';

const router = Router();

// CRUD operations for Fibers
router.post("/fibers.create", addFiber);
router.post("/fibers.list", listFibers);
router.post("/fibers.get", getFiberById); // Assuming ID might come in body for POST consistency
router.post("/fibers.update", updateFiber);
router.post("/fibers.delete", deleteFiber);

// Placeholder for future routes related to specific fiber performance data
// For example:
// router.post("/fibers/:fiberId/molecularWeight.add", addMolecularWeightForFiber);
// router.get("/fibers/:fiberId/molecularWeight.list", listMolecularWeightsForFiber);
// router.get("/molecularWeight/:testId.get", getMolecularWeightTestDetails);
// router.post("/molecularWeight/:testId.update", updateMolecularWeightTestDetails);
// router.post("/molecularWeight/:testId.delete", deleteMolecularWeightTestDetails);
// ... and similarly for tensileProperties, creepProperties, etc.

// A generic endpoint to get all performance data for a specific fiber might also be useful
// router.post("/fibers/details.get", getFiberWithAllPerformanceData);


export default router;
