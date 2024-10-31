import React from 'react';
// import useDashboard from './useDashboard';
import { useAuth } from '../../AuthContext';
import { useState, useEffect } from 'react';
import globalVal from '../../globalVal';

function useDashboard(userId, token) {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchDashboard = async () => {
      try {
        // Get the JWT token, for example, from localStorage
        // const token = localStorage.getItem("token");
      
        const response = await fetch(globalVal.compositeUrl + `/dashboard?user_id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`, // Add the JWT token here
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  return { dashboardData, error, loading };
}


function Dashboard({ userId }) {
    const { token, logout } = useAuth();
    const { dashboardData, error, loading } = useDashboard(userId, token);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>User Profile</h2>
            <pre>{JSON.stringify(dashboardData.user_profile, null, 2)}</pre>
            <h2>Applications</h2>
            <pre>{JSON.stringify(dashboardData.applications, null, 2)}</pre>
            <h2>Links</h2>
            <pre>{JSON.stringify(dashboardData.links, null, 2)}</pre>
        </div>
    );
}

export default Dashboard;
