import { useState, useEffect } from 'react';
import { Plan } from '../types/plan';
import { planService } from '../services/planService';

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const data = await planService.getPlansByDate(today);
      setPlans(data);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
      setError('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (plan: Omit<Plan, 'id'>) => {
    try {
      setError('');
      setSuccess('');
      await planService.createPlan(plan);
      setSuccess('Plan created successfully!');
      await fetchPlans();
    } catch (err) {
      setError('Failed to create plan. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    success,
    createPlan,
    fetchPlans
  };
}; 