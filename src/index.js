import app from './config/app.js'
import { config } from './config/settings.js';
import { connectDB } from './config/db.js';
const initApp = async () => {
    try {
        const { appConfig, dbConfig } = config;
        const { port: appPort } = appConfig;
        const { host: dbHost, port: dbPort, dbName } = dbConfig;

        await connectDB(dbHost, dbPort, dbName);

        app.listen(appPort, () => {
        console.log(`Server is running on port ${appPort}`);
    });
    } catch (error) {
        console.error("Error initializing the app:", error);
        process.exit(1);
    }
};

initApp();
