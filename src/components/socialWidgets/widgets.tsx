"use client"

import type React from "react"
import { useEffect, useRef } from "react"

import Icons from "@/components/icons/socialIcon"
import { useSocialScripts } from "@/hooks/useSocialScripts"
import router from "next/router"
import SocialCard from "./socialCard"
import InstagramWidget from "./instagram"
import TwitterWidget from "./twitter"

export default function SocialMediaGallery() {
  const fbContainerRef = useRef<HTMLDivElement>(null);
  const lInContainerRef = useRef<HTMLDivElement>(null);
  const { x, fb, linkedIn } = useSocialScripts().scripts;
  // const fbId = process.env.NEXT_PUBLIC_FB_USERNAME;
  const fbPageId = process.env.NEXT_PUBLIC_FB_PAGE_USERNAME;
  const fbPageUri = `https://www.facebook.com/${fbPageId}`;
  const lInId = process.env.NEXT_PUBLIC_LIN_USERNAME;
  const xId = process.env.NEXT_PUBLIC_X_USERNAME;
  useEffect(() => {
// Initialize social widgets with proper checks until object is available
    const initializeWidgets = () => {
      try {
        // Facebook initialization
        if (window.FB) {
          window.fbAsyncInit = () => {
            window.FB.init({
              xfbml: true,
              status: true, 
              cookie: true, 
              version: 'v22.0',
              appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
            });
          };
          // window.FB.AppEvents.logPageView();
          window.FB.XFBML.parse(fbContainerRef.current as HTMLElement);
        }
        
        // Twitter widgets
        // if (window.twttr && window.twttr.widgets) {
        //   window.twttr.widgets.load(tweetRef.current as HTMLElement);
        // }
        
        // LinkedIn initialization
        if (window.IN) {
          window.IN.init();
          window.IN.showBadge(lInContainerRef.current as HTMLDivElement);
        }
        // Trustpilot
        if (window.Trustpilot) {
          const trustpilotElements = document.querySelectorAll('[data-template-id]');
          trustpilotElements.forEach(el => {
            window.Trustpilot.loadFromElement(el as HTMLElement);
          });
        }
      } catch (error) {
        console.error('Widget initialization error:', error);
        // If any widget fails, retry after a short delay
        console.log('Retrying widget initialization...');
        setTimeout(initializeWidgets, 1000);
      }
    };

    const handleRouteChange = () => {
      // Initial load
      initializeWidgets();
    };

    // const retryInterval = setInterval(initializeWidgets, 3000);
    const initTimeout = setTimeout(() => {
      if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
      ) {
        handleRouteChange();
      }
    }, 500);
    // Setup route change listeners
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Initial parse after mount
    handleRouteChange();
 
    // Cleanup
    return () => {
    window.fbAsyncInit = undefined
    clearTimeout(initTimeout);
    // clearInterval(retryInterval); // Cleanup interval on component unmount
    router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [fb, linkedIn, x])
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Social Media Presence</h2>
        <p className="text-muted-foreground mt-2">Connect with us across various platforms</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6">
        <SocialCard
          title="Facebook Page"
          description="Updates and community"
          icon={<Icons.Facebook className="h-5 w-5" />}
          isLoading={!fb}
        >
          <div className="facebook-page-container">
          <div ref={fbContainerRef}
            className="fb-page"
            data-href={fbPageUri}
            data-tabs="timeline"
            data-width="450" 
            data-height="350"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="true"
            data-show-facepile="true"
            data-hide-cta="false"
            data-lazy="true" // Enable lazy loading
          >
            <blockquote 
              cite={fbPageUri} 
              className="fb-xfbml-parse-ignore">
              <a href={fbPageUri}>Mari Menulis</a>
            </blockquote>
          </div>
        </div>
        </SocialCard>
        {/* LinkedIn Profile Badge */}
        <SocialCard
          title="LinkedIn Profile"
          description="Professional network"
          icon={<Icons.Linkedin className="h-5 w-5" />}
          isLoading={!linkedIn}
        >
          <div ref={lInContainerRef}
            className="badge-base LI-profile-badge"
            data-locale="en_US"
            data-size="medium"
            data-theme="light"
            data-type="VERTICAL"
            data-vanity={lInId}
            data-version="v1"
          >
            <a 
              className="badge-base__link LI-simple-link" 
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.linkedin.com/in/${lInId}?trk=profile-badge`}>
                {process.env.NEXT_PUBLIC_LIN_REALNAME}
            </a>
          </div>
        </SocialCard>
        <SocialCard
          title="Instagram Feed"
          description="Point of View of Me"
          icon={<Icons.Instagram className="h-5 w-5" />}
          isLoading={!fb}
        ><InstagramWidget />
        </SocialCard>
        <SocialCard
          title="Twitter Feed"
          description="Latest tweets and updates"
          icon={<Icons.Twitter className="h-5 w-5" />}
          isLoading={!x}
        >
          <TwitterWidget username={xId as string} theme="light" height={400} />
        </SocialCard>
      </div>
    </div>
  )
}
