import React from 'react'
import Image from 'next/image'
function Hero() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Full-screen Image */}
      <div className="relative w-full h-full">
        <Image
          src={'/Dashboard.png'}
          alt="dashboard"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Text Section */}
      <div className="w-full bg-white p-6 text-center">
        <p className="text-gray-700 text-lg">
          Take control of your finances with MoneyMate, your all-in-one expense tracking solution. 
          Easily log your expenses, visualize spending patterns, and gain insights to budget smarter. 
          Managing money has never been easier. Whether you're saving for a dream purchase or just 
          keeping track of daily expenses, MoneyMate helps you stay on top of your financial game.
        </p>
      </div>
    </div>
    
  )
}

export default Hero