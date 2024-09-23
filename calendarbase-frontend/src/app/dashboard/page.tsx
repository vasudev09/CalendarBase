"use client";

import BigCalendar from "@/components/BigCalendar";
import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import AddEventButton from "@/components/AddEventButton";
import { EventType, CalendarEventType } from "../types";
import { useState, useEffect } from "react";
import EventFormModal from "@/components/EventFormModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const [prefillEvent, setPrefillEvent] = useState<EventType | undefined>(
    undefined
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const calendarMappedEvents = mapEventsToCalendar(events);
      setCalendarEvents(calendarMappedEvents);
    }
  }, [events]);

  const mapEventsToCalendar = (events: EventType[]): CalendarEventType[] => {
    return events.map((event) => {
      const startDateTime = new Date(`${event.date}T${event.start_time}`);
      const endDateTime = new Date(`${event.date}T${event.end_time}`);

      return {
        title: event.title,
        allDay: false,
        start: startDateTime,
        end: endDateTime,
      };
    });
  };

  async function fetchEvents() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const content = await res.json();
      if (res.ok) {
        setEvents(content);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddEvent = async (event: any, update: boolean, id?: number) => {
    let data = new FormData();
    if (id) {
      data.append("id", id.toString());
    }
    data.append("title", event.title);
    data.append("description", event.description);
    data.append("date", event.date);
    data.append("start_time", event.startTime);
    data.append("end_time", event.endTime);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event/${
          update ? "update" : "add"
        }/`,
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      const content = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        setPrefillEvent(undefined);
        fetchEvents();
      } else {
        setSubmitError("Event is not added");
      }
    } catch (err) {
      console.log(err);
      setSubmitError("Something went wrong!");
    }
  };

  const handleEventClick = (id: number) => {
    const selectedEvent = events.find((event) => event.id === id);
    if (selectedEvent) {
      setPrefillEvent(selectedEvent);
      setIsModalOpen(true);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    let data = new FormData();
    data.append("id", id.toString());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/event/delete/`,
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      const content = await res.json();
      if (res.ok) {
        fetchEvents();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoadingSpinner addCondition="authFalse">
      <div>
        <Header />
        <div className="px-4 md:px-6 lg:px-14 xl:px-28 2xl:px-60 min-w-[350px] mt-10">
          <div className="text-xl md:text-3xl font-semibold text-gray-800 py-3">
            Schedule
          </div>
          <div className="px-8">
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
          onClose={() => {
            setIsModalOpen(false);
            setPrefillEvent(undefined);
          }}
          onSubmit={handleAddEvent}
          submitError={submitError}
          setSubmitError={setSubmitError}
          prefillEvent={prefillEvent}
        />
      </div>
    </LoadingSpinner>
  );
};

export default Dashboard;
