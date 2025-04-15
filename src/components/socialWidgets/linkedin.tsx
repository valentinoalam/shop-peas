import Script from 'next/script'
import React, { useEffect, useRef } from 'react'
interface LinkedInWidgetProps {
    profileUrl: string
    format?: "inline" | "hover"
    theme?: "light" | "dark"
    size?: "small" | "medium" | "large"
}
const lInId = process.env.NEXT_PUBLIC_LIN_USERNAME;
const LinkedInWidget = ({
    profileUrl = lInId as string,
    format = "inline",
    theme = "light",
    size = "medium",
  }: LinkedInWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!containerRef.current) return;
    // Render LinkedIn badges after script is loaded
    if (window.IN && window.IN.showBadge) {
      window.IN.showBadge(containerRef.current)
    }
  }, [])
    return (
<>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.IN && window.IN.showBadge) {
            window.IN.showBadge(containerRef.current as HTMLDivElement)
          }
        }}
      />

      <div
        ref={containerRef}
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme={theme}
        data-type={format}
        data-vanity={profileUrl.split("/").pop()}
        data-version="v1"
      >
        <a className="badge-base__link LI-simple-link" href={profileUrl}>
          Loading LinkedIn Profile...
        </a>
      </div>
    </>
    )
}

export default LinkedInWidget