import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`http://localhost:5000/jobs/${id}`);
      const data = await response.json();
      setJob(data);
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="p-6">Loading job details...</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-600 underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-4">Job Details</h1>

      <div className="bg-white p-6 rounded shadow space-y-3">
        <p><strong>ID:</strong> {job.id}</p>
        <p><strong>Task Name:</strong> {job.taskName}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Priority:</strong> {job.priority}</p>

        <div>
          <strong>Payload:</strong>
          <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">
            {JSON.stringify(JSON.parse(job.payload), null, 2)}
          </pre>
        </div>

        <p><strong>Created At:</strong> {job.createdAt}</p>
        <p><strong>Updated At:</strong> {job.updatedAt}</p>
        {job.completedAt && (
          <p><strong>Completed At:</strong> {job.completedAt}</p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
