import RainOverlay from './components/RainBackground/RainBackground'
import { useState } from 'react'
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import DraggableCard from './components/DraggableCard'
import './App.css'

function App() {
  
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function handleDragEnd(event) {
    const { delta } = event
    setPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }))
  }

  return (
    
  
    <>
    <RainOverlay />
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ padding: '40px' }}>
        <h1 style={{ fontFamily: "'Doto', monospace", fontWeight: 900 }}>Gabe Capron's Portfolio</h1>
        <DraggableCard id="home-card" position={position}/>
      </div>
    </DndContext>
    </>
  )
}

export default App
