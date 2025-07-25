'use client'

import { useEffect, useState } from "react";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
 
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
 
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null
  }

  return (
    <div className="p-6">
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the <strong>share button</strong>
          &nbsp;and then <strong>&quot;Add to Home Screen&quot;</strong>.
        </p>
      )}
    </div>
  )
}

export default InstallPrompt
