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
export const createJob = async (req, res, next) => {
    
    try {
        let collection = db.collection("jobs");
        let newJob = {
            id: collection.totalSize() + 1,
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            location: req.body.location,
            salary: req.body.salary,
            company: {
                name: req.body.company.name,
                description: req.body.company.description,
                contactEmail: req.body.company.contactEmail,
                contactPhone: req.body.company.contactPhone,
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
        const query = {id: parseInt(req.params.id)};
        const updates = {
            $set: {
                title: req.body.title,
                type: req.body.type,
                description: req.body.description,
                location: req.body.location,
                salary: req.body.salary,
                company: {
                    name: req.body.company.name,
                    description: req.body.company.description,
                    contactEmail: req.body.company.contactEmail,
                    contactPhone: req.body.company.contactPhone,
                },
            },
        };

        let collection = db.collection("jobs");
        let result = await collection.updateOne(query, updates);
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
        const query = {id : parseInt(req.params.id)};

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