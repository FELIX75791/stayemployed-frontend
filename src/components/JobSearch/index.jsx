import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import globalVal from "../../globalVal";

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
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [sort, setSort] = useState("relevance");
  const [contractPeriod, setContractPeriod] = useState("full-time");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    if (!keywords.trim()) {
      setError("Please enter search keywords.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
          globalVal.jobSearchUrl + "/fetch-jobs",
        {
          location,
          keywords,
          sort,
          contract_period: contractPeriod,
          purpose: "search",
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
          placeholder="Keywords (e.g., Developer)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Sort (e.g., Relevance)"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Contract Period (e.g., Full-Time)"
          value={contractPeriod}
          onChange={(e) => setContractPeriod(e.target.value)}
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
            jobs.map((job, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      {job.title || "No title"}
                    </a>
                  ) : (
                    job.title || "No title"
                  )}
                </Td>
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
