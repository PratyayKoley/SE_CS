import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeTableDisplayTeacher from './TimetableDisplayTeacher';

export default function TeacherPage() {
    const [teachers, setTeachers] = useState([]); // State to hold teacher names
    const [selectedTeacher, setSelectedTeacher] = useState(''); // State to hold selected teacher
    const [timeTable, setTimeTable] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch teacher names from the backend
        const fetchTeachers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/teachers`); // Update this link as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch teachers');
                }
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleTeacherChange = (event) => {
        setSelectedTeacher(event.target.value); // Update the selected teacher
    };

    // Fetch timetable for the selected teacher
    const fetchTimetable = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/teachers/getTimeTable/${selectedTeacher}`);
            if (!response.ok) {
                throw new Error('Failed to fetch timetable');
            }
            const timetableData = await response.json();
            setTimeTable(timetableData);
        } catch (error) {
            console.error('Error fetching timetable:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-purple-200 p-6 flex flex-col justify-center items-center">
            <h2 className="text-4xl text-center text-gray-700 mb-12 font-extrabold tracking-wide">
                Teacher Dashboard
            </h2>

            {/* Dropdown for selecting a teacher */}
            <div className="mb-6 w-full max-w-md">
                <label htmlFor="teacherSelect" className="block text-gray-700 mb-2">Select Teacher:</label>
                <select
                    id="teacherSelect"
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="">-- Choose a Teacher --</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.name}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
                {/* View Timetable Card */}
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xs transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">View Timetable</h3>
                    <p className="text-gray-600 mb-4">Check your class schedule and timings.</p>
                    <button
                        onClick={fetchTimetable}
                        className="w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        disabled={!selectedTeacher} // Disable button if no teacher is selected
                    >
                        View Timetable
                    </button>
                </div>

                {/* Student Details Card */}
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xs transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">Student Details</h3>
                    <p className="text-gray-600 mb-4">Access information about your students.</p>
                    <button
                        onClick={() => navigate("/studentUnderTeacherDataPage", { state: { teacherName: selectedTeacher } })}
                        className="w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
                        disabled={!selectedTeacher} // Disable button if no teacher is selected
                    >
                        View Students
                    </button>
                </div>
            </div>

            {timeTable && <TimeTableDisplayTeacher timetable={timeTable} />}
        </div>
    );
}
