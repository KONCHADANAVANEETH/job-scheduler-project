import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
