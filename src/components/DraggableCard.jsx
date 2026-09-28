import { useDraggable } from '@dnd-kit/core'
import resumeLogo from '../assets/resume.png'
import './DraggableCard.css'

function DraggableCard({ id, position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const x = position.x + (transform?.x ?? 0)
  const y = position.y + (transform?.y ?? 0)

  return (
    <div
      ref={setNodeRef}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      {...listeners}
      {...attributes}
      className="draggable-card"
    >
      <button onClick={() => alert('Resume Page Opened!')}>
        <img src={resumeLogo} alt="Resume Logo" style={{ display: 'block', margin: '0 auto' }}/>
        Resume
      </button>
      <button onClick={() => alert('GitHub Link Opened!')}>Github Page</button>
      <button onClick={() => alert('Instagram Page Opened!')}>LinkedIn</button>
      <button onClick={() => alert('Archidekt Page Opened!')}>Archidekt</button>
    </div>
  )
}

export default DraggableCard