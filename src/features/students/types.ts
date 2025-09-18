export type Attend = 'none' | 'present' | 'late';

export interface Student {
  id: number;
  name: string;
  attend: Attend;
  grade: number;
}

export interface StudentUpdateAttend {
  id: number;
  attend: Attend;
}

export interface StudentUpdateGrade {
  id: number;
  grade: number;
}