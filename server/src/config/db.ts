/* 
  src/config
  - config -> things that wire the app together
  - configuration files are:
    - loaded once and do not change after initial setup
    - depend on env variables

  db.ts
  - this file configures:
    - HOW the app connects to Database (mongoose.connect(uri))
    - where credentials come from (.env)
    - when the app should fail (if db connection fails)
*/
import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI; 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("✅ MongoDB connected successfully!");
  } catch(err) {
    console.error("❌ MongoDB connection failed");
    process.exit(1);
  }
}
export default connectDB;