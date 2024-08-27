import { jobs } from "./jobsList.js";

//@desc   Get all jobs
//@route  GET /api/jobs
export const getJobs = (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0 ) {
        return res
            .status(200)
            .json(jobs.slice(0, limit));
    }

    res.status(200).json(jobs);
};

//@desc   Get single job
//@route  GET /api/job/:id
export const getJob = (req, res, next) => {
    const id = parseInt(req.params.id);

    const job = jobs.find( (job) => job.id === id)

    if(!job) {
        const error = new Error(`The Job with ${id} is not found.`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(job);
};

//@desc   Create new Job
//@route  POST /api/jobs
export const createJob = (req, res) => {
    console.log(req.body);

    const newJob = {
        id: jobs.length + 1,
        title : req.body.title,
        type : req.body.type,
        description: req.body.description,
        location: req.body.location,
        salary : req.body.salary,
        company: {
          name: req.body.company.companyName,
          description: req.body.company.companyDescription,
          contactEmail: req.body.company.contactEmail,
          contactPhone: req.body.company.contactPhone
        },
    };

    // check for all the details

    jobs.push(newJob);
    res.status(201).json(jobs);
};

//@desc   Update jobs
//@route  PUT /api/jobs/:id
export const updateJob = (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = jobs.find( (job) => job.id === id);

    if(!job) {
        const error = new Error(`The job with ${id} is not found`);
        error.status = 404;
        return next(error);
    }

    job.id = id;
    job.title= req.body.title;

    
};

//@desc   Delete jobs
//@route  DELETE /api/jobs/:id
export const deleteJob = (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = jobs.find( (job) => job.id === id);

    if(!job) {
        const error = new Error(`The job with id ${id} is not found`);
        error.status = 404;
        return next(error);
    }

    jobs = jobs.filter( (job) => job.id !== id);
    res.status(200).json(jobs);
};