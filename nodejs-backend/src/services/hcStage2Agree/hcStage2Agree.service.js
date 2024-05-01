const { HcStage2Agree } = require('./hcStage2Agree.class');
const createModel = require('../../models/hcStage2Agree.model');
const hooks = require('./hcStage2Agree.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/hcStage2Agree', new HcStage2Agree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hcStage2Agree');

  service.hooks(hooks);
};