import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import globalVal from "../../globalVal";

// Styled Components
const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
`;

const Button = styled.button`
    background-color: ${(props) => props.color || "#5060FF"};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.hoverColor || "#4050D0"};
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
`;

const Thead = styled.thead`
    background-color: #f4f4f4;
`;

const Tbody = styled.tbody``;

const Th = styled.th`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
`;

const EmptyRow = styled.tr`
    text-align: center;
`;

const Actions = styled.div`
    display: flex;
    gap: 10px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PaginationButton = styled(Button)`
    background-color: #f0f0f0;
    color: #333;
    margin: 0 5px;

    &:hover {
        background-color: #ccc;
    }
`;

const TrackApplications = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "create" or "update"
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track current page (starts from 1)
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(globalVal.appTrackerUrl + `/my_applications?page=${currentPage}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error("Unauthorized. Please log in again.");
                if (response.status === 404) {
                    setApplications([]);
                    setTotalPages(1);
                    return;
                }
                throw new Error("Failed to fetch applications.");
            }

            const data = await response.json();

            // Assuming backend returns { total_count, applications }
            setApplications(data.applications || []);
            setTotalPages(Math.ceil(data.total_count / 10)); // Assuming API returns total_count
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [currentPage]); // Re-fetch applications whenever the page changes

    const handleCreate = () => {
        setModalType("create");
        setSelectedApplication(null);
        setIsModalOpen(true);
    };

    const handleUpdate = (application) => {
        setModalType("update");
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const handleDelete = async (applicationId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(globalVal.appTrackerUrl + `/my_applications/${applicationId}`, {
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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Title>Track your Applications</Title>
            <Button onClick={handleCreate}>Create Application</Button>
            <Table>
                <Thead>
                    <tr>
                        <Th>Application ID</Th>
                        <Th>Job URL</Th>
                        <Th>Status</Th>
                        <Th>Resume URL</Th>
                        <Th>Application Date</Th>
                        <Th>Notes</Th>
                        <Th>Actions</Th>
                    </tr>
                </Thead>
                <Tbody>
                    {applications.length === 0 ? (
                        <EmptyRow>
                            <Td colSpan="7">No applications found.</Td>
                        </EmptyRow>
                    ) : (
                        applications.map((application) => (
                            <tr key={application.application_id}>
                                <Td>{application.application_id}</Td>
                                <Td>{application.job_url}</Td>
                                <Td>{application.status}</Td>
                                <Td>{application.resume_url || "Not provided"}</Td>
                                <Td>{new Date(application.application_date).toLocaleDateString()}</Td>
                                <Td>{application.notes || "No notes"}</Td>
                                <Td>
                                    <Actions>
                                        <Button color="#28a745" hoverColor="#218838" onClick={() => handleUpdate(application)}>
                                            Update
                                        </Button>
                                        <Button color="#dc3545" hoverColor="#c82333" onClick={() => handleDelete(application.application_id)}>
                                            Delete
                                        </Button>
                                    </Actions>
                                </Td>
                            </tr>
                        ))
                    )}
                </Tbody>
            </Table>
            <Pagination>
                <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </PaginationButton>
                <span>Page {currentPage} of {totalPages}</span>
                <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </PaginationButton>
            </Pagination>
            {isModalOpen && (
                <Modal
                    type={modalType}
                    selectedApplication={selectedApplication}
                    onClose={() => setIsModalOpen(false)}
                    refreshApplications={fetchApplications}
                />
            )}
        </Container>
    );
};

export default TrackApplications;
