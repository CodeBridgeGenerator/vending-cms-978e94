const assert = require('assert');
const app = require('../../src/app');

describe('\'hCMasterForm\' service', () => {
  it('registered the service', () => {
    const service = app.service('hCMasterForm');

    assert.ok(service, 'Registered the service (hCMasterForm)');
  });
});
