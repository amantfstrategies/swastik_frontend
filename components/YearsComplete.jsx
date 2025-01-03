import Image from 'next/image'
import React from 'react'

const YearsComplete = () => {
  return (
    <div className='flex flex-col font-montserrat items-center w-full px-8 md:px-40  justify-center bg-[#F7F7F7] py-12 space-y-12'>
        <Image src="/25years.png" alt="years" width={600} height={600} className='w-[50%] md:w-[13%] h-fit' />

        <h2 className='text-[#3ab4df] text-center font-[700] text-3xl'>
        CELEBRATING 25 YEARS OF SUCCESS
        </h2>

        <p className='font-[200] text-2xl text-[#6a6d6d] text-center'>
        From humble beginnings to remarkable growth, our Journey mirrors your dreams - a testament to the transformative power of partnership and progress,
        </p>

        <p className='text-2xl font-[300] text-[#6a6d6d] underline'>
            More About Us
        </p>
    </div>
  )
}

export default YearsComplete
