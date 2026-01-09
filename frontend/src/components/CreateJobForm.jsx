import { useState } from "react";
import { createJob } from "../services/jobsApi";

const CreateJobForm = ({ onJobCreated }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [payload, setPayload] = useState("{}");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        taskName,
        priority,
        payload: JSON.parse(payload),
      });

      setTaskName("");
      setPayload("{}");
      setPriority("Medium");

      onJobCreated(); 
    } catch (err) {
      alert("Invalid JSON payload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Create Job</h2>

      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="border p-2 rounded w-full mb-3"
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <textarea
        rows="4"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        className="border p-2 rounded w-full mb-3 font-mono"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
};

export default CreateJobForm;
