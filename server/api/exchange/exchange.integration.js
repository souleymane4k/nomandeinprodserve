/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newExchange;

describe('Exchange API:', function() {
  describe('GET /api/exchanges', function() {
    var exchanges;

    beforeEach(function(done) {
      request(app)
        .get('/api/exchanges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          exchanges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(exchanges).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/exchanges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/exchanges')
        .send({
          name: 'New Exchange',
          info: 'This is the brand new exchange!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newExchange = res.body;
          done();
        });
    });

    it('should respond with the newly created exchange', function() {
      expect(newExchange.name).to.equal('New Exchange');
      expect(newExchange.info).to.equal('This is the brand new exchange!!!');
    });
  });

  describe('GET /api/exchanges/:id', function() {
    var exchange;

    beforeEach(function(done) {
      request(app)
        .get(`/api/exchanges/${newExchange._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          exchange = res.body;
          done();
        });
    });

    afterEach(function() {
      exchange = {};
    });

    it('should respond with the requested exchange', function() {
      expect(exchange.name).to.equal('New Exchange');
      expect(exchange.info).to.equal('This is the brand new exchange!!!');
    });
  });

  describe('PUT /api/exchanges/:id', function() {
    var updatedExchange;

    beforeEach(function(done) {
      request(app)
        .put(`/api/exchanges/${newExchange._id}`)
        .send({
          name: 'Updated Exchange',
          info: 'This is the updated exchange!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedExchange = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExchange = {};
    });

    it('should respond with the updated exchange', function() {
      expect(updatedExchange.name).to.equal('Updated Exchange');
      expect(updatedExchange.info).to.equal('This is the updated exchange!!!');
    });

    it('should respond with the updated exchange on a subsequent GET', function(done) {
      request(app)
        .get(`/api/exchanges/${newExchange._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let exchange = res.body;

          expect(exchange.name).to.equal('Updated Exchange');
          expect(exchange.info).to.equal('This is the updated exchange!!!');

          done();
        });
    });
  });

  describe('PATCH /api/exchanges/:id', function() {
    var patchedExchange;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/exchanges/${newExchange._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Exchange' },
          { op: 'replace', path: '/info', value: 'This is the patched exchange!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedExchange = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedExchange = {};
    });

    it('should respond with the patched exchange', function() {
      expect(patchedExchange.name).to.equal('Patched Exchange');
      expect(patchedExchange.info).to.equal('This is the patched exchange!!!');
    });
  });

  describe('DELETE /api/exchanges/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/exchanges/${newExchange._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when exchange does not exist', function(done) {
      request(app)
        .delete(`/api/exchanges/${newExchange._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
