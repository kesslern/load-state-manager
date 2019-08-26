import React, { useContext } from 'react'

const context = React.createContext(null)

const useLoadStateContext = () => {
  return useContext(context)
}

export { useLoadStateContext }
export default context
