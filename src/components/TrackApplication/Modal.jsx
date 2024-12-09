import React, { useState } from "react";

const Modal = ({ type, selectedApplication, onClose, refreshApplications }) => {
    const [jobId, setJobId] = useState(selectedApplication?.job_id || "");
    const [status, setStatus] = useState(selectedApplication?.status || "Applied");
    const [resumeUrl, setResumeUrl] = useState(selectedApplication?.resume_url || "");
    const [notes, setNotes] = useState(selectedApplication?.notes || "");

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const endpoint =
                type === "create"
                    ? "http://localhost:8000/my_applications"
                    : `http://localhost:8000/my_applications/${selectedApplication.application_id}`;
            const method = type === "create" ? "POST" : "PATCH";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_id: parseInt(jobId),
                    status,
                    resume_url: resumeUrl,
                    notes,
                }),
            });

            if (!response.ok) throw new Error(`Failed to ${type} application.`);
            alert(`Application ${type === "create" ? "created" : "updated"} successfully.`);
            onClose();
            refreshApplications(); // Refresh table
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", border: "1px solid #ccc" }}>
            <h2>{type === "create" ? "Create Application" : "Update Application"}</h2>
            <label>
                Job ID:
                <input type="number" value={jobId} onChange={(e) => setJobId(e.target.value)} />
            </label>
            <br />
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <br />
            <label>
                Resume URL:
                <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
            </label>
            <br />
            <label>
                Notes:
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
            <br />
            <button onClick={handleSubmit}>{type === "create" ? "Create" : "Update"}</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default Modal;
