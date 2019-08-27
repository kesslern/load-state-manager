import React from 'react'
import { render } from 'react-dom'
import { useLoadState, LoadStateManager } from './lib'

const App = () => {
  const test1 = useLoadState('test1')
  const test2 = useLoadState('test2')

  return (
    <div style={{ width: 640, margin: '15px auto' }}>
      <div>
        <h3>Test1</h3>
        <button className='pure-button' onClick={test1.start}>Start</button>
        <button className='pure-button' onClick={test1.done}>Done</button>
        <button className='pure-button' onClick={test1.error}>Error</button>
        <div>Current state: {`${test1.current}`}</div>
      </div>
      <div>
        <h3>Test2</h3>
        <button className='pure-button' onClick={test2.start}>Start</button>
        <button className='pure-button' onClick={test2.done}>Done</button>
        <button className='pure-button' onClick={test2.error}>Error</button>
        <div>Current state: {`${test2.current}`}</div>
      </div>
    </div>
  )
}

render(<LoadStateManager><App /></LoadStateManager>, document.getElementById('root'))
