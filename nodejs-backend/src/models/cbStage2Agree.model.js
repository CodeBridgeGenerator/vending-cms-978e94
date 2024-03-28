    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'cbStage2Agree';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "cBMasterForm" },
       TechName: { type: String },
       TechSign: { type: String },
       TechDate: { type: Date },
       TechTrade: { type: Date },
       SvName: { type: String },
       SvSign: { type: String },
       SvDate: { type: Date },
       SvTrade: { type: Date },
       MngrName: { type: String },
       MngrSign: { type: String },
       MngrDate: { type: Date },
       MngrTrade: { type: Date },
       Remarks: { type: String },

            
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