import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { DndContext, useDraggable } from '@dnd-kit/core'
import { useStack } from '../../context/stackContext'
import './ResumeModal.css'

const resumeUrl = encodeURI(`${import.meta.env.BASE_URL}Resume October 2026.pdf`)
const resumeDocUrl = encodeURI(`${import.meta.env.BASE_URL}Resume October 2026.docx`)

function ResumeContent({ position }) {
  const { getZ, bringToFront } = useStack()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'resume-window',
  })

  const x = position.x + (transform?.x ?? 0)
  const y = position.y + (transform?.y ?? 0)

  return (
    <Dialog.Content
      ref={setNodeRef}
      className="resume-content"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        margin: 0,
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: getZ('resume-window'), // keep this line only if you added the stacking code
      }}
      onPointerDownCapture={() => bringToFront('resume-window')}
      onPointerDown={(e) => e.stopPropagation()}
      onInteractOutside={(e) => e.preventDefault()} 
    >
      <div className="resume-handle" {...listeners} {...attributes}>
        ⠿ Drag to move
        <Dialog.Close asChild>
          <button className="resume-close" aria-label="Close" onPointerDown={(e) => e.stopPropagation()}>×</button>
        </Dialog.Close>
      </div>

      <Dialog.Title className="resume-title">Resume</Dialog.Title>
      <Dialog.Description className="resume-subtitle">
        <a href={resumeUrl} target="_blank" rel="noreferrer">Open in new tab</a>
        {' · '}
        <a href={resumeUrl} download>Download PDF</a>
        {' · '}
        <a href={resumeDocUrl} download>Download Word</a>
      </Dialog.Description>

      <iframe className="resume-frame" src={resumeUrl} title="Resume PDF" />
    </Dialog.Content>
  )
}

// Only mounted while the dialog is open, so position resets on every open
function ResumeWindow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleDragEnd({ delta }) {
    setPosition((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }))
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ResumeContent position={position} />
    </DndContext>
  )
}

function ResumeModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="resume-overlay" />
        <ResumeWindow />
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ResumeModal