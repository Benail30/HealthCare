'use client'

import { useEffect } from "react";
import Home from './components/Home'

export default function HomePage() {
  useEffect(() => {
    // Initialize any necessary data here
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Home/>
    </main>
  );
}

