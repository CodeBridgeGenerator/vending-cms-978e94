const assert = require('assert');
const app = require('../../src/app');

describe('\'cbStage1Agree\' service', () => {
  it('registered the service', () => {
    const service = app.service('cbStage1Agree');

    assert.ok(service, 'Registered the service (cbStage1Agree)');
  });
});
