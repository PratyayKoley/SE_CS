import { useEffect, useState } from 'react'

export default function GenerateTable() {
  const [timetable, setTimetable] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_LINK}/api/timetable/generate`)
      .then((res) => res.json())
      .then((data) => setTimetable(data))
      .catch((err) => console.error(err))
  }, [])

  if (!timetable) return <div className="text-center text-gray-500 mt-20">Loading timetable...</div>

  // Day names and slot timings
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const slotTimings = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-13:30', '13:30-14:30', '14:30-15:30']

  // Function to process slots and insert break
  const processSlots = (day) => {
    const processedSlots = []
    for (let i = 0; i < slotTimings.length; i++) {
      if (i === 4) {
        // Insert break slot
        processedSlots.push({ isBreak: true })
      } else if (i > 4) {
        // Shift slots after break one position right
        processedSlots.push(day[i - 1])
      } else {
        processedSlots.push(day[i])
      }
    }
    return processedSlots
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Timetable</h1>

      {Object.keys(timetable).map((semester) => (
        <div key={semester} className="mb-8 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Semester {semester}</h2>

          <div className="overflow-auto">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-200">
                <tr>
                  <th className="py-2 px-4 text-center text-gray-700 font-medium border-b">Day</th>
                  {slotTimings.map((time, i) => (
                    <th key={i} className="py-2 px-4 text-center text-gray-700 font-medium border-b">
                      {time}
                      {i === 4 && ' (Break)'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable[semester].map((day, dayIndex) => (
                  <tr key={dayIndex} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-700 border-b">{daysOfWeek[dayIndex]}</td>
                    {processSlots(day).map((slot, slotIndex) => (
                      <td
                        key={slotIndex}
                        className={`py-3 px-4 ${
                          slot?.isBreak ? 'bg-gray-100 text-gray-500 font-medium' : 'text-gray-600'
                        } border-b`}
                      >
                        {slot?.isBreak ? (
                          'Break'
                        ) : slot ? (
                          <span>
                            {slot.subjectName} (<span className="font-semibold">{slot.teacher}</span>) in {slot.classroom}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Free</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}