const { CbStage1Agree } = require('./cbStage1Agree.class');
const createModel = require('../../models/cbStage1Agree.model');
const hooks = require('./cbStage1Agree.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cbStage1Agree', new CbStage1Agree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cbStage1Agree');

  service.hooks(hooks);
};