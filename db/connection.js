const mongoose = require("mongoose")
require("dotenv").config();
async function connectDB(app) {
    if (!process.env.MONGODB_URI) {
        console.log("ERROR: Invalid mongoDB URI, exiting...")
        process.exit(1)
    } else {
        try {
            console.log(`Starting your express server...`);

            await mongoose.connect(process.env.MONGODB_URI)
            console.log(`Database is now connected...`);
            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error(`FATAL ERROR: Error connecting to the database, exiting... `);
            process.exit(1)
        }
    }

}

module.exports = connectDB;