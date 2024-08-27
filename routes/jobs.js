import express from 'express';
import { 
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/jobsControllers.js';
const router = express.Router();


// To get all/limited jobs
router.get('/', getJobs);

// To get single job
router.get('/:id', getJob);

// Post new job
router.post('/', createJob);

// Update job
router.put('/:id', updateJob);

// Delete job
router.delete('/:id', deleteJob);

export default router;