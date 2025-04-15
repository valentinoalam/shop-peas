'use client'
import React from 'react'
import { Loader2 } from "lucide-react"
import { useSocialScripts } from '@/hooks/useSocialScripts'

interface TwitterWidgetProps {
    username: string
    theme?: "light" | "dark"
    height?: number
    width?: number | string
    tweetLimit?: number
}

const TwitterWidget = ({
    username,
    theme = "light",
    height = 400,
    width = "100%",
    tweetLimit = 3
  }: TwitterWidgetProps) => {
    // const containerRef = useRef<HTMLDivElement>(null)
    // const [loading, setLoading] = useState(true)
    const { x } = useSocialScripts().scripts;
    // useEffect(() => {
    //     if (window.twttr && containerRef.current) {
    //         window.twttr.widgets.createTweet(
    //             username as string,
    //             containerRef.current,
    //             {
    //             theme: 'dark' // Optional: Customize theme
    //             }
    //         ).then(() => {
    //             console.log('Tweet loaded successfully');
    //         }).catch(error => {
    //             console.error('Error loading tweet:', error);
    //         });
    //     }
        
    //     // Handle client-side navigation
    //     return () => {
    //         if (window.twttr?.widgets) {
    //             window.twttr.widgets.load();
    //         }
    //     };
    // }, [username]);

    // useEffect(() => {
    //     // Create Twitter timeline after script is loaded
    //     if (window.twttr && containerRef.current) {
    //     window.twttr.widgets
    //         .createTimeline(
    //         {
    //             sourceType: "profile",
    //             screenName: username,
    //         },
    //         containerRef.current,
    //         {
    //             height,
    //             theme,
    //             tweetLimit,
    //         },
    //         )
    //         .then(() => setLoading(false))
    //     }
    //     // Handle client-side navigation
    //     return () => {
    //         if (window.twttr?.widgets) {
    //             window.twttr.widgets.load();
    //         }
    //     };
    // }, [username, theme, height, tweetLimit])

    return (
        <>
            { !x ? 
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
            :
            <a  className="twitter-timeline"
                href={`https://twitter.com/${username}`}
                data-theme={theme}
                data-tweet-limit={tweetLimit}
                data-width={width.toString()}
                data-height={height.toString()}>
                Tweets by @{username}
            </a>
            }
        </>

    )
}

export default TwitterWidget