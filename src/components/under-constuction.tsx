'use client';

import { useEffect, useState } from 'react';

const UnderConstruction = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    const countDownDate = new Date('Jan 1, 2025 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setShowExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500">
      <div className="max-w-lg w-full mx-auto bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-pulse">
            Launching Soon
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re crafting something extraordinary. Stay tuned for the big reveal!
          </p>

          {!showExpired ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
          ) : (
            <div className="text-2xl font-bold text-red-500 py-4">
              Website is Live Now! 🎉
            </div>
          )}

          <div className="space-y-4">
            <p className="text-gray-600">Notify me when it&apos;s ready:</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <div className="font-mono text-3xl font-bold text-gray-800 mb-1">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-sm text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

export default UnderConstruction;