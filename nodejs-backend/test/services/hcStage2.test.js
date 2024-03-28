const assert = require('assert');
const app = require('../../src/app');

describe('\'hcStage2\' service', () => {
  it('registered the service', () => {
    const service = app.service('hcStage2');

    assert.ok(service, 'Registered the service (hcStage2)');
  });
});
