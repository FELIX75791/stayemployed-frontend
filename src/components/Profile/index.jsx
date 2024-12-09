import React, { useEffect, useState } from "react";
import styled from "styled-components";
import globalVal from "../../globalVal";

// Styled Components
const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const InfoItem = styled.p`
    font-size: 16px;
    color: #555;
    margin: 10px 0;

    & > strong {
        color: #333;
    }
`;

const UpdateButton = styled.button`
    background-color: #5060ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4050d0;
    }
`;

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

const ModalActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ActionButton = styled.button`
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

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState("");
    const [jobPreferences, setJobPreferences] = useState("");

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
            setIsUpdateOpen(false);
            alert("Profile updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    if (error) return <p>Error: {error}</p>;
    if (!userInfo) return <p>Loading...</p>;

    return (
        <Container>
            <Title>Profile</Title>
            <InfoItem><strong>Name:</strong> {userInfo.name}</InfoItem>
            <InfoItem><strong>Email:</strong> {userInfo.email}</InfoItem>
            <InfoItem><strong>Resume URL:</strong> {userInfo.resume_url || "Not provided"}</InfoItem>
            <InfoItem><strong>Job Preferences:</strong> {JSON.stringify(userInfo.job_preferences) || "Not specified"}</InfoItem>
            <UpdateButton onClick={() => setIsUpdateOpen(true)}>Update Profile</UpdateButton>

            {isUpdateOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalHeader>Update Profile</ModalHeader>
                        <InputLabel>Resume URL:</InputLabel>
                        <Input
                            type="text"
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                        />
                        <InputLabel>Job Preferences (JSON string):</InputLabel>
                        <Textarea
                            rows="4"
                            value={jobPreferences}
                            onChange={(e) => setJobPreferences(e.target.value)}
                        />
                        <ModalActions>
                            <ActionButton onClick={handleUpdate}>Save</ActionButton>
                            <ActionButton color="#dc3545" hoverColor="#c82333" onClick={() => setIsUpdateOpen(false)}>
                                Cancel
                            </ActionButton>
                        </ModalActions>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default Profile;
