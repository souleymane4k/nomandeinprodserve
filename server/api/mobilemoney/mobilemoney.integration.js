/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMobilemoney;

describe('Mobilemoney API:', function() {
  describe('GET /api/mobilemoneys', function() {
    var mobilemoneys;

    beforeEach(function(done) {
      request(app)
        .get('/api/mobilemoneys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          mobilemoneys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mobilemoneys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/mobilemoneys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mobilemoneys')
        .send({
          name: 'New Mobilemoney',
          info: 'This is the brand new mobilemoney!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMobilemoney = res.body;
          done();
        });
    });

    it('should respond with the newly created mobilemoney', function() {
      expect(newMobilemoney.name).to.equal('New Mobilemoney');
      expect(newMobilemoney.info).to.equal('This is the brand new mobilemoney!!!');
    });
  });

  describe('GET /api/mobilemoneys/:id', function() {
    var mobilemoney;

    beforeEach(function(done) {
      request(app)
        .get(`/api/mobilemoneys/${newMobilemoney._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          mobilemoney = res.body;
          done();
        });
    });

    afterEach(function() {
      mobilemoney = {};
    });

    it('should respond with the requested mobilemoney', function() {
      expect(mobilemoney.name).to.equal('New Mobilemoney');
      expect(mobilemoney.info).to.equal('This is the brand new mobilemoney!!!');
    });
  });

  describe('PUT /api/mobilemoneys/:id', function() {
    var updatedMobilemoney;

    beforeEach(function(done) {
      request(app)
        .put(`/api/mobilemoneys/${newMobilemoney._id}`)
        .send({
          name: 'Updated Mobilemoney',
          info: 'This is the updated mobilemoney!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMobilemoney = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMobilemoney = {};
    });

    it('should respond with the updated mobilemoney', function() {
      expect(updatedMobilemoney.name).to.equal('Updated Mobilemoney');
      expect(updatedMobilemoney.info).to.equal('This is the updated mobilemoney!!!');
    });

    it('should respond with the updated mobilemoney on a subsequent GET', function(done) {
      request(app)
        .get(`/api/mobilemoneys/${newMobilemoney._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let mobilemoney = res.body;

          expect(mobilemoney.name).to.equal('Updated Mobilemoney');
          expect(mobilemoney.info).to.equal('This is the updated mobilemoney!!!');

          done();
        });
    });
  });

  describe('PATCH /api/mobilemoneys/:id', function() {
    var patchedMobilemoney;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/mobilemoneys/${newMobilemoney._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Mobilemoney' },
          { op: 'replace', path: '/info', value: 'This is the patched mobilemoney!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMobilemoney = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMobilemoney = {};
    });

    it('should respond with the patched mobilemoney', function() {
      expect(patchedMobilemoney.name).to.equal('Patched Mobilemoney');
      expect(patchedMobilemoney.info).to.equal('This is the patched mobilemoney!!!');
    });
  });

  describe('DELETE /api/mobilemoneys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/mobilemoneys/${newMobilemoney._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mobilemoney does not exist', function(done) {
      request(app)
        .delete(`/api/mobilemoneys/${newMobilemoney._id}`)
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
