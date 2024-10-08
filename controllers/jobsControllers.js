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
    const query = {_id: new ObjectId(req.params.id)};

    const collection = db.collection("jobs");
    const result = await collection.findOne(query);

    if(!result) {
        const error = new Error(`The Job with ${req.params.id} is not found.`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(result);
};

//@desc   Create new Job
//@route  POST /api/jobs
export const createJob = async (req, res, next) => {
    
    try {
        let collection = db.collection("jobs");
        let job = req.body;
        let newJob = {
            title: job.title,
            type: job.type,
            description: job.description,
            location: job.location,
            salary: job.salary,
            company: {
                name: job.company.name,
                description: job.company.description,
                contactEmail: job.company.contactEmail,
                contactPhone: job.company.contactPhone,
            },
        };

        let result = collection.insertOne(newJob);
        res.status(201).json(result);
    } catch(err) {
        console.error(err);
        let error = new Error('Error sending data');
        error.status = 400;
        console.log(req.body);
        return next(error);
    }
    
};

//@desc   Update jobs
//@route  PUT /api/jobs/:id
export const updateJob = async (req, res, next) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };
        console.log(req.body);
        let job = req.body;
        let updatedJob = {
            $set: {
                title: job.title,
                type: job.type,
                description: job.description,
                location: job.location,
                salary: job.salary,
                company: {
                name: job.company.name,
                description: job.company.description,
                contactEmail: job.company.contactEmail,
                contactPhone: job.company.contactPhone,
                },
            }
            
        };

        let collection = db.collection("jobs");
        let result = await collection.updateOne(query, updatedJob);
        res.status(200).send(result);
    } catch(err) {
        console.error(err);
        const error = new Error('Error Updating the Record');
        error.status = 500;
        return next(error);
    }
    
    
};

//@desc   Delete jobs
//@route  DELETE /api/jobs/:id
export const deleteJob = async (req, res, next) => {
    
    try {
        const query = {_id: new ObjectId(req.params.id) };

        const collection = db.collection("jobs");
        let result = await collection.deleteOne(query);

        res.status(200).send(result);
    } catch(err) {
        console.error(err);
        const error = new Error("Error Deleting Job");
        error.status = 500;
        return next(error);
    }

};