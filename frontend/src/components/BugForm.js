import React, { useState } from 'react';
import { createBug } from '../api';

export default function BugForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError('Title required');
    try {
      await createBug({ title, description });
      setTitle('');
      setDescription('');
      if (onCreated) onCreated();
    } catch (err) {
      setError('Create failed');
    }
  };

  return (
    <form onSubmit={submit} aria-label="bug-form">
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      </div>
      {error && <div role="alert">{error}</div>}
      <button type="submit">Report Bug</button>
    </form>
  );
}
