import { createContext, useContext } from 'react'

export const StackContext = createContext(null)

export function useStack() {
  const ctx = useContext(StackContext)
  if (!ctx) throw new Error('useStack must be used inside <StackProvider>')
  return ctx
}