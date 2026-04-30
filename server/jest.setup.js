const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// Start the in-memory MongoDB server before tests
beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.connection_string = mongoUri;
    
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    // Connect to the in-memory server
    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB Memory Server started and connected');
  } catch (error) {
    console.error('Failed to start MongoDB Memory Server:', error);
    throw error;
  }
}, 60000); // Increase timeout for server startup

// Cleanup after all tests
afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
      console.log('✓ MongoDB Memory Server stopped');
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}, 30000); // Increase timeout for cleanup


