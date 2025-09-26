function validateBugPayload(payload) {
  const errors = [];
  if (!payload) {
    errors.push('payload missing');
    return { valid: false, errors };
  }
  if (!payload.title || typeof payload.title !== 'string' || payload.title.trim() === '') {
    errors.push('title is required');
  }
  if (payload.status && !['open','in-progress','resolved'].includes(payload.status)) {
    errors.push('invalid status');
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { validateBugPayload };
