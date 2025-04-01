import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Plan } from '../types/plan';

interface PlanFormProps {
  onSubmit: (plan: Omit<Plan, 'id'>) => Promise<void>;
  error?: string;
  success?: string;
}

export const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, error, success }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
    setTitle('');
    setDescription('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        variant="outlined"
      />
      
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
        variant="outlined"
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          {success}
        </Typography>
      )}

      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        size="large"
        sx={{ 
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        Create Plan
      </Button>
    </Box>
  );
}; 