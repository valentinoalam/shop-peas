// Initialize analytics and tracking tools before rendering
function initializeAnalytics() {
  if (typeof document === 'undefined') {
    console.warn('initializeAnalytics: document is not defined. Skipping initialization.');
    return;
  }

    // Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PGSGDDH3');
    `;
    document.head.appendChild(gtmScript);

    // Google Analytics 4
    const ga4Script = document.createElement('script');
    ga4Script.async = true;
    ga4Script.src = 'https://www.googletagmanager.com/gtag/js?id=G-81VDBMH4EP';
    document.head.appendChild(ga4Script);

    const ga4ConfigScript = document.createElement('script');
    ga4ConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-81VDBMH4EP');
    `;
    document.head.appendChild(ga4ConfigScript);

    // Meta Pixel
    // const metaPixelScript = document.createElement('script');
    // metaPixelScript.innerHTML = `
    //     !function(f,b,e,v,n,t,s)
    //     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    //     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    //     n.queue=[];t=b.createElement(e);t.async=!0;
    //     t.src=v;s=b.getElementsByTagName(e)[0];
    //     s.parentNode.insertBefore(t,s)}(window, document,'script',
    //     'https://connect.facebook.net/en_US/fbevents.js');
    //     fbq('init', '858801884497251');
    //     fbq('track', 'PageView');
    // `;
    // document.head.appendChild(metaPixelScript);
    
    // Hotjar
    if(process.env.NODE_ENV === "production")  {
        const hotjarScript = document.createElement('script');
        hotjarScript.innerHTML = `
            (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:5287273,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `;
        document.head.appendChild(hotjarScript);
    }
}

const handleInitialization = () => {
    initializeAnalytics();
    
      // Initialize WAVE accessibility evaluation
      // const waveScript = document.createElement('script');
      // waveScript.src = 'https://wave.webaim.org/widget/wave.js';
      // document.body.appendChild(waveScript);

      // LiveChatWidget initialization
      // if (window.LiveChatWidget) {
      //   window.LiveChatWidget.on('ready', () => {
      //     console.log('LiveChat ready');
      //   });
      // }
      
      // const liveChatScript = document.createElement('script');
      // liveChatScript.innerHTML = `
      //   window.__lc = window.__lc || {};
      //   window.__lc.license = YOUR_LICENSE_ID;
      //   ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(n,i){e._q.push(["on",n,i])},once:function(n,i){e._q.push(["once",n,i])},off:function(n,i){e._q.push(["off",n,i])},get:function(n){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return e._h.apply(null,[].concat(n))},call:function(n,i){e._q.push(["call",n,i])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document))
      // `;
      //   document.head.appendChild(liveChatScript);

      // HubSpot
      // const hubspotScript = document.createElement('script');
      // hubspotScript.type = 'text/javascript';
      // hubspotScript.id = 'hs-script-loader';
      // hubspotScript.async = true;
      // hubspotScript.defer = true;
      // hubspotScript.src = '//js.hs-scripts.com/XXXXXXX.js';
      // document.head.appendChild(hubspotScript);

      // Optimizely
      // const optimizelyScript = document.createElement('script');
      // optimizelyScript.src = 'https://cdn.optimizely.com/js/XXXXXXXXXX.js';
      // document.head.appendChild(optimizelyScript);
  
    // Cleanup function
    return () => {
      // if (window.LiveChatWidget) {
      //   window.LiveChatWidget.on('ready', () => {
      //     window.LiveChatWidget.off('ready');
      //     window.LiveChatWidget.off('onMessage');
      //   });
      // }
      
    };
  };
export default handleInitialization