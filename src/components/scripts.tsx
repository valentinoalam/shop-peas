"use client";
import type React from "react"
import Script from "next/script"
import { useSocialScripts } from "@/hooks/useSocialScripts";

const scriptMap = [
  { id:"facebook-jssdk", name: "fb", nonce: "FOKrbAYI", src: "https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v22.0&appId=1800906330756084", async:true },
  { id:"twitter-wjs", name: "x", nonce: "MIyacvse", src: "https://platform.twitter.com/widgets.js", async:true },
  { id:"linkedin-badge", name: "linkedIn", nonce: "FOKBabuy", src: "https://platform.linkedin.com/badges/js/profile.js", async:true },
  { id:"trustpilot-widget", name: "trustPilot", nonce: "FebAYIyaa", src: "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js", async:true },
];
const Scripts: React.FC = () => {
  const { scripts, setX, setFb, setLinkedIn, setTrustPilot } = useSocialScripts();

  return (
    <div className="space-y-6">
      {process.env.NODE_ENV === "production" && (
      <>
        <Script async strategy="lazyOnload" src="https://assets.pinterest.com/js/pinit.js" />
        <Script
          id="pinterest-base-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (!function(e){
                if(!window.pintrk){
                  window.pintrk = function(){
                    pintrk.queue.push(Array.prototype.slice.call(arguments));
                  };
                  pintrk.queue = [];
                  pintrk.version = "3.0";
                  var t = document.createElement("script");
                  t.async = true;
                  t.src = e;
                  var r = document.getElementsByTagName("script")[0];
                  r.parentNode.insertBefore(t, r);
                }
              })("https://s.pinimg.com/ct/core.js");
              
              setTimeout(() => {
                if(typeof pintrk === 'function') {
                  console.log('Initializing Pinterest tag');
                  pintrk('load', ${process.env.NEXT_PUBLIC_PINTEREST_TAG_ID});
                  pintrk('page');
                } else {
                  console.warn('Pinterest not initialized');
                }
              }, 2000);
            `,
          }}
          onLoad={() => {
            console.log("Pinterest script loaded successfully")
          }}
          onError={(e) => console.error("Pinterest script failed to load", e)}
        />
      </>
      )}
      {/* start Social Media Scripts */}
      { scriptMap.map(({ id, name, src, async, nonce }) => (
        <Script
          key={name}
          id={id}
          src={src}
          async={async}
          nonce={nonce}
          strategy="lazyOnload"
          crossOrigin={name === 'fb'? 'anonymous' : undefined}
          onLoad={() => {
            console.log(`${name} script successfully loaded`)
            switch(name) {
              case "x":
                setX(!scripts.x);
                break;
              case "trustPilot":
                const trustpilotElements = document.querySelectorAll('[data-template-id]');
                trustpilotElements.forEach(el => {
                  window.Trustpilot.loadFromElement(el as HTMLElement);
                });
                setTrustPilot(!scripts.trustPilot);
                break;
              case "fb":
                setFb(!scripts.fb);
                break;
              case  "linkedIn": 
                setLinkedIn(!scripts.linkedIn);
                break;
            }
            // console.log(scripts[name as keyof SocialScripts])
          }}
          onError={(e) =>  console.error(`${name} script failed to load`, e)}
        />
      )) }

      <Script id="posthog-script" strategy="lazyOnload">
        {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_TGvBVCAF0uPtL73Vx8CLeAo47GHfCbN05OHA6NEjvID', {
            api_host:'https://us.i.posthog.com',
            person_profiles: 'identified_only'
          })
        `}
      </Script>

      {/* <Script id="tawk-script" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/679b1ce1825083258e0d637a/1iiquhkd8';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script> */}
      {/* OptinMonster */}
      {/* <script data-account="XXXXXX" src="https://a.optmstr.com/app/js/api.min.js" data-user="XXXXX" async></script> */}

      {/* Privy */}
      {/* <script type="text/javascript" src="https://widget.privy.com/assets/widget.js"></script> */}
    </div>
  )
}

export default Scripts

