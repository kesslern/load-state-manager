import { useContext } from 'react'
import Context from './context'

const useLoadState = key => {
  const { manager } = useContext(Context)

  return {
    current: manager.state.includes(key), 
    toggle: () => manager.toggle(key)
   }
}

export default useLoadState
