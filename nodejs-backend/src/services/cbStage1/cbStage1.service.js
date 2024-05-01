const { CbStage1 } = require('./cbStage1.class');
const createModel = require('../../models/cbStage1.model');
const hooks = require('./cbStage1.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cbStage1', new CbStage1(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cbStage1');

  service.hooks(hooks);
};