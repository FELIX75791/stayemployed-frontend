import React, { useEffect, useState } from "react";
import globalVal from "../../globalVal";

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false); // Track form visibility
    const [resumeUrl, setResumeUrl] = useState(""); // Form state for resume URL
    const [jobPreferences, setJobPreferences] = useState(""); // Form state for job preferences

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("Not authenticated");

                const response = await fetch(globalVal.userProfileUrl + "/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Unauthorized. Please log in again.");
                    }
                    throw new Error("Failed to fetch user info.");
                }

                const data = await response.json();
                setUserInfo(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserInfo();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Not authenticated");

            const response = await fetch(globalVal.userProfileUrl + `/update/${userInfo.user_id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resume_url: resumeUrl,
                    job_preferences: JSON.parse(jobPreferences || "{}"),
                }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("Unauthorized to update this profile.");
                }
                throw new Error("Failed to update profile.");
            }

            const updatedData = await response.json();
            setUserInfo(updatedData);
            setIsUpdateOpen(false); // Close the update form
            alert("Profile updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!userInfo) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Resume URL:</strong> {userInfo.resume_url || "Not provided"}</p>
            <p><strong>Job Preferences:</strong> {JSON.stringify(userInfo.job_preferences) || "Not specified"}</p>

            {/* Update Profile Button */}
            <button onClick={() => setIsUpdateOpen(true)}>Update Profile</button>

            {/* Update Form Modal */}
            {isUpdateOpen && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <h2>Update Profile</h2>
                    <label>
                        Resume URL:
                        <input
                            type="text"
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Job Preferences (JSON string):
                        <textarea
                            value={jobPreferences}
                            onChange={(e) => setJobPreferences(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsUpdateOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
