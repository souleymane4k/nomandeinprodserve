/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        useMongoClient: true,
        uri: process.env.MONGODB_URI || 'mongodb://206.81.6.182/nomadeserver-dev'
    },

    // Seed database on startup
    seedDB: true,
};
