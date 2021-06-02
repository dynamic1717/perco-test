import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as HeartIcon } from '../assets/heart.svg'

export const ImageModal = ({ selectedImg }) => {
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [imgHeight, setImgHeight] = useState(null)
  const imgRef = useRef(null)
  const commentsEndRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message) {
      setComments((prev) => [...prev, message])
      setMessage('')
    }
  }

  // Прокрутка блока комментариев до последнего нового
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Получение значения высоты фото, чтобы секции фото и комментариев были одинаковой высоты
  useEffect(() => {
    setImgHeight(imgRef.current.clientHeight)
  }, [])

  // Обработка прокурутки
  useEffect(() => {
    scrollToBottom()
  }, [comments])

  return (
    <div className='image-modal'>
      <div className='image-modal__image'>
        <img src={selectedImg.url} alt='pic' ref={imgRef} />
      </div>

      <div className='image-modal__social' style={{ height: imgHeight }}>
        <button
          className={
            isLiked
              ? 'image-modal__btn-like image-modal__btn-like_active'
              : 'image-modal__btn-like'
          }
          onClick={() => setIsLiked(!isLiked)}
        >
          <HeartIcon />
          Нравится
        </button>

        <hr />

        <form
          className='image-modal__send-message-form'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            id='comment'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Оставить комментарий...'
          />
          <button type='submit'>Отправить</button>
        </form>

        <div className='image-modal__comments'>
          {comments.map((item, i) => (
            <div key={i} className='image-modal__single-comment'>
              <span>User</span>
              <p>{item}</p>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
      </div>
    </div>
  )
}
