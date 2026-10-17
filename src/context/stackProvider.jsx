import { useCallback, useMemo, useState } from 'react'
import { StackContext } from './stackContext'

export function StackProvider({ children }) {
  // ids ordered back to front; the last one is on top
  const [order, setOrder] = useState([])

  const bringToFront = useCallback((id) => {
    setOrder((prev) =>
      prev[prev.length - 1] === id ? prev : [...prev.filter((i) => i !== id), id]
    )
  }, [])

  const value = useMemo(
    () => ({
      bringToFront,
      // never-clicked ids sit at the bottom (1); clicked ones stack above
      getZ: (id) => {
        const i = order.indexOf(id)
        return i === -1 ? 1 : i + 2
      },
    }),
    [order, bringToFront]
  )

  return <StackContext.Provider value={value}>{children}</StackContext.Provider>
}