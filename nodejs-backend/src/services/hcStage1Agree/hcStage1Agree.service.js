const { HcStage1Agree } = require('./hcStage1Agree.class');
const createModel = require('../../models/hcStage1Agree.model');
const hooks = require('./hcStage1Agree.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/hcStage1Agree', new HcStage1Agree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hcStage1Agree');

  service.hooks(hooks);
};