const assert = require('assert');
const app = require('../../src/app');

describe('\'cbStage2Agree\' service', () => {
  it('registered the service', () => {
    const service = app.service('cbStage2Agree');

    assert.ok(service, 'Registered the service (cbStage2Agree)');
  });
});
