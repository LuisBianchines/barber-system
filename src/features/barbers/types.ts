export type BarberUser = {
  id: string;
  name: string;
  email: string;
};

export type Barber = {
  id: string;
  bio?: string;
  active: boolean;
  user: BarberUser;
};

export type Availability = {
  id: string;
  barberId: string;
  weekday: number;
  startTime: string;
  endTime: string;
  active: boolean;
};
