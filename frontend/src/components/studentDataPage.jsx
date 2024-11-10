import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const StudentData = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/students`)
            .then((response) => response.json())
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => console.error('Error fetching student data:', error));
    }, []);

    const downloadExcel = () => {
        // Create a copy of students array with subjects as a string (CSV format)
        const formattedStudents = students.map((student) => ({
            ...student,
            subjects: student.subjects.join(', '), // Convert subjects array to string 
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedStudents); // Use the updated array
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

        // Create Excel file and trigger download
        XLSX.writeFile(workbook, 'student_data.xlsx');
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                Student Data
            </h2>

            <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Name</th>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Sem</th>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Subjects</th>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Elective 1</th>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Elective 2</th>
                        <th className="py-3 px-4 text-center border-r border-gray-300">Open Elective</th>
                        <th className="py-3 px-4 text-center">LLC</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.name}</td>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.semester}</td>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.subjects.join(', ')}</td>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.elective1}</td>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.elective2}</td>
                            <td className="py-3 px-4 border-r border-b border-gray-300">{student.openElective}</td>
                            <td className="py-3 px-4 border-b border-gray-300">{student.llc}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex justify-center mt-8">
                <button
                    onClick={downloadExcel}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                >
                    Download as Excel
                </button>
            </div>
        </div>
    );
};

export default StudentData;
