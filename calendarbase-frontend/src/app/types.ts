export interface EventType {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CalendarEventType {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
}
