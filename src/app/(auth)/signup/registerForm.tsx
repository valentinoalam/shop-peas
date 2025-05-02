// frontend/components/RegisterForm.tsx
import { useState } from 'react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      body: JSON.stringify({ email, name, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setError('');
    } else {
      setError(data.message);
      setMessage('');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        type="text"
      />
      <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </form>
  );
}
