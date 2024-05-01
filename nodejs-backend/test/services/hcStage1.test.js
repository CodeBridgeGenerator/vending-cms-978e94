const assert = require('assert');
const app = require('../../src/app');

describe('\'hcStage1\' service', () => {
  it('registered the service', () => {
    const service = app.service('hcStage1');

    assert.ok(service, 'Registered the service (hcStage1)');
  });
});
