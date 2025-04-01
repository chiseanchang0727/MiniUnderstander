export interface Plan {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
}

export type PlanStatus = 'pending' | 'working' | 'finished'; 