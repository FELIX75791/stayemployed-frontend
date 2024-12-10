import { useState, useEffect } from "react";
import globalVal from "../../globalVal";

function useDashboard(userId, token) {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || !token) {
            setError("User ID or token is missing");
            setLoading(false);
            return;
        }

        const controller = new AbortController(); // For cleanup on unmount
        const { signal } = controller;

        const fetchDashboard = async () => {
            try {
                const response = await fetch(
                    `${globalVal.compositeUrl}/dashboard?user_id=${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`, // Add the JWT token here
                        },
                        signal,
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDashboardData(data || { user_profile: {}, applications: [], jobs_rec: [] });
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();

        return () => controller.abort(); // Cleanup function
    }, [userId, token]); // Dependency array includes token

    return { dashboardData, error, loading };
}

export default useDashboard;
