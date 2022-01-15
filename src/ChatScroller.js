import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function ChatScroller ({
  children,
  scrollSpeed = 8
}) {
  const innerRef = useRef()

  useEffect(() => {
    if (!innerRef.current || !innerRef.current.lastChild) return

    const scrollEnd = innerRef.current.scrollHeight
      - Math.max(
        innerRef.current.lastChild.offsetHeight,
        innerRef.current.offsetHeight
      )

    const animate = () => {
      innerRef.current.scrollTop += scrollSpeed
      if (innerRef.current.scrollTop < scrollEnd) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [children, scrollSpeed])

  return (
    <div className='chat-scroller'>
      <div className='chat-scroller__inner'
        ref={innerRef}
        style={{
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  )
}

ChatScroller.propTypes = {
  children: PropTypes.node,
  scrollSpeed: PropTypes.number
}
