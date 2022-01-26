const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function initializeMongoServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri);

    mongoose.connection.on("error", err => {
        if (err.message.code === "ETIMEDOUT") {
            console.log(err);
            mongoose.connect(mongoUri);
        }
        console.log(err);
    });
    
    mongoose.connection.once("open", () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
}

module.exports = initializeMongoServer;