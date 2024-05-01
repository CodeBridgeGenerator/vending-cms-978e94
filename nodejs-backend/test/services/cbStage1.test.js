const assert = require('assert');
const app = require('../../src/app');

describe('\'cbStage1\' service', () => {
  it('registered the service', () => {
    const service = app.service('cbStage1');

    assert.ok(service, 'Registered the service (cbStage1)');
  });
});
