import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import SummaryChart from './SummaryChart'; // Import the chart component
const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalProductCount: 0,
    totalOrderPrice: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/dashboard/summary'); // Update the URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch summary data');
        }
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  return (
    <div>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{width: '300px', height: '100px', padding: 2, backgroundColor: '#4caf50', color: 'white' }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h5">{summary.totalProductCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{width: '300px', height: '100px', padding: 2, backgroundColor: '#2196f3', color: 'white' }}>
          <Typography variant="h6">Tổng tiền</Typography>
          <Typography variant="h5">{summary.totalOrderPrice.toLocaleString('vi-VN')}đ</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{width: '300px', height: '100px', padding: 2, backgroundColor: '#ff9800', color: 'white' }}>
          <Typography variant="h6">Người dùng</Typography>
          <Typography variant="h5">{summary.totalUsers}</Typography>
        </Paper>
      </Grid>
    </Grid>
    <SummaryChart summary={summary} /> {/* Add the chart here */}
  </div>
  );
};

export default Dashboard;
