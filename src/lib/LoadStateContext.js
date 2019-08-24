import React, { useContext, useReducer, useCallback, useEffect } from 'react'

const context = React.createContext(null)

const { Provider: LoadStateProvider } = context

const useLoadState = key => {
  const state = useContext(context)

  console.log('in hook: ' + JSON.stringify(state.state))
  return { current: state.state[key], toggle: () => state.toggle(key) }
}

function reducer(state, action) {

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


function LoadStateManager({children}) {
  const [state, dispatch] = useReducer(reducer, [])

  const toggle = useCallback(key => {
    dispatch({
      type: 'toggle',
      payload: key
    })
  }, [dispatch])

  useEffect(() => {
    console.log(`current state: ` + JSON.stringify(state))
  }, [state])

  const manager = {
    state, toggle
  }

  return <LoadStateProvider value={manager}>
      {children}
    </LoadStateProvider>
}

export { LoadStateManager, useLoadState }
