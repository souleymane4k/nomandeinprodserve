/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mobilemoneys              ->  index
 * POST    /api/mobilemoneys              ->  create
 * GET     /api/mobilemoneys/:id          ->  show
 * PUT     /api/mobilemoneys/:id          ->  upsert
 * PATCH   /api/mobilemoneys/:id          ->  patch
 * DELETE  /api/mobilemoneys/:id          ->  destroy
 */

import { applyPatch } from 'fast-json-patch';
import Mobilemoney from './mobilemoney.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            applyPatch(entity, patches, /*validate*/ true);
        } catch(err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if(entity) {
            return entity.remove()
                .then(() => res.status(204).end());
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Mobilemoneys
export function index(req, res) {
    return Mobilemoney.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Mobilemoney from the DB
export function show(req, res) {
    return Mobilemoney.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Mobilemoney in the DB
export function create(req, res) {
    return Mobilemoney.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Mobilemoney in the DB at the specified ID
export function upsert(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Mobilemoney.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Mobilemoney in the DB
export function patch(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Mobilemoney.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Mobilemoney from the DB
export function destroy(req, res) {
    return Mobilemoney.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
