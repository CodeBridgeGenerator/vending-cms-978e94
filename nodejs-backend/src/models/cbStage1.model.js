    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'cbStage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "cBMasterForm" },
       ExternalBody: { type: String, required: true },
       InternalBody: { type: String, required: true },
       DisplayPanel: { type: String, required: true },
       DoorHandle: { type: String, required: true, default: '' },
       CoinReturnLever: { type: String, required: true },
       CoinReturnPocket: { type: String, required: true },
       DeliveryDoorFlap: { type: String, required: true },
       SecDoorPanel: { type: String, required: true },
       SecDoorFlap: { type: String, required: true },
       ColumnStnd: { type: String, required: true },
       ColumnMod: { type: String, required: true },
       ColumnFlipper: { type: String, required: true, default: '' },
       ProductChute: { type: String, required: true },
       MachineMaintenance: { type: String, required: false, default: '' },
       PSUBoard: { type: String, required: true },
       VendBoard: { type: String, required: true },
       RelaySupply: { type: String, required: true },
       MemoryBoard: { type: String, required: true },
       Remote: { type: String, required: true },
       Compressor: { type: String, required: true },
       CoolingFan: { type: String, required: true },
       Wiring: { type: String, required: true },
       Motor: { type: String, required: true },

            
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