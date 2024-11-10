const csv = require('csvtojson');
const Classroom = require('../models/Classroom'); // Mongoose Classroom model

// Upload CSV of classrooms and save them to MongoDB
exports.uploadClassroomCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the CSV file into JSON
    const classrooms = await csv().fromString(req.file.buffer.toString());

    // Insert multiple classrooms into MongoDB
    await Classroom.insertMany(classrooms);

    res.json({ message: 'CSV data uploaded and classrooms saved to MongoDB successfully' });
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).json({ error: 'Failed to process CSV file' });
  }
};

// Get all classrooms from MongoDB
exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
};
