import SparklesText from '@/components/ui/sparkles-text';
import useBackgroundColor from '@/hooks/useBgColor';
import Image from 'next/image';
import React from 'react'

const About = () => {
  const { bgColor } = useBackgroundColor();
  return (
    <div className="w-full relative overflow-y-visible z-10">
      {/* Gradient Overlay at Top */}
      <div className={`absolute inset-x-0 w-full -top-10 h-40 bg-gradient-to-b from-transparent via-background via-30% to-[${bgColor}] pointer-events-none`}></div>

      <div className="flex flex-col gap-14 lg:gap-20 z-50 px-5 py-12 mx-auto max-w-7xl md:px-10 md:py-16 lg:py-20">
        {/* Image */}
        <Image
          src="/benefits/small-business-web-design-fm.svg"
          width={256}
          height={283}
          className="absolute -z-10 scale-175 opacity-60 left-1/4 top-1/3 aspect-auto"
          alt="setting"
          style={{
            width: "256px",
            height: "283px",
          }}
          />
        {/* Content */}
        <div className="flex flex-col gap-14 lg:gap-20">
          <div className="flex flex-col gap-5 md:flex-row">
            <h2 className="flex-1 text-3xl font-bold md:text-5xl">
              <SparklesText sparklesCount={6} text="Our Story" />
            </h2>
            <p className="flex-1">
            Perjalanan kami didorong oleh hasrat untuk mengubah ide menjadi pengalaman visual yang mendalam. 
            Didirikan dengan visi untuk merevolusi dunia konten video, kami telah berkembang menjadi pusat kreativitas dan inovasi.
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <h2 className="flex-1 text-3xl font-semibold md:text-5xl">
              <SparklesText sparklesCount={4} colors={{first: '#A6F1E0', second: '#FFAB5B'}} text="Mission" />
            </h2>
            <p className="flex-1">
            Misi kami jelas: memberdayakan merek melalui kekuatan penceritaan yang tak tertandingi. 
            Kami percaya bahwa setiap merek memiliki narasi unik yang siap diceritakan, dan misi kami adalah menghidupkan kisah-kisah tersebut dengan keaslian, kreativitas, dan dampak.
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <h2 className="flex-1 text-3xl font-bold md:text-5xl">
              <SparklesText sparklesCount={3} colors={{first: '#BE5985', second: '#FFB200'}} text="Approach" />
            </h2>
            <p className="flex-1">
            Yang membedakan kami adalah pendekatan holistik kami dalam mengembangkan image dari produk tersebut.
            Dari konsep hingga kreasi dan promosi, kami memandu klien kami
            melalui setiap langkah, memastikan proses yang lancar dan efektif.
            Kami menggabungkan kreativitas dengan strategi, menghasilkan konten yang tidak hanya terlihat memukau tetapi juga mencapai hasil nyata.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;