import React from 'react'
import { render } from 'react-dom'
import { TextInput } from './lib'
import { useLoadState, LoadStateManager } from './lib/LoadStateContext'
import 'normalize.css/normalize.css'

const App = () => {
  const test1 = useLoadState('test1')
  const test2 = useLoadState('test2')

  return (
    <div style={{ width: 640, margin: '15px auto' }}>

      <h1>Hello React</h1>
      <button onClick={test1.toggle}>Click</button>
      <button onClick={test2.toggle}>Click</button>
      <TextInput label='Email Address' placeholder='name@example.com' />
    </div>
  )
}

render(<LoadStateManager><App /></LoadStateManager>, document.getElementById('root'))
