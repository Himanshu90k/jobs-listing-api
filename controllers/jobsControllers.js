// import { jobs } from "./jobsList.js";
import db from '../db/connection.js';
import { ObjectId } from "mongodb";

//@desc   Get all jobs
//@route  GET /api/jobs
export const getJobs = async (req, res, next) => {

    const collection = db.collection("jobs");
    const results = await collection.find().toArray();

    const limit = parseInt(req.query.limit);

    if(!isNaN(limit) && limit > 0 ) {
        return res
            .status(200)
            .json(results.slice(0, limit));
    }

    res.status(200).json(results);
};

//@desc   Get single job
//@route  GET /api/job/:id
export const getJob = async (req, res, next) => {
    const id = parseInt(req.params.id);

    const collection = db.collection("jobs");
    const result = await collection.findOne({id: id});
    console.log(result);

    if(!result) {
        const error = new Error(`The Job with ${id} is not found.`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(result);
};

//@desc   Create new Job
//@route  POST /api/jobs
export const createJob = (req, res, next) => {
    console.log(req.body);

    // check for all the details
    res.status(201).json(req.body);
};

//@desc   Update jobs
//@route  PUT /api/jobs/:id
export const updateJob = (req, res, next) => {
    const id = parseInt(req.params.id)
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