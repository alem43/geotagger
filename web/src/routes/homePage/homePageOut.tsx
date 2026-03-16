import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@tanstack/react-router'
import worldMapBackground from '../../images/background-world-map.png'
import worldImage1 from '../../images/world-image-1.png'
import worldImage2 from '../../images/world-image-2.png'
import worldImage3 from '../../images/world-image-3.png'
import padlockVector from '../../images/padlockVector.svg'
import tryBackgroundImage1 from '../../images/try-background-image-1.png'
import tryBackgroundImage2 from '../../images/try-background-image-2.png'
import tryBackgroundImage3 from '../../images/try-background-image-3.png'

export const Route = createFileRoute('/homePage/homePageOut')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="xl:hidden w-full">
        <Header />
      </div>
      <div className="flex flex-col gap-4 mx-auto text-center px-10 items-center">
        <h1 className="header-h4 text-[2.1875rem] text-primary mt-12 ">
          Explore the world with Geotagger!
        </h1>
        <p className="body-p text-dark mb-8">
          Geotagger is webiste that allowes you to post picture and tag it on
          the map. Other user than try to locate it via Google Maps.
        </p>
        <Link
          to="/auth/signUp"
          className="sign-up-primary mb-6 w-full max-w-34.25"
        >
          Sign up
        </Link>
      </div>
      <div
        style={{ backgroundImage: `url(${worldMapBackground})` }}
        className="bg-cover bg-center relative mx-auto w-[92.3%] h-53.75 mb-21.75"
      >
        <img
          src={worldImage1}
          alt="world image"
          className="absolute top-4 left-6"
        />
        <img
          src={worldImage2}
          alt="world image"
          className="absolute top-18 right-3.5"
        />
        <img
          src={worldImage3}
          alt="world image"
          className="absolute bottom-2.25 left-11"
        />
      </div>
      <div className="flex flex-col gap-2 mx-auto text-center px-8.5 mb-18">
        <h1 className="header-h5 text-[2.1875rem] text-primary mt-12 ">
          Try yourself at Geotagger!
        </h1>
        <p className="body-p text-dark mb-8">
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </p>
      </div>
      <div className="flex flex-col gap-[2.685rem] px-8.75 mb-9.75">
        <div className="flex flex-col gap-6 w-full h-156.75">
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage1})` }}
            className="bg-cover bg-center w-full h-full max-h-48.25 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage2})` }}
            className="bg-cover bg-center w-full h-full max-h-48.25 rounded-2xl"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${tryBackgroundImage3})` }}
            className="bg-cover bg-center w-full h-full max-h-48.25 rounded-2xl"
          >
            <div className="w-full h-full gradient-background flex items-center-safe justify-center-safe">
              <img src={padlockVector} alt="padlock" />
            </div>
          </div>
        </div>
        <Link
          to="/auth/signUp"
          className="sign-up-primary mb-6 w-full max-w-34.25 mx-auto"
        >
          Sign up
        </Link>
      </div>
      <Footer />
    </>
  )
}
