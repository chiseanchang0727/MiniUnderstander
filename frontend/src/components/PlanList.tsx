import React from 'react';
import { List, ListItem, ListItemText, Chip, Typography, Box } from '@mui/material';
import { Plan } from '../types/plan';
import { getStatusColor } from '../utils/statusUtils';

interface PlanListProps {
  plans: Plan[];
  loading: boolean;
}

export const PlanList: React.FC<PlanListProps> = ({ plans, loading }) => {
  if (loading) {
    return (
      <Typography sx={{ textAlign: 'center', py: 2 }}>
        Loading...
      </Typography>
    );
  }

  if (plans.length === 0) {
    return (
      <Typography 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          py: 2,
          fontStyle: 'italic'
        }}
      >
        No plans for today
      </Typography>
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {plans.map((plan) => (
        <ListItem 
          key={plan.id} 
          divider
          sx={{ 
            py: 2,
            '&:last-child': {
              borderBottom: 'none'
            }
          }}
        >
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                {plan.title}
              </Typography>
            }
            secondary={
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {plan.description}
              </Typography>
            }
          />
          <Chip
            label={plan.status}
            color={getStatusColor(plan.status)}
            size="small"
            sx={{ 
              borderRadius: 1,
              textTransform: 'capitalize'
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}; 