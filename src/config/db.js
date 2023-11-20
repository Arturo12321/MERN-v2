import mongoose from "mongoose";

export const connectDB = async (host, port, dbName) => {
    try {
        await mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Detener la ejecución de la aplicación si no se puede conectar a la base de datos
    }
};