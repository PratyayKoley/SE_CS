import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
    const [teacherFile, setTeacherFile] = useState(null);
    const [classroomFile, setClassroomFile] = useState(null);
    const [studentFile, setStudentFile] = useState(null);
    const [subjectFile, setSubjectFile] = useState(null);

    // Handle file change for teachers, classrooms, subjects and students
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (type === 'teachers') {
            setTeacherFile(file);
        } else if (type === 'classrooms') {
            setClassroomFile(file);
        } else if (type === 'students') {
            setStudentFile(file);
        } else if (type === 'subjects') {
            setSubjectFile(file);
        }
    };

    // Teacher file upload function
    const handleTeacherUpload = () => {
        if (!teacherFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', teacherFile);

        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/teachers/upload-teachers`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Teacher file uploaded and processed successfully!');
            })
            .catch((error) => console.error('Error uploading teacher file:', error));
    };

    // Classroom file upload function
    const handleClassroomUpload = () => {
        if (!classroomFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', classroomFile);

        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/classrooms/upload-classrooms`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Classroom file uploaded and processed successfully!');
            })
            .catch((error) => console.error('Error uploading classroom file:', error));
    };

    // Classroom file upload function
    const handleSubjectUpload = () => {
        if (!subjectFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', subjectFile);

        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/subjects/upload-subjects`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Subject file uploaded and processed successfully!');
            })
            .catch((error) => console.error('Error uploading subject file:', error));
    };

    // Student file upload function
    const handleStudentUpload = () => {
        if (!studentFile) {
            alert('Please select a file first!');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', studentFile);

        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/students/upload-students`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Student file uploaded and processed successfully!');
            })
            .catch((error) => console.error('Error uploading student file:', error));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-200 p-6">
            <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg mb-8 shadow-lg">
                <ul className="flex justify-center space-x-8">
                    <Link to="/generateTable">
                        <li className="text-white text-lg cursor-pointer hover:underline hover:text-yellow-200 transition-all duration-300">Generate Timetable</li>
                    </Link>
                    <Link to="/studentDataPage">
                        <li className="text-white text-lg cursor-pointer hover:underline hover:text-yellow-200 transition-all duration-300">Student Data</li>
                    </Link>
                    <Link to="/viewData">
                        <li className="text-white text-lg cursor-pointer hover:underline hover:text-yellow-200 transition-all duration-300">View Data</li>
                    </Link>
                </ul>
            </nav>

            <h2 className="text-4xl text-center text-gray-700 mb-12 font-extrabold tracking-wide">
                Admin Panel
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Teacher CSV Upload */}
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">Upload Teachers CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'teachers')}
                        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleTeacherUpload}
                        disabled={!teacherFile}
                        className={`w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg ${
                            teacherFile
                                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        Upload Teachers
                    </button>
                </div>

                {/* Classroom CSV Upload */}
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">Upload Classrooms CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'classrooms')}
                        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleClassroomUpload}
                        disabled={!classroomFile}
                        className={`w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg ${
                            classroomFile
                                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        Upload Classrooms
                    </button>
                </div>

                {/* Student CSV Upload */}
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">Upload Students CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'students')}
                        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleStudentUpload}
                        disabled={!studentFile}
                        className={`w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg ${
                            studentFile
                                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        Upload Students
                    </button>
                </div>

                {/* Subject CSV Upload */}
                <div className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl text-gray-700 mb-6 font-bold">Upload Subjects CSV</h3>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileUpload(e, 'subjects')}
                        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSubjectUpload}
                        disabled={!subjectFile}
                        className={`w-full py-3 text-white rounded-lg font-bold tracking-wider shadow-lg ${
                            subjectFile
                                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        Upload Subjects
                    </button>
                </div>
            </div>
        </div>
    );
}
