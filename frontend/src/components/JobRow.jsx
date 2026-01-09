import { useNavigate } from 'react-router-dom';

const JobRow = ({ job, onRun }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="border-t cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >

      <td className="p-3">{job.id}</td>

      
      <td className="p-3">{job.taskName}</td>


      <td className="p-3">{job.priority}</td>


      <td className="p-3">
        {job.status === 'pending' && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Pending
          </span>
        )}

        {job.status === 'running' && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm animate-pulse">
            Running
          </span>
        )}

        {job.status === 'completed' && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Completed
          </span>
        )}
      </td>

      <td className="p-3">
        <button
          disabled={job.status !== 'pending'}
          onClick={(e) => {
            e.stopPropagation();
            onRun(job.id);
          }}
          className={`px-4 py-1 rounded text-sm ${
            job.status === 'pending'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Run
        </button>
      </td>
    </tr>
  );
};

export default JobRow;
