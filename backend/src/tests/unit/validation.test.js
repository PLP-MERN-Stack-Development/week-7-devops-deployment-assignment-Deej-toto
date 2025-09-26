const { validateBugPayload } = require('../../utils/validation');

test('validation fails when title missing', () => {
  const { valid, errors } = validateBugPayload({});
  expect(valid).toBe(false);
  expect(errors).toContain('title is required');
});

test('validation passes with proper payload', () => {
  const { valid, errors } = validateBugPayload({ title: 'Bug A', status: 'open' });
  expect(valid).toBe(true);
  expect(errors.length).toBe(0);
});
