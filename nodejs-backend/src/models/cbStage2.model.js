    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'cbStage2';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "cBMasterForm" },
       ExternalBody: { type: String },
       InternalBody: { type: String },
       DisplayPanel: { type: String },
       DoorHandle: { type: String },
       CoinReturnLever: { type: String },
       CoinReturnPocket: { type: String },
       DeliveryDoorFlap: { type: String },
       SecDoorPanel: { type: String },
       SecDoorFlap: { type: String },
       ColumnStnd: { type: String },
       ColumnMod: { type: String, default: '' },
       ColumnFlipper: { type: String },
       MachineMaintenance: { type: String },
       PSUBoard: { type: String },
       VendBoard: { type: String },
       RelaySupply: { type: String },
       MemoryBoard: { type: String },
       Remote: { type: String },
       Compressor: { type: String },
       CoolingFan: { type: String },
       Wiring: { type: String },
       Motor: { type: String, default: '' },

            
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