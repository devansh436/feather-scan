/*
  dirname => "models"
  - defines structure of data
  - contraints, relationships & persistence rules

  /models/History.ts
  - this means that History.ts defines what a 
    History entity (table/collection) is and how it persists.
  - just defines History entity's schema, constraints etc.
*/
import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    modelType: {
      type: String,
      required: true,
      index: true,
    },
    prediction: {
      label: {
        type: String,
        required: true,
      },
      confidence: {
        type: Number,
        required: true,
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("History", historySchema);