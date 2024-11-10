import React from 'react';

export default function TimeTableDisplayTeacher({ timetable }) {
    // Log the timetable to verify the structure
    console.log(timetable);

    return (
        <div className="mt-10 w-full max-w-5xl mx-auto text-white">
            <h2 className="text-3xl font-semibold mb-6 text-black">Weekly Timetable for {timetable.teacherName}</h2>
            {Object.entries(timetable.schedule).map(([day, classes]) => (
                <div key={day} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-black">{day}</h3>
                    <table className="table-auto w-full bg-white bg-opacity-10 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="border border-gray-600 px-4 py-2">Time</th>
                                <th className="border border-gray-600 px-4 py-2">Subject</th>
                                <th className="border border-gray-600 px-4 py-2">Classroom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classInfo, index) => (
                                <tr key={`${day}-${index}`} className="bg-gray-700 odd:bg-gray-600">
                                    <td className="border border-gray-600 px-4 py-2">{classInfo.time}</td>
                                    <td className="border border-gray-600 px-4 py-2">{classInfo.subject}</td>
                                    <td className="border border-gray-600 px-4 py-2">{classInfo.classroom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
