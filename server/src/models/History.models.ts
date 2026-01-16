/*
*  src/models
*  - defines structure of data
*  - contraints, relationships & persistence rules
*
*  History.ts
*  - this means that History.ts defines what a 
*    History entity (table/collection) is and how it persists.
*  - just defines History entity's schema, constraints etc.
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

// Indexing: speeds up frequent queries by letting DB avoid full scans.
historySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("History", historySchema);