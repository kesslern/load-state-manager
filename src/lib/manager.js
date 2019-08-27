class manager {

  state = {}
  subscriptions = []

  _reducer(state, action) {
    const key = action.payload
    switch (action.type) {
      case 'start':
        return {
          ...state,
          [key]: 'loading'
        }

      case 'done':
        return {
          ...state,
          [key]: 'done'
        }

      case 'error':
        return {
          ...state,
          [key]: 'error'
        }

      default:
        throw new Error('unknown action: ' + action.type)
    }
  }

  _dispatch(action) {
    this.state = this._reducer(this.state, action)
    this.subscriptions.forEach(it => it())
  }

  startLoading = key => {
    this._dispatch({
      type: 'start',
      payload: key
    })
  }

  doneLoading = key => {
    this._dispatch({
      type: 'done',
      payload: key
    })
  }

  errorLoading = key => {
    this._dispatch({
      type: 'error',
      payload: key
    })
  }

  getState = key => this.state[key] || 'uninitialized'

  subscribe(func) {
    this.subscriptions.push(func)
  }
}

export default new manager()
