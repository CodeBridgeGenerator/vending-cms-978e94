
      module.exports = function (app) {
          const modelName = 'users';
          const mongooseClient = app.get('mongooseClient');
          const { Schema } = mongooseClient;
          const schema = new Schema(
            {
                     name: { type: String },
       email: { type: String, unique: true, lowercase: true },
       password: { type: String },
       userType: { type: String },

              
            },
            {
              timestamps: true
          });
        
          if (mongooseClient.modelNames().includes(modelName)) {
            mongooseClient.deleteModel(modelName);
          }
          return mongooseClient.model(modelName, schema);
          
        };