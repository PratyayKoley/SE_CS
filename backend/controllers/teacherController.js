const csv = require('csvtojson');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Timetable = require('../models/Timetable');
const Classroom = require('../models/Classroom');

// Upload CSV of teachers and save them to MongoDB
exports.uploadTeachersCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const teachersData = await csv().fromString(req.file.buffer.toString());

    // Convert each CSV row to match the schema structure
    const teacherDocs = await Promise.all(
      teachersData.map(async (teacher) => {
        // Find or create classroom references based on class names (assuming class names are provided in CSV)
        const classRef = await Classroom.find({ roomNumber: teacher.classes }).select('_id');

        return {
          name: teacher.name,
          teaching_subjects: teacher.teaching_subjects.split('|'), // Convert to array if stored as comma-separated string
          lectureLoad: teacher.lectureLoad // Extract classroom IDs
        };
      })
    );

    // Insert parsed teacher documents into MongoDB
    await Teacher.insertMany(teacherDocs);

    res.json({ message: 'CSV data uploaded and teachers saved to MongoDB successfully' });
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).json({ error: 'Failed to process CSV file' });
  }
};

// Get all teachers from MongoDB
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

// Get students under a specific teacher based on the subjects they teach
exports.studentUnderTeacher = async (req, res) => {
  try {
    const { teacherName } = req.params;

    // Find the teacher by name
    const teacher = await Teacher.findOne({ name: teacherName });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Find students whose subjects match the teacher's subjects
    const studentsUnderTeacher = await Student.find({
      $or: [
        { subjects: { $in: teacher.teaching_subjects } },
        { llc: { $in: teacher.teaching_subjects } },
        { elective1: { $in: teacher.teaching_subjects } },
        { elective2: { $in: teacher.teaching_subjects } },
        { openElective: { $in: teacher.teaching_subjects } }
      ]
    });
    
    if (studentsUnderTeacher.length > 0) {
      return res.json(studentsUnderTeacher);
    } else {
      return res.status(404).json({ message: 'No students found under this teacher' });
    }
  } catch (error) {
    console.error('Error fetching students under teacher:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

exports.teacherTimeTable = async (req, res) => {
  const { teacherName } = req.params;

  try {
    // Fetch the timetable entries directly by teacher name
    const timetableEntries = await Timetable.find({ teacher: teacherName }).populate('classroom');

    if (timetableEntries.length === 0) {
      return res.status(404).json({ message: 'No schedule found for this teacher' });
    }

    // Organize the schedule by day and time slot
    const teacherSchedule = {};

    timetableEntries.forEach(entry => {
      if (!teacherSchedule[entry.day]) {
        teacherSchedule[entry.day] = []; // Initialize an empty array for each day
      }

      teacherSchedule[entry.day].push({
        timeSlot: entry.timeSlot,
        subject: entry.subject,
        classroom: entry.classroom,
      });
    });

    res.json({ teacherName, schedule: teacherSchedule });
  } catch (error) {
    console.error('Error fetching teacher timetable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
