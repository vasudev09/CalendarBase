"use client";
import { EventType } from "@/app/types";

const EventsList: React.FC<{
  events: EventType[];
  handleEventClick: (id: number) => void;
  handleDeleteEvent: (id: number) => void;
}> = ({ events, handleEventClick, handleDeleteEvent }) => {
  return (
    <div className="mb-32">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between items-start h-full  transition transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            onClick={() => {
              handleEventClick(event.id);
            }}
          >
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {event.title}
              </h3>
              <div className="text-gray-500 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Date:</span> {event.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {event.start_time} {"-"} {event.end_time}
                </p>
              </div>
              <p className="text-gray-600 my-4">
                {event.description || "No description provided"}
              </p>
            </div>
            <button
              className="bg-white text-red-500 py-1 px-3 rounded mt-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEvent(event.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
