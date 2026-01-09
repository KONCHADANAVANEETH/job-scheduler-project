const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-sm font-medium";

  if (status === "pending") {
    return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
  }

  if (status === "running") {
    return (
      <span className={`${base} bg-blue-100 text-blue-700 animate-pulse`}>
        Running
      </span>
    );
  }

  if (status === "completed") {
    return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
  }

  return null;
};

export default StatusBadge;
