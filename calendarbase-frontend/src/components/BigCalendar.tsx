"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useCallback, useMemo } from "react";
import { EventType, CalendarEventType } from "@/app/types";

const localizer = momentLocalizer(moment);

const BigCalendar: React.FC<{ events: CalendarEventType[] }> = ({ events }) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());

  const handleOnChangeView = useCallback(
    (newView: View) => setView(newView),
    [setView]
  );

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );

  const getBackgroundColorForEvent = (event: CalendarEventType) => {
    const colors = ["#e2f8ff", "#fefce8", "#f2f1ff", "#fdf2fb"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  const handleSelectEvent = useCallback(
    (event: CalendarEventType) => {
      setDate(event.start);
      setView(Views.DAY);
    },
    [setDate, setView]
  );

  return (
    <Calendar
      date={date}
      onNavigate={onNavigate}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
      view={view}
      style={{ height: "500px", width: "100%" }}
      onView={handleOnChangeView}
      eventPropGetter={(event) => {
        const backgroundColor = getBackgroundColorForEvent(event);
        const minHeight = view === "week" ? "80px" : "40px";
        return {
          style: { backgroundColor, color: "black", minHeight },
        };
      }}
      onSelectEvent={handleSelectEvent}
      popup={true}
      step={60}
      timeslots={2}
    />
  );
};

export default BigCalendar;
