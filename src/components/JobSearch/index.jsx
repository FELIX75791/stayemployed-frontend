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
  flex-direction: column;
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
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("relevance");
  const [contractPeriod, setContractPeriod] = useState("full-time");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    if (!keywords.trim() || !location.trim()) {
      setError("Please provide both keywords and location.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fetch-jobs",
        {
          location,
          keywords,
          sort,
          contract_period: contractPeriod,
          purpose: "dashboard",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJobs(response.data.job_list || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
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
          placeholder="Enter keywords (e.g., Developer)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
        </select>
        <select
          value={contractPeriod}
          onChange={(e) => setContractPeriod(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
        </select>
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
            jobs.map((job, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{job.title || "No title"}</Td>
                <Td>{job.locations || "No location"}</Td>
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
