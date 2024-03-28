const { CBMasterForm } = require('./cBMasterForm.class');
const createModel = require('../../models/cBMasterForm.model');
const hooks = require('./cBMasterForm.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/cBMasterForm', new CBMasterForm(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cBMasterForm');

  service.hooks(hooks);
};