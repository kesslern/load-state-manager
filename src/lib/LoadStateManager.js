import React, { useEffect, useState } from 'react'
import Context from './context'
import manager from './manager'
import useForceUpdate from './useForceUpdate'

function LoadStateManager({ children }) {
  const update = useForceUpdate()
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (!subscribed) {
      console.log('subscribing')
      setSubscribed(true)
      manager.subscribe(update)
    }
  }, [subscribed, update])

  useEffect(() => {
    console.log('useeffect')
    console.log(manager.state)
  })

  return <Context.Provider value={{manager}}>
    {children}
  </Context.Provider>
}

export default LoadStateManager