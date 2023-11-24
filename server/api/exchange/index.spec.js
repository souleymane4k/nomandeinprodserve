/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var exchangeCtrlStub = {
  index: 'exchangeCtrl.index',
  show: 'exchangeCtrl.show',
  create: 'exchangeCtrl.create',
  upsert: 'exchangeCtrl.upsert',
  patch: 'exchangeCtrl.patch',
  destroy: 'exchangeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var exchangeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './exchange.controller': exchangeCtrlStub
});

describe('Exchange API Router:', function() {
  it('should return an express router instance', function() {
    expect(exchangeIndex).to.equal(routerStub);
  });

  describe('GET /api/exchanges', function() {
    it('should route to exchange.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'exchangeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/exchanges/:id', function() {
    it('should route to exchange.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'exchangeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/exchanges', function() {
    it('should route to exchange.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'exchangeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/exchanges/:id', function() {
    it('should route to exchange.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'exchangeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/exchanges/:id', function() {
    it('should route to exchange.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'exchangeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/exchanges/:id', function() {
    it('should route to exchange.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'exchangeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
