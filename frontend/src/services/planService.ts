import axios from 'axios';
import { Plan } from '../types/plan';

const API_BASE_URL = '/api/plans';

export const planService = {
  async getPlansByDate(date: string): Promise<Plan[]> {
    const response = await axios.get(`${API_BASE_URL}/date/${date}`);
    return response.data;
  },

  async createPlan(plan: Omit<Plan, 'id'>): Promise<Plan> {
    const response = await axios.post(API_BASE_URL, plan);
    return response.data;
  }
}; 