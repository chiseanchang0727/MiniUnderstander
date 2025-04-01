import React, { useState } from 'react';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { PlanForm } from './components/PlanForm';
import { PlanList } from './components/PlanList';
import { usePlans } from './hooks/usePlans';
import { Plan } from './types/plan';

function App() {
  const [showPlans, setShowPlans] = useState(true);
  const { plans, loading, error, success, createPlan } = usePlans();

  const handleCreatePlan = async (plan: Omit<Plan, 'id'>) => {
    await createPlan(plan);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            mb: 2
          }}
        >
          Daily Plan
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Create New Plan
          </Typography>
          
          <PlanForm 
            onSubmit={handleCreatePlan}
            error={error}
            success={success}
          />
        </Paper>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3 
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
              Today's Plans
            </Typography>
            <Button 
              size="small" 
              onClick={() => setShowPlans(!showPlans)}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              {showPlans ? 'Hide Plans' : 'Show Plans'}
            </Button>
          </Box>

          {showPlans && (
            <PlanList 
              plans={plans}
              loading={loading}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 