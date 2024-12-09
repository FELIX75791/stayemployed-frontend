import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const TrackApplications = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "create", "update", "delete"

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://localhost:8000/my_applications?page=1", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error("Unauthorized. Please log in again.");
                throw new Error("Failed to fetch applications.");
            }

            const data = await response.json();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalType("create");
        setIsModalOpen(true);
    };

    const handleUpdate = (application) => {
        setSelectedApplication(application);
        setModalType("update");
        setIsModalOpen(true);
    };

    const handleDelete = async (applicationId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`http://localhost:8000/my_applications/${applicationId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to delete application.");
            alert("Application deleted successfully.");
            fetchApplications(); // Refresh the table
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Track your Applications</h1>
            <button onClick={handleCreate}>Create Application</button>
            <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Job ID</th>
                    <th>Status</th>
                    <th>Resume URL</th>
                    <th>Application Date</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.length === 0 ? (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>No applications found.</td>
                    </tr>
                ) : (
                    applications.slice(0, 10).map((application) => (
                        <tr key={application.application_id}>
                            <td>{application.application_id}</td>
                            <td>{application.job_id}</td>
                            <td>{application.status}</td>
                            <td>{application.resume_url || "Not provided"}</td>
                            <td>{new Date(application.application_date).toLocaleDateString()}</td>
                            <td>{application.notes || "No notes"}</td>
                            <td>
                                <button onClick={() => handleUpdate(application)}>Update</button>
                                <button onClick={() => handleDelete(application.application_id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            {isModalOpen && (
                <Modal
                    type={modalType}
                    selectedApplication={selectedApplication}
                    onClose={() => setIsModalOpen(false)}
                    refreshApplications={fetchApplications}
                />
            )}
        </div>
    );
};

export default TrackApplications;

