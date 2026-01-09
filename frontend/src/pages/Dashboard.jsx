import { useEffect, useState } from "react";
import JobTable from "../components/JobTable";
import CreateJobForm from "../components/CreateJobForm";
import { fetchJobs } from "../services/jobsApi";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const loadJobs = async () => {
    setLoading(true);

    const filters = {};
    if (statusFilter) filters.status = statusFilter;
    if (priorityFilter) filters.priority = priorityFilter;

    const data = await fetchJobs(filters);
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter, priorityFilter]);

  const handleRunJob = async (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: "running" } : job
      )
    );

    await fetch(`http://localhost:5000/jobs/run-job/${jobId}`, {
      method: "POST",
    });

    setTimeout(() => {
      loadJobs();
    }, 3500);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Job Dashboard</h1>


      <CreateJobForm onJobCreated={loadJobs} />

      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <JobTable jobs={jobs} onRun={handleRunJob} />
    </div>
  );
};

export default Dashboard;
