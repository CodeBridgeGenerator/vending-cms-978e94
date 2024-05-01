
    module.exports = function (app) {
        const modelName = '~cb-service-database-name~';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   Ref: { type: Schema.Types.ObjectId, ref: "" },
       ExternalBody: { type: String },
       InternalBody: { type: String, default: null },
       DisplayPanel: { type: String, default: null },
       DoorHandle: { type: String, default: null },
       CoinReturnLever: { type: String, default: null },
       CoinReturnPocket: { type: String, default: null },
       DeliveryDoorflap: { type: String, default: null },
       SelectorButton: { type: String, default: null },
       BodySticker: { type: String, default: null },
       ProductCanister: { type: String, default: null },
       Chute: { type: String, default: null },
       Tube: { type: String, default: null },
       CarbonationUnit: { type: String, default: null },
       SyrupCanister: { type: String, default: null },
       Valve: { type: String, default: null },
       MachineFloorBoard: { type: String, default: null },
       PaymentDevice: { type: String, default: null },
       CashlessUnit: { type: String, default: null },
       PSUBoard: { type: String, default: null },
       VendBoard: { type: String, default: null },
       RelaySupply: { type: String, default: null },
       MemoryBoard: { type: String, default: null },
       Remote: { type: String, default: null },
       Compressor: { type: String, default: null },
       CoolingFan: { type: String, default: null },
       IceMaker: { type: String, default: null },

            
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