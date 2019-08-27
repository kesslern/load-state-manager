class manager {

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

export default new manager()