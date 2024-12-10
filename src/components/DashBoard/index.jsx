import React from "react";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import UseDashBoard from "./useDashBoard";


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

function Dashboard({ userId }) {
    const { token } = useAuth();
    const { dashboardData, error, loading } = UseDashBoard(userId, token);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Header>
                <Title>Dashboard</Title>
            </Header>
            <ProfileSection>
                <Name>{dashboardData.user_profile.name}</Name>
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
                                                {app.job_url}
                                            </a>
                                        </Td>
                                        <Td>{app.status}</Td>
                                        <Td>
                                            {new Date(app.application_date).toLocaleDateString()}
                                        </Td>
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
                                    <Th>Job URL</Th>
                                    <Th>Title</Th>
                                    <Th>Company</Th>
                                </tr>
                            </Thead>
                            <Tbody>
                                {dashboardData.jobs_rec.map((job, index) => (
                                    <tr key={index}>
                                        <Td>
                                            <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                                                {job.job_url}
                                            </a>
                                        </Td>
                                        <Td>{job.title}</Td>
                                        <Td>{job.company}</Td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <EmptyMessage>No job recommendations found.</EmptyMessage>
                    )}
                </TableWrapper>
            </TablesContainer>
        </Container>
    );
}

export default Dashboard;
