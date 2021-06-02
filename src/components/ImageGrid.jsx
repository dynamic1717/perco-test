import React, { useEffect, useState } from 'react'
import { imageDb } from '../imageDb'
import { ImageModal } from './ImageModal'
import { Modal } from './Modal'

const ImageGrid = () => {
  const [images, setImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImg, setSelectedImg] = useState('')

  const handleOpenModal = (img) => {
    setIsModalOpen(true)
    setSelectedImg(img)
  }

  // Эмуляция получения изображений из БД
  useEffect(() => {
    setImages(imageDb)
  }, [])

  return (
    <div className='images'>
      {images &&
        images.map((img, index) => {
          return (
            <div
              key={index}
              className='images__img'
              onClick={() => handleOpenModal(img)}
            >
              <img src={img.url} alt='p' />
            </div>
          )
        })}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ImageModal selectedImg={selectedImg} />
      </Modal>
    </div>
  )
}

export default ImageGrid
