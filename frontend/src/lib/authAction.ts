'use server';

export default async function authAction({
  username,
  password,
}: {
  username: string,
  password: string
}) {
  const response = await fetch('http://blog-api:5000/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) {
    return { status: response.status, message: 'Login failed' };
  }
  return { status: response.status, message: 'Login successful', response: await response.json() };
}
