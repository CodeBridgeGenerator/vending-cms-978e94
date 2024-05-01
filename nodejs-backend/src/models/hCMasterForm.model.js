
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   RefNo: { type: String, required: true, unique: true, lowercase: false },
       Model: { type: String, required: true, unique: false, lowercase: false },
       SerialNo: { type: String, required: true, unique: true, lowercase: false },
       ManuYear: { type: String, unique: false, lowercase: false },
       Branch: { type: String, required: true, unique: false, lowercase: false },
       DateInspec: { type: Date, required: true },
       DateRecall: { type: Date, required: true },
       RecallLoc: { type: String, required: true, unique: false, lowercase: false },
       ActiveCase: { type: Boolean, default: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };