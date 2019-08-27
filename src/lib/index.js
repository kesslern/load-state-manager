import LoadStateManager from './LoadStateManager'
import useLoadState from './useLoadState'
import manager from './manager'

function startLoading(key) {
  manager.startLoading(key)
}

function doneLoading(key) {
  manager.doneLoading(key)
}

function errorLoading(key) {
  manager.errorLoading(key)
}

function getLoadingState(key) {
  return manager.getState(key)
}

export { 
  LoadStateManager,
  useLoadState,
  startLoading,
  doneLoading,
  errorLoading,
  getLoadingState
}
