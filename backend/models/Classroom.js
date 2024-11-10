const mongoose = require('mongoose'); 

const classroomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  capacity: { type: Number },
  isLab: { type: Boolean, default: false }, // Indicates if the room is a lab
  bookings: [
    {
      semester: { type: Number },
      day: { type: String },
      timeSlot: { type: Number }, // Changed to Number for easier querying
      subject: { type: String },
    }
  ]
});

module.exports = mongoose.model('Classroom', classroomSchema);
