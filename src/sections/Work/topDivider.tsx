import type React from "react"

interface WaveBackgroundProps {
  width?: string
  height?: string
  color: string
}

const LayeredTriange: React.FC<WaveBackgroundProps> = ({ width = '100%', color }) => {
  return (
    <svg 
        style={{ objectFit: 'cover' }}
        version="1"
        baseProfile="full"
        width={width}
        xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 1000 100'>
            <g fill={color} transform="scale(1,1)">
                <path d='M0 0v84l500 16 500-16V0H0z' opacity='.2'></path>
                <path d='M0 0v64l500 36 500-36V0H0z' opacity='.4'></path>
                <path d='M0 0v44l500 56 500-56V0H0z' opacity='.4'></path>
                <path d='M0 0v24l500 76 500-76V0H0z' opacity='.5'></path>
                <path d='M0 0v4l500 96 500-96V0H0z'></path>
            </g>
        </svg>
    );
}
export default LayeredTriange;