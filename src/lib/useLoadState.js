import { useContext } from 'react'
import Context from './context'

const useLoadState = key => {
  const { manager } = useContext(Context)

  return {
    current: manager.getState(key),
    start: () => manager.startLoading(key),
    done: () => manager.doneLoading(key),
    error: () => manager.errorLoading(key),
   }
}

export default useLoadState
