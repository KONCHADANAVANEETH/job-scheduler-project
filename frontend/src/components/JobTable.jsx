import JobRow from './JobRow';

const JobTable = ({ jobs, onRun }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Task Name</th>
            <th className="text-left p-3">Priority</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <JobRow key={job.id} job={job} onRun={onRun} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
