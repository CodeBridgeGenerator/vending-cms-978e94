    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'hcStage1';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "hCMasterForm" },
       ExternalBody: { type: String , enum: ["AV","GOOD","XAV","XGOOD"] },
       InternalBody: { type: Array, default: '' },
       DisplayPanel: { type: String, required: true },
       DoorHandle: { type: String, required: true },
       CoinReturnLever: { type: String, required: true },
       CoinReturnPocket: { type: String, required: true },
       DeliveryDoorflap: { type: String, required: true },
       SelectorButton: { type: String, required: true },
       BodySticker: { type: String, required: true },
       ProductCanister: { type: String, required: true },
       Chute: { type: String, required: true },
       Tube: { type: String, required: true },
       CarbonationUnit: { type: String, required: true },
       SyrupCanister: { type: String, required: true },
       Valve: { type: String, required: true },
       MachineFloorBoard: { type: String, required: true },
       PaymentDevice: { type: String, required: true },
       CashlessUnit: { type: String, required: true },
       PSUBoard: { type: String, required: true },
       VendBoard: { type: String, required: true },
       RelaySupply: { type: String, required: true },
       MemoryBoard: { type: String, required: true },
       Remote: { type: String, required: true },
       Compressor: { type: String, required: true },
       CoolingFan: { type: String, required: true },
       IceMaker: { type: String, required: true },

            
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