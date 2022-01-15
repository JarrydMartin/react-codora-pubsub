import React, { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Dictionary, forEachKey } from '../lib/util'

export type StreamProps = {
  children: JSX.Element
  debug?: boolean
}

export const PubSub = ({ children, debug }: StreamProps) => {
  const [subscriptions, setSubscriptions] = useState<Subscriptions>({})
  const [events, setEvents] = useState<Event<any>[]>([])

  const subscribe: Subscribe = <T,>(onSubscribe: OnSubscribe<T>) => {
    const id = uuid()

    setSubscriptions((stream) => {
      subscriptions[id] = onSubscribe
      return stream
    })

    const unsubscribe: UnSubScribe = () =>
      setSubscriptions((stream) => {
        delete stream[id]
        return stream
      })
    return unsubscribe
  }

  const publish: Publish = (publishEvent: PublishEvent) => {
    setEvents((events) => {
      const event: Event<any> = {
        id: events.length,
        timestamp: new Date(),
        ...publishEvent
      }
      forEachKey(subscriptions, (subscription) => {
        subscription(event)
      })
      return [...events, event]
    })
  }

  const provider = {
    subscribe: subscribe,
    publish: publish
  }
  return (
    <StreamContext.Provider value={provider}>
      <div>{children}</div>
      {debug && (
        <div>
          <h2>Event Debug</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Topic</th>
                <th>Timestamp</th>
                <th>Object</th>
              </tr>
            </thead>
            <tbody>
              {events
                .sort((a, b) => b.id - a.id)
                .map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.topic}</td>
                    <td>{event.timestamp.toLocaleTimeString()}</td>
                    <td>{JSON.stringify(event.object)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </StreamContext.Provider>
  )
}

export type Event<T> = {
  id: number
  topic: string
  timestamp: Date
  object: T
}
export type PublishEvent = {
  topic: string
  object: any
}

export type Subscriptions = Dictionary<OnSubscribe<any>>

export type Subscribe = <T>(onSubscribe: OnSubscribe<T>) => UnSubScribe

export const nullSubscribe: Subscribe = () => nullUnSubscribe

export type OnSubscribe<T> = (event: Event<T>) => void
export const nullOnSubscribe = () => {}

export type UnSubScribe = () => void
export const nullUnSubscribe: UnSubScribe = () => {}

export type Publish = (publishEvent: PublishEvent) => void
export const nullPublish: Publish = () => {}

export const StreamContext = createContext<StreamProvider>({
  subscribe: nullSubscribe,
  publish: nullPublish
})

type StreamProvider = {
  subscribe: Subscribe
  publish: Publish
}
