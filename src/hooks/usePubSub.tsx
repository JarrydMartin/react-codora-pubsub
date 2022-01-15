import { useContext } from 'react'
import {
  Event,
  OnSubscribe,
  PublishEvent,
  StreamContext
} from '../components/PubSub'

export const usePubSub = <T,>(topic: string) => {
  const { subscribe: sub, publish: pub } = useContext(StreamContext)

  const publish = (object: T) => {
    const publishEvent: PublishEvent = {
      topic: topic,
      object: object
    }
    pub(publishEvent)
  }

  const subscribe = (onSubscribe: OnSubscribe<T>) => {
    return sub((event: Event<any>) => {
      if (event.topic == topic) {
        onSubscribe(event)
      }
    })
  }

  return { subscribe, publish }
}
