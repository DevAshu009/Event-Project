import React, { useEffect, useState } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([])
  const [filteredEventList,setFilteredEventList] = useState([])

  function storeDummyEvents(){
    const data = [
      {
        date:new Date(1739685270000),
        event:'Test event on 16th Feb'
      },
      {
        date:new Date(1740030870000),
         event:'Test event on 20th Feb'
      }
    ]

    localStorage.setItem('eventList',JSON.stringify(data))

  }

  function showEventList(date){
    try {
      const selectedDate = date.getDate()
      const selectedMonth = date.getMonth()
      const selectedYear = date.getFullYear()

      const result = []

      for(let data of eventList){
        const eventDate = new Date(data.date).getDate()
        const eventMonth = new Date(data.date).getMonth()
        const eventYear = new Date(data.date).getFullYear()

        if(eventDate==selectedDate && eventMonth==selectedMonth && eventYear==selectedYear){
          result.push(data)
        }

      }
      return result
    } catch (error) {
      console.log('Filtered Event error = ',error)
      return []
    }


  }

  useEffect(()=>{
    storeDummyEvents()
    const eventListAsString = localStorage.getItem('eventList')
    setEventList(JSON.parse(eventListAsString))
  },[])

  useEffect(()=>{
    const filteredList = showEventList(date)
    setFilteredEventList(filteredList)
  },[date, eventList])

  return (

    <div className="p-4 bg-pink-50 h-screen">
      <div className='flex justify-between items-center w-2/4'>
        <h1 className="text-xl font-bold mb-4">Event Calendar</h1>
        <h3 className="mb-4 font-bold  ">Selected date: <strong>{date.toDateString()}</strong></h3>
      </div>
      <div className='flex w-full justify-center '>
        <Calendar onChange={setDate} value={date} />
        <div className='flex w-full flex-col'>
          <h>Event List</h>
          {
            filteredEventList.map((data, i)=>{
              return <p key={i}>{data.event}</p>
            })
          }
        </div>
      </div>
    </div>


  )
}

export default Home
