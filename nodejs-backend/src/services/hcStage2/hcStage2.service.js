const { HcStage2 } = require('./hcStage2.class');
const createModel = require('../../models/hcStage2.model');
const hooks = require('./hcStage2.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/hcStage2', new HcStage2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hcStage2');

  service.hooks(hooks);
};