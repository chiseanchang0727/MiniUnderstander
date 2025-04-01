import axios from 'axios';
import { Plan } from '../types/plan';

const API_BASE_URL = 'http://127.0.0.1:8001/api/plans';

export const planService = {
  // Get all plans with optional pagination
  async getAllPlans(skip: number = 0, limit: number = 100): Promise<Plan[]> {
    const response = await axios.get(`${API_BASE_URL}/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Get a single plan by ID
  async getPlanById(id: number): Promise<Plan> {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Get plans by date
  async getPlansByDate(date: string): Promise<Plan[]> {
    const response = await axios.get(`${API_BASE_URL}/date/${date}`);
    return response.data;
  },

  // Create a new plan
  async createPlan(plan: Omit<Plan, 'id'>): Promise<Plan> {
    const response = await axios.post(API_BASE_URL, plan);
    return response.data;
  },

  // Update an existing plan
  async updatePlan(id: number, plan: Partial<Plan>): Promise<Plan> {
    const response = await axios.put(`${API_BASE_URL}/${id}`, plan);
    return response.data;
  },

  // Delete a plan
  async deletePlan(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
}; 