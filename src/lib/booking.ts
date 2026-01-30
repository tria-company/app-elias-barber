export const BOOKING_STORAGE_KEY = "booking";

export type BookingData = {
  unitId: string;
  unitName: string;
  unitAddress: string;
  unitImage: string;
  services: { id: string; name: string; price: number }[];
  date: { day: number; month: number; year: number };
  time: string;
  barberName: string | null;
  total: number;
  discount: number;
};
