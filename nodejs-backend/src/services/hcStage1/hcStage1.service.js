const { HcStage1 } = require('./hcStage1.class');
const createModel = require('../../models/hcStage1.model');
const hooks = require('./hcStage1.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/hcStage1', new HcStage1(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hcStage1');

  service.hooks(hooks);
};