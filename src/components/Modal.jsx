import React from 'react'
import ReactDom from 'react-dom'

export const Modal = ({ open, children, onClose }) => {
  if (!open) return null

  return ReactDom.createPortal(
    <div className='modal' onClick={onClose}>
      <div className='modal__content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}
