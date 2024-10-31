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

export default useDashboard;
