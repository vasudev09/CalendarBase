export interface EventType {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
}

export interface CalendarEventType {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

export interface ProfileType {
  customer_id: number;
  user_id: number;
  email: "string";
  username: "string";
}
