import React, { useState } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [date, setDate] = useState(new Date());
  console.log("Date:", date);
  return (

    <div className="p-4 bg-pink-50 h-screen">
      <div className='flex justify-between items-center w-2/4'>
        <h1 className="text-xl font-bold mb-4">Event Calendar</h1>
        <h3 className="mb-4 font-bold  ">Selected date: <strong>{date.toDateString()}</strong></h3>
      </div>
      <div className='flex w-2/4 justify-center '>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>


  )
}

export default Home
