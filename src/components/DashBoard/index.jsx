import React, { useState, useEffect } from "react";
import styled from "styled-components";
import globalVal from "../../globalVal";

// Styled Components
const Container = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

const ProfileSection = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
`;

const Name = styled.h1`
    font-size: 24px;
    color: #333;
`;

const ResumeLink = styled.a`
    color: #5060ff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const TablesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const TableWrapper = styled.div`
    flex: 1;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed; /* Ensure the table layout remains consistent */
    border-collapse: collapse;
    margin-top: 20px;
`;

const Thead = styled.thead`
    background-color: #f4f4f4;
`;

const Tbody = styled.tbody``;

const Th = styled.th`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
`;

const Td = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    word-wrap: break-word; /* Allow URL to wrap to the next line */
    max-width: 200px; /* Optional: Restrict width of the column */
    overflow: hidden; /* Ensure long URLs are contained */
    text-overflow: ellipsis; /* Add ellipsis for overflowing text */
`;

const Title = styled.h2`
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
`;

const EmptyMessage = styled.p`
    text-align: center;
    color: #666;
`;

const Button = styled.a`
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #5060ff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    &:hover {
        background-color: #4050d0;
    }
`;

// Helper function to extract a domain name from a URL
const getDomain = (url) => {
    try {
        const validUrl = new URL(url);
        return validUrl.hostname.replace("www.", ""); // Removing "www." for cleaner display
    } catch (e) {
        return url; // If the URL is invalid, just return the raw URL
    }
};

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch token directly from localStorage
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Token is missing. Please log in again.");
                }

                const response = await fetch(`${globalVal.compositeUrl}/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch dashboard data: ${response.status}`);
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Header>
                <Title>Dashboard</Title>
            </Header>
            <ProfileSection>
                <Name>{dashboardData.user_profile.user_name}</Name>
                <ResumeLink href={dashboardData.user_profile.resume_url} target="_blank">
                    View Resume
                </ResumeLink>
            </ProfileSection>
            <TablesContainer>
                <TableWrapper>
                    <Title>Applications</Title>
                    {dashboardData.applications.length > 0 ? (
                        <Table>
                            <Thead>
                                <tr>
                                    <Th>ID</Th>
                                    <Th>Job URL</Th>
                                    <Th>Status</Th>
                                    <Th>Application Date</Th>
                                </tr>
                            </Thead>
                            <Tbody>
                                {dashboardData.applications.map((app) => (
                                    <tr key={app.application_id}>
                                        <Td>{app.application_id}</Td>
                                        <Td>
                                            <a href={app.job_url} target="_blank" rel="noopener noreferrer">
                                                {getDomain(app.job_url)} {/* Display shortened domain */}
                                            </a>
                                        </Td>
                                        <Td>{app.status}</Td>
                                        <Td>{new Date(app.application_date).toLocaleDateString()}</Td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <EmptyMessage>No applications found.</EmptyMessage>
                    )}
                </TableWrapper>
                <TableWrapper>
                    <Title>Job Recommendations</Title>
                    {dashboardData.jobs_rec.length > 0 ? (
                        <Table>
                            <Thead>
                                <tr>
                                    <Th>Job Title</Th>
                                    <Th>Company</Th>
                                    <Th>Location</Th>
                                    <Th>Job URL</Th>
                                </tr>
                            </Thead>
                            <Tbody>
                                {dashboardData.jobs_rec.map((job, index) => (
                                    <tr key={index}>
                                        <Td>{job.title}</Td>
                                        <Td>{job.company}</Td>
                                        <Td>{job.locations}</Td>
                                        <Td>
                                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                                                {getDomain(job.url)} {/* Display shortened domain */}
                                            </a>
                                        </Td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <EmptyMessage>No job recommendations found.</EmptyMessage>
                    )}
                </TableWrapper>
            </TablesContainer>
            <Button href="/applyJobs">Apply for More Jobs</Button>
        </Container>
    );
}

export default Dashboard;
