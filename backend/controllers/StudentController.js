const csv = require('csvtojson');
const Student = require('../models/Student'); // Mongoose Student model

// Enroll a single student (Save to MongoDB)
exports.enrollStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Create and save the new student in MongoDB
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.send('Student enrolled successfully');
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).send('Error enrolling student');
  }
};

// Get all students (Retrieve from MongoDB)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Upload CSV of students and save them to MongoDB
exports.uploadStudentCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the CSV file into JSON
    const students = await csv().fromString(req.file.buffer.toString());

    // Convert 'subjects' string to an array for each student
    students.forEach(student => {
      if (student.subjects) {
        student.subjects = student.subjects.split('|');
      }
    });

    // Insert parsed students into MongoDB
    await Student.insertMany(students);

    res.json({ message: 'CSV data uploaded and students saved to MongoDB successfully' });
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).json({ error: 'Failed to process CSV file' });
  }
};
