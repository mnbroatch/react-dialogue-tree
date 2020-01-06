import React, { useRef, useEffect, useCallback } from 'react'

export default function JavaScriptAnimation ({
  children,
  active = true,
  modifyElement,
  memberStyles = {},
  containerStyles = {}
}) {
  const initialTimeRef = useRef(Date.now())
  const containerRef = useRef()
  const animationFrameIdRef = useRef()

  const animate = useCallback(() => {
    const elapsedTime = Date.now() - initialTimeRef.current
    const element = containerRef.current
    modifyElement(element, elapsedTime)
    animationFrameIdRef.current = requestAnimationFrame(animate)
  }, [modifyElement])

  useEffect(() => {
    if (!active || !containerRef.current) return
    animationFrameIdRef.current = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(animationFrameIdRef.current) }
  }, [active, modifyElement])

  return (
    <span ref={containerRef} style={containerStyles}>
      {children}
    </span>
  )
}
