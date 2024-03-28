const assert = require('assert');
const app = require('../../src/app');

describe('\'hcStage1Agree\' service', () => {
  it('registered the service', () => {
    const service = app.service('hcStage1Agree');

    assert.ok(service, 'Registered the service (hcStage1Agree)');
  });
});
