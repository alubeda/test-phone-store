import { useState } from 'react'
import Header from '@/components/Header.jsx'
import AppRoutes from '@/router';

function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <AppRoutes />
      </main>
    </>
  )
}

export default App
