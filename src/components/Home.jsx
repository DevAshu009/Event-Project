import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState("");

  const storeEvents = (date, event) => {
    const newEventItem = { date, event };
    const updatedEventList = [...eventList, newEventItem];
    setEventList(updatedEventList);
    localStorage.setItem("eventList", JSON.stringify(updatedEventList));
  };

  const showEventList = (selectedDate) => {
    const selectedDay = new Date(selectedDate).toDateString();
    const filteredEvents = eventList.filter(
      (event) => new Date(event.date).toDateString() === selectedDay
    );
    setFilteredEventList(filteredEvents);
  };

  const handleDateClick = (selectedDate) => {
    setSelectDate(selectedDate);
    showEventList(selectedDate);
    // setShowModal(true);
  };

  const handleEventAdd = () => {
    if (!newEvent.trim()) return; //When input box is empty then return to here
    storeEvents(selectDate, newEvent);
    setNewEvent("");
    setShowModal(false);
    showEventList(selectDate);
  };

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("eventList")) || [];
    setEventList(storedEvents);
  }, []);

  useEffect(() => {
    showEventList(date);
  }, [date, eventList]);

  return (
    <div className="p-4 bg-pink-50 h-screen">
      <div className="flex justify-between items-center w-2/4">
        <h1 className="text-xl font-bold mb-4">Event Calendar</h1>
        <h3 className="mb-4 font-bold">
          Selected date: <strong>{date.toDateString()}</strong>
        </h3>
      </div>
      <div className="flex w-full justify-center">
        <Calendar onChange={setDate} value={date} onClickDay={(value) => handleDateClick(value)}/>
        <div className="flex w-full flex-col p-4 ml-8  bg-slate-400">
          <div className="flex gap-4 w-full justify-between">
          <h2 className="text-lg font-bold">Events:</h2>
          <button onClick={() =>setShowModal(true)} className="bg-blue-500 text-white px-2 py-1 rounded" >
                Add Event
              </button>
          </div>
          {filteredEventList.length > 0 ? (
            filteredEventList.map((event, i) => (
              <p key={i} className="bg-gray-200 p-2 rounded m-2">
                {event.event}
              </p>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">
              Add Event for {selectDate.toDateString()}
            </h2>
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Enter event details"
              className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEventAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
