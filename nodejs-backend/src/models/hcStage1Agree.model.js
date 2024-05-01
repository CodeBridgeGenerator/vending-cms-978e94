
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "" },
       TechName: { type: String, default: null },
       TechSign: { type: String, default: null },
       TechDate: { type: Date, default: null },
       TechProceed: { type: String },
       SvName: { type: String, default: null },
       SvSign: { type: String, default: null },
       SvDate: { type: Date, default: null },
       SvProceed: { type: String },
       ManagerName: { type: String, default: null },
       ManagerSign: { type: String, default: null },
       ManagerDate: { type: Date, default: null },
       ManagerProceed: { type: String },
       Remarks: { type: String, default: null },

            
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