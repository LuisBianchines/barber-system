export type Barber = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  active: boolean;
};

export type Availability = {
  id: string;
  barberId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};
