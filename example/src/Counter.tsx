import React, { useEffect, useState } from 'react'
import { usePubSub } from 'react-codora-pubsub'
export const Counter = () => {
  const { publish } = usePubSub('default')
  const [count, setCount] = useState(0)

  useEffect(() => {
    publish(count)
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [count])
  return <div>Count:{count}</div>
}
