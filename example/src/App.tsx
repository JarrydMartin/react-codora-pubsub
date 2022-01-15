import React, { useEffect, useState } from 'react'

import { PubSub, usePubSub } from 'react-codora-pubsub'
import 'react-codora-pubsub/dist/index.css'

const Counter = () => {
  const { publish, subscribe } = usePubSub<number>('default')
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

  useEffect(() => {
    const unSubscribe = subscribe((event) =>
      console.log('Receiving Event:', event)
    )
    return () => {
      unSubscribe()
    }
  }, [])
  return <div>Count:{count}</div>
}

const App = () => {
  return (
    <PubSub>
      <Counter />
    </PubSub>
  )
}

export default App
