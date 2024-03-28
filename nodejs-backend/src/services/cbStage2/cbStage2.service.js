const { CbStage2 } = require('./cbStage2.class');
const createModel = require('../../models/cbStage2.model');
const hooks = require('./cbStage2.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cbStage2', new CbStage2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cbStage2');

  service.hooks(hooks);
};