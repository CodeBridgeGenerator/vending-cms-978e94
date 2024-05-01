const { HCMasterForm } = require('./hCMasterForm.class');
const createModel = require('../../models/hCMasterForm.model');
const hooks = require('./hCMasterForm.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/hCMasterForm', new HCMasterForm(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hCMasterForm');

  service.hooks(hooks);
};