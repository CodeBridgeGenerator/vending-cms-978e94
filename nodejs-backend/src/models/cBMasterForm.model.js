    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'cBMasterForm';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   RefNo: { type: String, required: true, unique: true, lowercase: false },
       Model: { type: String, required: true, unique: false, lowercase: false },
       SerialNo: { type: String, required: true, unique: false, lowercase: false },
       ManuYear: { type: String, required: true, unique: false, lowercase: false },
       Branch: { type: String, required: true, unique: false, lowercase: false },
       DateInspec: { type: Date, required: false },
       DateRecall: { type: Date },
       RecallLoc: { type: String, required: true, unique: false, lowercase: false },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };