import React, { CSSProperties } from 'react'

const styles: CSSProperties = {
  position: 'absolute',
  left: '10px',
  top: '10px',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  zIndex: 10000,
}

interface Props {
  onClose(): void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div style={styles} onClick={onClose}>
      {children}
    </div>
  )
}

export default Modal
