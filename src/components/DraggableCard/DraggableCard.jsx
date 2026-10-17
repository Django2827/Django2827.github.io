import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import resumeLogo from '../../assets/resume.png'
import './DraggableCard.css'
import ResumeModal from '../ResumeModal/ResumeModal'
import { useStack } from '../../context/stackContext'

function DraggableCard({ id, position }) {
  const [resumeOpen, setResumeOpen] = useState(false)
  const wasDragged = useRef(false)
  const { getZ, bringToFront } = useStack()  

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id })

  // Ignore the click the browser fires when a drag ends on a button
  useEffect(() => {
    if (isDragging) {
      wasDragged.current = true
    } else {
      const t = setTimeout(() => { wasDragged.current = false }, 0)
      return () => clearTimeout(t)
    }
  }, [isDragging])

  function openResume() {
    if (wasDragged.current) return
    bringToFront('resume-window')  
    setResumeOpen(true)
  }

  const x = position.x + (transform?.x ?? 0)
  const y = position.y + (transform?.y ?? 0)

  return (
    <>
      <div
        ref={setNodeRef}
        style={{ transform: `translate3d(${x}px, ${y}px, 0)`, zIndex: getZ(id) }}
        {...listeners}
        {...attributes}
        onPointerDownCapture={() => bringToFront(id)} 
        className="draggable-card"
      >
        <button onClick={openResume}>
          <img
            src={resumeLogo}
            alt="Resume Logo"
            style={{ display: 'block', margin: '0 auto' }}/>
          Resume
        </button>
        <button onClick={() => alert('GitHub Link Opened!')}>Github Page</button>
        <button onClick={() => alert('LinkedIn Page Opened!')}>LinkedIn</button>
        <button onClick={() => alert('Archidekt Page Opened!')}>Archidekt</button>
      </div>

      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  )
}

export default DraggableCard