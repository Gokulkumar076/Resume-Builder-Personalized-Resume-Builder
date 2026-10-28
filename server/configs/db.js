import mongoose from "mongoose";
import dns from "dns";

// Fix for Node.js SRV resolution on mobile hotspots / Windows
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    // fallback to system resolver
}

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("✅ Database connected successfully to MongoDB Atlas!");
        });

        let mongodbURI = process.env.MONGODB_URI;
        const projectName = 'resume-builder';

        if (!mongodbURI) {
            throw new Error("MONGODB_URI environment variable not set");
        }

        if (mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`, {
            serverSelectionTimeoutMS: 10000
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;
