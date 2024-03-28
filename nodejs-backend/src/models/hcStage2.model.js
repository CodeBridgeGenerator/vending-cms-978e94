    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'hcStage2';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   RefNo: { type: Schema.Types.ObjectId, ref: "hCMasterForm" },
       ExternalBody: { type: String },
       InternalBody: { type: String },
       DisplayPanel: { type: String },
       DoorHandle: { type: String },
       CoinReturnLever: { type: String },
       CoinReturnPocket: { type: String },
       DeliveryDoorFlap: { type: String },
       SelectorButton: { type: String },
       BodySticker: { type: String },
       ProductCanister: { type: String },
       Chute: { type: String },
       Tube: { type: String },
       CarbonationUnit: { type: String },
       SyrupCanister: { type: String },
       Valve: { type: String },
       MachineFloorBoard: { type: String },
       PaymentDevice: { type: String },
       CashlessUnit: { type: String },
       PSUBoard: { type: String },
       VendBoard: { type: String },
       RelaySupply: { type: String },
       MemoryBoard: { type: String },
       Remote: { type: String },
       Compressor: { type: String },
       CoolingFan: { type: String },
       IceMaker: { type: String },

            
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