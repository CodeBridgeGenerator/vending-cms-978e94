const assert = require('assert');
const app = require('../../src/app');

describe('\'cBMasterForm\' service', () => {
  it('registered the service', () => {
    const service = app.service('cBMasterForm');

    assert.ok(service, 'Registered the service (cBMasterForm)');
  });
});
