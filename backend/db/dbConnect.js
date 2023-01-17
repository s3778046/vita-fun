// Import mongoose
const mongoose = require('mongoose');

// Set strictQuery option to false to prepare for new mongoose release.
mongoose.set('strictQuery', false);

// Craete connection to MongoDB database using mongoose methods.
const connectDB = async () => {

    // Try making a connection to database
    try {
        
        //Createconnection and store in variable called conn.
        const conn = await mongoose.connect(process.env.DB_URI);

        // Console log connection successmessage
        console.log(`MongoDB Connected: ${ conn.connection.host }`.green.underline);

    // Catch if exception is thrown
    } catch (error) {

        // Conole.log error message
        console.log(error);
        process.exit(1);
    }
}

// Export connection.
module.exports = connectDB;