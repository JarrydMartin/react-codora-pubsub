# react-codora-pubsub

> A react component to publish and subscribe to events.

[![NPM](https://img.shields.io/npm/v/react-codora-pubsub.svg)](https://www.npmjs.com/package/react-codora-pubsub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-codora-pubsub
```

## Usage

```tsx
import React, { useEffect, useState } from 'react'

import { PubSub, usePubSub } from 'react-codora-pubsub'
import 'react-codora-pubsub/dist/index.css'

const Counter = () => {
  const { publish, subscribe } = usePubSub<number>('Count')
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
```

Place the `PubSub` component anywhere and every where with it you will have access to `usePubSub`.

`usePubSub` requires a topic name. This will be the topic that you will be publishing too and subscribing from. Thus, you can publish from any component and subscribe to those events from any other component, provided those components are with in the context of `PubSub`

To help with type setting the event objects of a topic you can set the type when using the `usePubSub` hook like so...

```tsx
const { subscribe } = usePubSub<string>('message')
```

Now on subscribe the event object will be of type string. There is no type checking from publishing to subscribing. It will be your responsibility to ensure that your published type is the same as the subscription type.

## License

MIT © [JarrydMartin](https://github.com/JarrydMartin)
