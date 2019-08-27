import { useState } from 'react'

const useForceUpdate = () => {
  const [, setIt] = useState(0)
  return () => setIt(it => it + 1)
}

export default useForceUpdate