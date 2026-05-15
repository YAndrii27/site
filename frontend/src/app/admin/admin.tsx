'use client';

import React from 'react';

import authAction from '@/lib/authAction';

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center p-2">
      <p className="text-red-500">{message}</p>
    </div>
  );
}

function LoginPanel() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleClick() {
    const result = await authAction({
      username,
      password,
    });
    if (result.status === 200) {
      setError('');
      window.location.href = '/admin/dashboard';
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center content-center justify-center border-solid border-2 border-black rounded-xl p-8">
        {error && <ErrorMessage message={error} />}
        <h1 className="p-2 text-center">Login</h1>
        <form>
          <div className="p-2">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="border-solid border-2 border-black rounded-xl p-1 text-center"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="p-2">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="border-solid border-2 border-black rounded-xl p-1 text-center"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center p-2">
            <button
              type="button"
              className="flex m-2 w-7 h-7 lg:w-40 lg:h-fit self-center items-center justify-center
      rounded-3xl bg-gray-75 dark:bg-gray-175 hover:bg-gray-100 dark:hover:bg-gray-150 lg:p-2"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginPanel />
    </div>
  );
}
