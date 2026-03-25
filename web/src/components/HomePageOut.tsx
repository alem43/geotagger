import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@tanstack/react-router'
import worldMapBackground from '../images/background-world-map.png'
import worldImage1 from '../images/world-image-1.png'
import worldImage2 from '../images/world-image-2.png'
import worldImage3 from '../images/world-image-3.png'
import worldImage1Desktop from '../images/world-image-1-desktop.png'
import worldImage2Desktop from '../images/world-image-2-desktop.png'
import worldImage3Desktop from '../images/world-image-3-desktop.png'
import padlockVector from '../images/padlockVector.svg'
import tryBackgroundImage1 from '../images/try-background-image-1.png'
import tryBackgroundImage2 from '../images/try-background-image-2.png'
import tryBackgroundImage3 from '../images/try-background-image-3.png'

const HomePageOut = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col xl:flex-row gap-10.5 mb-21.75 xl:items-center">
        <div className="flex flex-col gap-4 xl:gap-0 mx-auto xl:mx-0 text-center xl:text-start px-10 xl:pl-25.25 xl:pr-0 items-center xl:items-start xl:justify-center max-w-123 lg:max-w-170 xl:max-w-123">
          <h1 className="header-h4 text-[2.1875rem] xl:text-[3.8125rem] xl:leading-17.5 xl:-tracking-[0.03125rem] text-primary mt-12 ">
            Explore the world with Geotagger!
          </h1>
          <p className="body-p text-dark mb-8 md:mb-4 xl:mt-8">
            Geotagger is webiste that allowes you to post picture and tag it on
            the map. Other user than try to locate it via Google Maps.
          </p>
          <Link
            to="/auth/signUp"
            className="sign-up-primary w-full max-w-34.25"
          >
            Sign up
          </Link>
        </div>
        <div
          style={{ backgroundImage: `url(${worldMapBackground})` }}
          className="bg-cover bg-center relative mx-auto xl:mx-0 w-[92.3%] min-h-53.75 xl:h-110 xl:w-220"
        >
          <picture>
            <source media="(min-width: 1280px)" srcSet={worldImage1Desktop} />
            <img
              src={worldImage1}
              alt="world image"
              className="absolute top-0 left-[5%] lg:left-[15%] xl:left-0 xl:top-[9%] sm:scale-125 md:scale-150 lg:scale-[175%] xl:scale-100"
            />
          </picture>
          <picture>
            <source media="(min-width: 1280px)" srcSet={worldImage2} />
            <img
              src={worldImage2}
              alt="world image"
              className="absolute top-[25%] right-0 xl:top-[35%] sm:scale-125 md:scale-150 lg:scale-[175%] xl:scale-100 sm:right-[3%] md:right-[7%] lg:right-[17.5%]"
            />
          </picture>
          <picture>
            <source media="(min-width: 1280px)" srcSet={worldImage3Desktop} />
            <img
              src={worldImage3}
              alt="world image"
              className="absolute bottom-[5%] left-[10%] lg:left-[20%] xl:left-[20%] xl:bottom-0 sm:scale-125 md:scale-150 lg:scale-[175%] xl:scale-100"
            />
          </picture>
        </div>
      </div>
      <div className="flex flex-col gap-2 mx-auto text-center px-8.5 mb-18">
        <h1 className="header-h5 text-[1.5rem] xl:text-[2.1875rem] xl:tracking-[0.0156rem] text-primary">
          Try yourself at Geotagger!
        </h1>
        <p className="body-p text-dark xl:max-w-136 xl:mx-auto">
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </p>
      </div>
      <div className="flex flex-col gap-[2.685rem] xl:gap-20 px-8.75 mb-9.75 xl:mb-27">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-4.75 w-full xl:max-w-324.5 xl:mx-auto h-156.75 lg:max-h-58.75">
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage1})` }}
            className="bg-cover bg-center flex-1 max-h-48.25 xl:min-h-58.75 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage2})` }}
            className="bg-cover bg-center flex-1 max-h-48.25 xl:min-h-58.75 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage3})` }}
            className="bg-cover bg-center flex-1 max-h-48.25 xl:min-h-58.75 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
        </div>
        <Link
          to="/auth/signUp"
          className="sign-up-primary w-full max-w-34.25 mx-auto"
        >
          Sign up
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default HomePageOut
