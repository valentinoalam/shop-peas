'use client';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      callbackUrl: '/',
      email,
      isRegister: 'false',
      password,
      redirect: true,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setError('');
      router.push('/'); // Redirect to the homepage or another secure page
    }
  };

  const handleGoogleLogin = async () => {
    const response = await signIn('google', {
      callbackUrl: '/',
      redirect: false, // prevents automatic redirect
    });

    if (response?.error) {
      console.error('Sign-in error:', response.error);
    } else {
      // Handle successful login here
      console.log('Sign-in successful!', response);
    }
  };
  const handleGithubLogin = async () => {
    const response = await signIn('github', {
      callbackUrl: '/',
      redirect: false, // prevents automatic redirect
    });
    if (response?.error) {
      console.error('Sign-in error:', response.error);
    } else {
      // Handle successful login here
      console.log('Sign-in successful!', response);
    }
  };
  return (
    <main className="flex mt-0 transition-all duration-200 ease-soft-in-out">
      <Card className="max-w-6xl my-5 mx-auto bg-white border border-gray-200 rounded-lg min-h-96 shadow-lg py-2">
        {/* Page header */}
        <CardHeader className="flex flex-col mb-0 pb-2 bg-transparent max-w-3xl mx-auto text-center">
          <CardTitle className="relative text-4xl z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
            Let&apos;s Sign In
          </CardTitle>
          <CardDescription className="font-semibold">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <Separator className="mb-2" />
        {/* Form */}
        <CardContent className="max-w-sm mx-auto px-4 sm:px-8">
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && <p>{error}</p>}
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <Label
                  className="block text-gray-800 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  className="form-input w-full text-gray-800"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="text-sm font-medium text-blue-600 hover:underline"
                    href="/reset-password"
                  >
                    Having trouble signing in?
                  </Link>
                </div>
                <Input
                  id="password"
                  className="form-input w-full text-gray-800"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="flex items-center">
                    <input className="form-checkbox" type="checkbox" />
                    <span className="text-gray-600 ml-2">
                      Keep me signed in
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-4 p-2 flex items-center justify-center gap-2 rounded-lg  text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300">
                <button className="btn w-full" type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center my-6 w-inherit">
            <Separator className="mr-3 shrink" />
            <span className="text-gray-600 italic">Or</span>
            <Separator className="ml-3 shrink" />
          </div>
          <div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full px-3 flex items-center justify-center gap-2 rounded-lg text-white p-2 text-sm font-semibold bg-black hover:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300">
                <button
                  className="btn px-0 w-full relative flex items-center"
                  onClick={handleGithubLogin}
                >
                  <svg
                    className="size-5 fill-current text-white opacity-75 shrink-0 mx-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                  </svg>
                  <span className="flex-auto pl-16 pr-8 -ml-16">
                    Continue with GitHub
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3 flex items-center justify-center gap-2 rounded-lg bg-white p-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <button
                  className="btn px-0 w-full relative flex items-center"
                  onClick={handleGoogleLogin}
                >
                  <svg className="size-5 shrink-0 mx-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="flex-auto pl-16 pr-8 -ml-16">
                    Continue with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="text-gray-600 text-center mt-6">
            Don&apos;t you have an account?{' '}
            <Link
              className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
