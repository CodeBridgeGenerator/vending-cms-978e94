const assert = require('assert');
const app = require('../../src/app');

describe('\'hcStage2Agree\' service', () => {
  it('registered the service', () => {
    const service = app.service('hcStage2Agree');

    assert.ok(service, 'Registered the service (hcStage2Agree)');
  });
});
