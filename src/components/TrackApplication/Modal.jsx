import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background: white;
    padding: 20px 30px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ModalHeader = styled.h2`
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
    text-align: center;
`;

const InputLabel = styled.label`
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #5060ff;
        box-shadow: 0 0 3px rgba(80, 96, 255, 0.5);
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #5060ff;
        box-shadow: 0 0 3px rgba(80, 96, 255, 0.5);
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #5060ff;
        box-shadow: 0 0 3px rgba(80, 96, 255, 0.5);
    }
`;

const ModalActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: ${(props) => props.color || "#5060FF"};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.hoverColor || "#4050D0"};
    }
`;

// Modal Component
const Modal = ({ type, selectedApplication, onClose, refreshApplications }) => {
    const [jobUrl, setJobUrl] = useState(selectedApplication?.job_url || "");
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
                    job_url: jobUrl, // Updated for job_url
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
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader>{type === "create" ? "Create Application" : "Update Application"}</ModalHeader>
                <InputLabel>Job URL:</InputLabel>
                <Input
                    type="text"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                />
                <InputLabel>Status:</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </Select>
                <InputLabel>Resume URL:</InputLabel>
                <Input
                    type="text"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                />
                <InputLabel>Notes:</InputLabel>
                <Textarea
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <ModalActions>
                    <Button onClick={handleSubmit}>
                        {type === "create" ? "Create" : "Update"}
                    </Button>
                    <Button color="#dc3545" hoverColor="#c82333" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalActions>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default Modal;
