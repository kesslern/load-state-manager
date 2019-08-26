import React, { useContext, useReducer, useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Context from './context'

class loadStateManager {

  state = []
  subscriptions = []

  _reducer(state, action) {
    switch (action.type) {
      case 'toggle':
        const key = action.payload
        const index = state.indexOf(key)
        console.log(`toggling key ${key} index ${index}`)

        if (index === -1) {
          return [...state, action.payload]
        } else {
          const newState = state.slice(0)
          newState.splice(index, 1)
          return newState
        }

      default:
        throw new Error('unknown action: ' + action.type)
    }
  }

  _dispatch(action) {
    this.state = this._reducer(this.state, action)
    this.subscriptions.forEach(it => it())
  }

  toggle = (key) => {
    this._dispatch({
      type: 'toggle',
      payload: key
    })
  }

  subscribe(func) {
    this.subscriptions.push(func)
  }
}

const useLoadState = key => {
  const { manager } = useContext(Context)

  console.log(`in hook for ${key}, state: ` + JSON.stringify(manager.state))
  return { current: manager.state.includes(key), toggle: () => manager.toggle(key) }
}

const useForceUpdate = () => {
  console.log('forcing update')
  const [, setIt] = useState(0)
  return () => setIt(it => it + 1)
}

const manager = new loadStateManager()

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

export { LoadStateManager, useLoadState }
