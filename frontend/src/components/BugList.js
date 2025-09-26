import React from 'react';
import BugItem from './BugItem';

export default function BugList({ bugs, onUpdated }) {
  if (!bugs || bugs.length === 0) return <p>No bugs reported</p>;
  return (
    <ul>
      {bugs.map(b => <BugItem key={b._id} bug={b} onUpdated={onUpdated} />)}
    </ul>
  );
}
