import type { User } from '../../shared/hooks/useUsers';

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type FullUser = Omit<User, 'address' | 'company'> & {
  address: Address;
  company: Company;
};

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface DiaryEntry {
  status: AttendanceStatus;
  rating: number | null;
  updatedAt?: string;
  note?: string;
}

export type FullUserDiary = FullUser & { diary?: DiaryEntry };