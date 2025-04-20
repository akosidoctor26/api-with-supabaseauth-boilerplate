/**
 * Used for quickly logging in to get access_token for testing
 */

'use client';
import { createClient } from '@/utils/supabase/browser';
import React, { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    // Get the access_token in the console
    console.log(data, error);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
