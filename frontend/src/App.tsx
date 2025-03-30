import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import axios from 'axios';

interface Plan {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
}

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPlans, setCurrentPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlans, setShowPlans] = useState(true);

  const fetchCurrentPlans = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`/api/plans/date/${today}`);
      setCurrentPlans(response.data);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/plans/', {
        title,
        description,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      });

      setSuccess('Plan created successfully!');
      setTitle('');
      setDescription('');
      fetchCurrentPlans();
    } catch (err) {
      setError('Failed to create plan. Please try again.');
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
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

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Daily Plan
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="success.main">
            {success}
          </Typography>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Plan
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5">
            Today's Plans
          </Typography>
          <Button 
            size="small" 
            onClick={() => setShowPlans(!showPlans)}
            variant="outlined"
          >
            {showPlans ? 'Hide Plans' : 'Show Plans'}
          </Button>
        </Box>
        {showPlans && (
          loading ? (
            <Typography>Loading...</Typography>
          ) : currentPlans.length === 0 ? (
            <Typography color="text.secondary">No plans for today</Typography>
          ) : (
            <List>
              {currentPlans.map((plan) => (
                <ListItem key={plan.id} divider>
                  <ListItemText
                    primary={plan.title}
                    secondary={plan.description}
                  />
                  <Chip
                    label={plan.status}
                    color={getStatusColor(plan.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          )
        )}
      </Box>
    </Box>
  );
}

export default App; 