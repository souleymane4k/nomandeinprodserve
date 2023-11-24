/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var mobilemoneyCtrlStub = {
  index: 'mobilemoneyCtrl.index',
  show: 'mobilemoneyCtrl.show',
  create: 'mobilemoneyCtrl.create',
  upsert: 'mobilemoneyCtrl.upsert',
  patch: 'mobilemoneyCtrl.patch',
  destroy: 'mobilemoneyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mobilemoneyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './mobilemoney.controller': mobilemoneyCtrlStub
});

describe('Mobilemoney API Router:', function() {
  it('should return an express router instance', function() {
    expect(mobilemoneyIndex).to.equal(routerStub);
  });

  describe('GET /api/mobilemoneys', function() {
    it('should route to mobilemoney.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mobilemoneyCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/mobilemoneys/:id', function() {
    it('should route to mobilemoney.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mobilemoneyCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/mobilemoneys', function() {
    it('should route to mobilemoney.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mobilemoneyCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/mobilemoneys/:id', function() {
    it('should route to mobilemoney.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mobilemoneyCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/mobilemoneys/:id', function() {
    it('should route to mobilemoney.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mobilemoneyCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/mobilemoneys/:id', function() {
    it('should route to mobilemoney.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mobilemoneyCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
