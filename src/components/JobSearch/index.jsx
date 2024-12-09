import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #5060ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4050d0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/jobs/search", {
        params: { query },
      });
      setJobs(response.data.results || []);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Job Search</Title>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={fetchJobs} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </SearchBar>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <Th>Job ID</Th>
            <Th>Title</Th>
            <Th>Location</Th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <Td>{job.id}</Td>
                <Td>{job.title}</Td>
                <Td>{job.location}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3" style={{ textAlign: "center" }}>
                {loading ? "Loading jobs..." : "No jobs found."}
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default JobSearch;
