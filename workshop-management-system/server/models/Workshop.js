const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// DB Optimization: Indexing frequently queried fields
WorkshopSchema.index({ date: 1, title: 1 });

module.exports = mongoose.model('Workshop', WorkshopSchema);