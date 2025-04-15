import { useSocialScripts } from '@/hooks/useSocialScripts';
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TrustPilot = () => {
  const { trustPilot } = useSocialScripts().scripts;
  return (
    <>
      { trustPilot && (
        <div className="max-w-md justify-self-center w-max align-middle min-h-[100px] h-max">
          <div className="mx-auto w-max text-center">
            <div className='flex align-middle'>
              <h1 className="text-lg font-semibold md:text-2xl md:font-bold mb-3">Trustpilot Reviews</h1>
              <Star className="h-5 w-5" />
            </div>
            <p>Customer feedback</p>
          </div>

          { window.Trustpilot && 
          <div
            className="trustpilot-widget text-center"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="67c09529c4ed5d06f56b4fd3"
            data-style-height="150px"
            data-style-width="100%"
            data-theme="light"
            data-stars="1,2,3,4,5"
          >
            <Link href="https://www.trustpilot.com/review/tinokarya.com" target="_blank" rel="noopener">
              Trustpilot Reviews
            </Link>
          </div>
          }
        </div>)
      }
    </>
  )
}
export default TrustPilot