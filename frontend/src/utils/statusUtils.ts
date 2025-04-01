import { PlanStatus } from '../types/plan';

export const getStatusColor = (status: string): 'default' | 'primary' | 'success' => {
  switch (status) {
    case 'pending':
      return 'default';
    case 'working':
      return 'primary';
    case 'finished':
      return 'success';
    default:
      return 'default';
  }
}; 