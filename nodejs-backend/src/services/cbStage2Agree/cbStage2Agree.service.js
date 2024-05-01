const { CbStage2Agree } = require('./cbStage2Agree.class');
const createModel = require('../../models/cbStage2Agree.model');
const hooks = require('./cbStage2Agree.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cbStage2Agree', new CbStage2Agree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cbStage2Agree');

  service.hooks(hooks);
};