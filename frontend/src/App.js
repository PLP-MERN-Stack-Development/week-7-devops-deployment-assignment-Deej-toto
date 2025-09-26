import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchBugs } from './api';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchBugs();
      setBugs(res.data);
    } catch (err) {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <ErrorBoundary>
      <div style={{ padding: 20 }}>
        <h1>Bug Tracker</h1>
        <BugForm onCreated={load} />
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <BugList bugs={bugs} onUpdated={load} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
