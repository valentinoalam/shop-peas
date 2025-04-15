'use client'

import Loading from '@/app/(default)/loading'
import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (!isLoading) return null

  return (
      <Loading />
  )
}