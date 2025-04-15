"use client"

import type React from "react"
import { useState } from "react"

// Assuming you have a similar data structure
import {otherFaqData} from "./content"
import { MinusCircle, PlusCircle } from "lucide-react"

const FAQ = () => {
  const [clicked, setClicked] = useState<number | null>(null)

  const toggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null)
    }
    setClicked(index)
  }

  return (
    <div className="w-full h-max grid place-items-center py-6 text-white border-gray-700">
  <div className="w-full max-w-screen-md px-4 pt-12 mb-16 flex flex-col items-center justify-center select-none sm:pt-6">
    <h2 className="text-3xl sm:text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

    <div className="w-full overflow-hidden relative flex flex-col items-center justify-center rounded-xl pb-16 shadow-xl bg-[#7DB3E8]">
      {otherFaqData.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-row items-center justify-center transition-all duration-200 ease-in-out my-3 px-4"
        >
          <div className="w-full flex flex-col sm:w-11/12 border-b border-gray-600">
            <div className="w-full mb-3">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-xl sm:text-lg font-semibold tracking-wide mt-3 flex items-center justify-between cursor-pointer"
              >
                {item.question}
                {clicked === index ? (
                  <MinusCircle className="text-2xl min-w-[25px] min-h-[25px] ml-1 opacity-90" />
                ) : (
                  <PlusCircle className="text-2xl min-w-[25px] min-h-[25px] ml-1 opacity-90" />
                )}
              </button>
            </div>
            {clicked === index && (
              <p className="text-lg sm:text-base mt-3 leading-relaxed text-gray-300 pl-3">{item.answer}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default FAQ

