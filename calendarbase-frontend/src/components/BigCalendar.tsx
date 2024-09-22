"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useCallback } from "react";
import { EventType, CalendarEventType } from "@/app/types";

const localizer = momentLocalizer(moment);

const BigCalendar: React.FC<{ events: CalendarEventType[] }> = ({ events }) => {
  const [view, setView] = useState<View>(Views.MONTH);

  const handleOnChangeView = useCallback(
    (newView: View) => setView(newView),
    [setView]
  );

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
      view={view}
      style={{ height: "500px", width: "100%" }}
      onView={handleOnChangeView}
    />
  );
};

export default BigCalendar;
