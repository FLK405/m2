import { Router } from 'express';

// Phase Structure Handlers
import { addPhaseStructure } from './phase_structure_add.js';
import { listPhaseStructures } from './phase_structure_list.js';
import { getPhaseStructureById } from './phase_structure_get.js';
import { updatePhaseStructure } from './phase_structure_update.js';
import { deletePhaseStructure } from './phase_structure_delete.js';

// Orientation & Crystallinity Handlers
import { addOrientationCrystallinity } from './orientation_crystallinity_add.js';
import { listOrientationCrystallinities } from './orientation_crystallinity_list.js';
import { getOrientationCrystallinityById } from './orientation_crystallinity_get.js';
import { updateOrientationCrystallinity } from './orientation_crystallinity_update.js';
import { deleteOrientationCrystallinity } from './orientation_crystallinity_delete.js';

// SEM Handlers
import { addSemImage } from './sem_add.js';
import { listSemImages } from './sem_list.js';
import { getSemImageById } from './sem_get.js';
import { updateSemImage } from './sem_update.js';
import { deleteSemImage } from './sem_delete.js';

// XPS Handlers
import { addXpsData } from './xps_add.js';
import { listXpsData } from './xps_list.js';
import { getXpsDataById } from './xps_get.js';
import { updateXpsData } from './xps_update.js';
import { deleteXpsData } from './xps_delete.js';

const router = Router();

// --- Phase Structure Routes ---
router.post("/phase_structure.create", addPhaseStructure);
router.post("/phase_structure.list", listPhaseStructures); // Could also be GET with query params
router.post("/phase_structure.get", getPhaseStructureById); // Or GET /phase_structure/:test_id
router.post("/phase_structure.update", updatePhaseStructure); // Or PUT /phase_structure/:test_id
router.post("/phase_structure.delete", deletePhaseStructure); // Or DELETE /phase_structure/:test_id

// --- Orientation & Crystallinity Routes ---
router.post("/orientation_crystallinity.create", addOrientationCrystallinity);
router.post("/orientation_crystallinity.list", listOrientationCrystallinities);
router.post("/orientation_crystallinity.get", getOrientationCrystallinityById);
router.post("/orientation_crystallinity.update", updateOrientationCrystallinity);
router.post("/orientation_crystallinity.delete", deleteOrientationCrystallinity);

// --- SEM Routes ---
router.post("/sem.create", addSemImage); // sem.create to align with others, even if PK is 'id'
router.post("/sem.list", listSemImages);
router.post("/sem.get", getSemImageById); // sem.get (expects 'id' in body)
router.post("/sem.update", updateSemImage); // sem.update (expects 'id' in body)
router.post("/sem.delete", deleteSemImage); // sem.delete (expects 'id' in body)

// --- XPS Routes ---
router.post("/xps.create", addXpsData);
router.post("/xps.list", listXpsData);
router.post("/xps.get", getXpsDataById);
router.post("/xps.update", updateXpsData);
router.post("/xps.delete", deleteXpsData);

// Consider routes for listing all microstructure data for a specific fiber_id
// Example: router.post("/fibers/:fiber_id/microstructure.listAll", listAllMicrostructureForFiber);

export default router;
