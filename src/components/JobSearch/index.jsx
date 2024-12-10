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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("relevance");
  const [contractPeriod, setContractPeriod] = useState("fulltime");
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
      const response = await axios.post("/fetch-jobs", {
        location,
        keywords: query,
        sort,
        contract_period: contractPeriod,
        purpose: "dashboard",
      });
      setJobs(response.data.job_list || []);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch jobs. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job) => {
    try {
      await axios.post("/jobs/", {
        title: job.title,
        location: job.locations,
      });
      alert("Job saved successfully!");
    } catch (err) {
      alert("Failed to save job.");
    }
  };

  return (
    <Container>
      <Title>Job Search</Title>
      <SearchBar>
        <Input
          type="text"
          placeholder="Job title or keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
        </Select>
        <Select
          value={contractPeriod}
          onChange={(e) => setContractPeriod(e.target.value)}
        >
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
        </Select>
        <Button onClick={fetchJobs} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </SearchBar>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Location</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{job.title}</Td>
                <Td>{job.locations}</Td>
                <Td>
                  <Button onClick={() => saveJob(job)}>Save</Button>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="4" style={{ textAlign: "center" }}>
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
