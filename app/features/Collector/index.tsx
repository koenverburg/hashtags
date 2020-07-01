import React, { Fragment, Component, FormEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { CollectorStore } from './Collector.store'
import { Textarea } from '@chakra-ui/core'
import { useCollectorStore } from './useCollector.store'

export const Collector = observer(() => {
  const store = useCollectorStore()

  const handleChange = (event: FormEvent<EventTarget>) =>
    // @ts-ignore
    store.setData(event.target.value)

  return (
    <>
      <Textarea
        value={store.entities}
        onChange={handleChange}
        placeholder="#hashtag #dedup"
      />

      Total tag count {store.tags.length}, limit is 30 tags for Facebook Creator Studio

      <ul>
        {store.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </>
  )
})
