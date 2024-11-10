import React, { useMemo } from 'react';
import { CalendarDays, Clock, User, Building2 } from 'lucide-react';

const MonthlyTimetableDisplay = ({ timetable }) => {
  const organizedTimetable = useMemo(() => {
    if (!timetable || !timetable.length) return {};
    
    // Group by week number first, then by date
    return timetable.reduce((acc, entry) => {
      const weekNumber = entry.weekNumber;
      const date = new Date(entry.date);
      const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric' 
      });

      if (!acc[weekNumber]) {
        acc[weekNumber] = {};
      }
      
      if (!acc[weekNumber][dateStr]) {
        acc[weekNumber][dateStr] = {};
      }
      
      if (!acc[weekNumber][dateStr][entry.timeSlot]) {
        acc[weekNumber][dateStr][entry.timeSlot] = [];
      }
      
      acc[weekNumber][dateStr][entry.timeSlot].push(entry);
      
      return acc;
    }, {});
  }, [timetable]);

  if (!timetable || timetable.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No timetable data available
      </div>
    );
  }

  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00'
  ];

  return (
    <div className="mt-10 w-full max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <CalendarDays className="w-8 h-8" />
        Monthly Timetable
      </h2>

      {Object.entries(organizedTimetable).map(([weekNumber, weekData]) => (
        <div key={weekNumber} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-blue-400">
            Week {weekNumber}
          </h3>

          {Object.entries(weekData).map(([date, slots]) => (
            <div key={date} className="mb-8">
              <h4 className="text-xl font-medium mb-4 text-gray-300">{date}</h4>
              
              <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-600 px-4 py-3 w-40">
                        <div className="flex items-center gap-2 justify-center">
                          <Clock className="w-4 h-4" />
                          Time
                        </div>
                      </th>
                      <th className="border border-gray-600 px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <CalendarDays className="w-4 h-4" />
                          Subject
                        </div>
                      </th>
                      <th className="border border-gray-600 px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <User className="w-4 h-4" />
                          Teacher
                        </div>
                      </th>
                      <th className="border border-gray-600 px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <Building2 className="w-4 h-4" />
                          Classroom
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(timeSlot => {
                      const isLunchBreak = timeSlot === '12:00-13:00';
                      const subjects = slots[timeSlot] || [];

                      if (isLunchBreak) {
                        return (
                          <tr key={timeSlot} className="bg-yellow-600 bg-opacity-25">
                            <td className="border border-gray-600 px-4 py-3 text-center">{timeSlot}</td>
                            <td className="border border-gray-600 px-4 py-3 text-center font-medium text-yellow-400" colSpan="3">
                              Lunch Break
                            </td>
                          </tr>
                        );
                      }

                      return subjects.length > 0 ? (
                        subjects.map((subject, index) => (
                          <tr key={`${timeSlot}-${index}`} className="bg-gray-700 hover:bg-gray-600 transition-colors">
                            <td className="border border-gray-600 px-4 py-3 text-center">{timeSlot}</td>
                            <td className="border border-gray-600 px-4 py-3">
                              <div className="flex items-center justify-between">
                                <span>{subject.subject}</span>
                                {subject.isElective && (
                                  <span className="bg-blue-500 text-xs px-2 py-1 rounded">Elective</span>
                                )}
                              </div>
                            </td>
                            <td className="border border-gray-600 px-4 py-3 text-center">{subject.teacher}</td>
                            <td className="border border-gray-600 px-4 py-3 text-center">{subject.classroom}</td>
                          </tr>
                        ))
                      ) : (
                        <tr key={timeSlot} className="bg-gray-700">
                          <td className="border border-gray-600 px-4 py-3 text-center">{timeSlot}</td>
                          <td className="border border-gray-600 px-4 py-3 text-center text-gray-400" colSpan="3">
                            No class scheduled
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonthlyTimetableDisplay;