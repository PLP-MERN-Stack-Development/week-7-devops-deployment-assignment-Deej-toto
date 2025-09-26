import React, { useState } from 'react';
import { updateBug, deleteBug } from '../api';

export default function BugItem({ bug, onUpdated }) {
  const [busy, setBusy] = useState(false);

  const changeStatus = async () => {
    setBusy(true);
    try {
      const nextStatus = bug.status === 'open' ? 'in-progress' : (bug.status === 'in-progress' ? 'resolved' : 'open');
      await updateBug(bug._id, { ...bug, status: nextStatus });
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await deleteBug(bug._id);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li>
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <p>Status: {bug.status}</p>
      <button onClick={changeStatus} disabled={busy}>Toggle Status</button>
      <button onClick={remove} disabled={busy}>Delete</button>
    </li>
  );
}
