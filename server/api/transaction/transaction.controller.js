/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/transactions              ->  index
 * POST    /api/transactions              ->  create
 * GET     /api/transactions/:id          ->  show
 * PUT     /api/transactions/:id          ->  upsert
 * PATCH   /api/transactions/:id          ->  patch
 * DELETE  /api/transactions/:id          ->  destroy
 */

import { applyPatch } from 'fast-json-patch';
import Transaction from './transaction.model';

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

// Gets a list of Transactions
export function index(req,res) {
    return Transaction.find()
    .populate("userid")
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
    }
    
// Gets a single Transaction from the DB
export function show(req, res) {
    return Transaction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Transaction in the DB
export function create(req, res) {
    return Transaction.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Transaction in the DB at the specified ID
export function upsert(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Transaction.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Transaction in the DB
export function patch(req, res) {
    if(req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Transaction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Transaction from the DB
export function destroy(req, res) {
    return Transaction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
