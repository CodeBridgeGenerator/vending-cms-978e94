const assert = require('assert');
const app = require('../../src/app');

describe('\'cbStage2\' service', () => {
  it('registered the service', () => {
    const service = app.service('cbStage2');

    assert.ok(service, 'Registered the service (cbStage2)');
  });
});
