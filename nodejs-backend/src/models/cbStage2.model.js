
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "" },
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