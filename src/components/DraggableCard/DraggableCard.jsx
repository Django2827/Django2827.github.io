import { useEffect, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import './DraggableCard.css'
import ResumeModal from '../ResumeModal/ResumeModal'
import { useStack } from '../../context/stackContext'
import CodeIcon from '@mui/icons-material/GitHub'
import ResumeIcon from '@mui/icons-material/Work'
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CardIcon from '@mui/icons-material/Style'
import { FaSteam as SteamIcon } from 'react-icons/fa';
import { SiLetterboxd as LetterboxdIcon } from 'react-icons/si';


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
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          margin: 0,
          transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
          zIndex: getZ(id),
        }}
        {...listeners}
        {...attributes}
        onPointerDownCapture={() => bringToFront(id)} 
        className="draggable-card"
      >
        <button onClick={openResume}>
          <ResumeIcon className="icon"/>Resume
        </button>
        <button onClick={() => window.open("https://github.com/Django2827", "_blank", "noopener,noreferrer")}>
          <CodeIcon className="icon"/>Github Page
        </button>
        <button onClick={() => window.open("https://www.linkedin.com/in/gabriel-capron-074115363/", "_blank", "noopener,noreferrer")}>
          <LinkedInIcon className="icon"/>LinkedIn
        </button>
        <button onClick={() => window.open("https://archidekt.com/u/Django76", "_blank", "noopener,noreferrer")}>
          <CardIcon className="icon"/>Archidekt
        </button>
        <button onClick={() => window.open("https://boxd.it/3cWpF", "_blank", "noopener,noreferrer")}>
          <LetterboxdIcon className="icon"/>Letterboxd
        </button>
        <button onClick={() => window.open("https://steamcommunity.com/profiles/76561199015197879/", "_blank", "noopener,noreferrer")}>
          <SteamIcon className="icon"/>Steam
        </button>
      </div>

      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  )
}

export default DraggableCard