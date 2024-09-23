"use client";

import { useState, useEffect } from "react";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    event: {
      title: string;
      description: string;
      date: string;
      startTime: string;
      endTime: string;
    },
    update: boolean,
    id?: number
  ) => void;
  prefillEvent?: {
    id: number;
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
  };
  submitError: string;
  setSubmitError: (error: string) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  prefillEvent,
  submitError,
  setSubmitError,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (prefillEvent) {
      setTitle(prefillEvent.title);
      setDescription(prefillEvent.description);
      setDate(prefillEvent.date);
      setStartTime(prefillEvent.start_time);
      setEndTime(prefillEvent.end_time);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
    }
  }, [prefillEvent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end <= start) {
      setSubmitError("End time must be greater than start time.");
      return;
    }
    onSubmit(
      { title, description, date, startTime, endTime },
      prefillEvent ? true : false,
      prefillEvent?.id
    );
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white py-4 px-12 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">
          {prefillEvent ? "Update Event" : "Add Event"}
        </h2>
        {submitError && (
          <div className="text-red-500 mb-2 text-center text-sm">
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-2 min-w-80 md:min-w-96">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label>Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label>End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded p-1 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
