import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Chip, CircularProgress, Alert } from '@mui/material';
import { format } from 'date-fns';
import { planService } from './services/planService';
import { Plan } from './types/plan';

function App() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState({ title: '', description: '' });
  const [showPlans, setShowPlans] = useState(true);

  const fetchPlans = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const data = await planService.getPlansByDate(today);
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await planService.createPlan({
        ...newPlan,
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'pending'
      });
      setNewPlan({ title: '', description: '' });
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await planService.deletePlan(id);
      fetchPlans(); // Refresh the list after deletion
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Daily Plan Manager
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Title"
            value={newPlan.title}
            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={newPlan.description}
            onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Plan
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Today's Plans</Typography>
          <Button
            variant="outlined"
            onClick={() => setShowPlans(!showPlans)}
          >
            {showPlans ? 'Hide Plans' : 'Show Plans'}
          </Button>
        </Box>

        {showPlans && (
          <Box>
            {plans.length === 0 ? (
              <Typography>No plans for today</Typography>
            ) : (
              plans.map((plan) => (
                <Box
                  key={plan.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h6">{plan.title}</Typography>
                    <Typography color="text.secondary">{plan.description}</Typography>
                    <Chip
                      label={plan.status}
                      color={getStatusColor(plan.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(plan.id)}
                  >
                    Delete
                  </Button>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App; 