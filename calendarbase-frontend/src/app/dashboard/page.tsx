"use client";

import BigCalendar from "@/components/BigCalendar";
import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import AddEventButton from "@/components/AddEventButton";
import { EventType, CalendarEventType } from "../types";
import { useState, useEffect } from "react";
import EventFormModal from "@/components/EventFormModal";

const eventsData: EventType[] = [
  {
    id: 1,
    title: "Party",
    description: "party at home description",
    date: "2024-09-25",
    startTime: "8:30",
    endTime: "10:30",
  },
  {
    id: 2,
    title: "Outing",
    description: "outing at home description",
    date: "2024-09-24",
    startTime: "8:30",
    endTime: "10:30",
  },
  {
    id: 3,
    title: "Match",
    description:
      "match at home description match at home description match at home description match at home description match at home description",
    date: "2024-09-26",
    startTime: "8:30",
    endTime: "10:30",
  },
  {
    id: 4,
    title: "game",
    description: "game at home description",
    date: "2024-09-28",
    startTime: "8:30",
    endTime: "10:30",
  },
];

const Dashboard = () => {
  const [events, setEvents] = useState<EventType[]>(eventsData);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (events === null) {
      //call api
    }
  }, [events]);

  const handleAddEvent = (event: any, update: boolean) => {
    // setEvents((prev) => [...prev, event]);

    console.log("data", event, "update", update);
  };
  const handleEventClick = (id: number) => {
    console.log(id);
  };

  const handleDeleteEvent = (id: number) => {
    console.log("delete", id);
  };

  return (
    <div>
      <Header />
      <div className="px-4 md:px-6 lg:px-14 xl:px-28 2xl:px-60 min-w-[350px] mt-10">
        <div className="text-xl md:text-3xl font-semibold text-gray-800 py-3">
          Schedule
        </div>
        <div className="px-4">
          <BigCalendar events={calendarEvents} />
        </div>
      </div>
      <div className="px-4 md:px-6 lg:px-14 xl:px-28 2xl:px-60 min-w-[350px] mt-10">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-6">
          Your Events
        </h2>
        <EventsList
          events={events}
          handleEventClick={handleEventClick}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
      <AddEventButton onClick={() => setIsModalOpen(true)} />
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  );
};

export default Dashboard;
