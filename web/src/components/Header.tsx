import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import geotaggerLogo from '../images/geotagger-logo.svg'
import hamburgerMenuIcon from '../images/hamburger-menu-icon.svg'
import xIcon from '../images/icon-x.svg'
import arrowRight from '../images/arrow-right.svg'
import arrowRightGreen from '../images/arrow-right-green.svg'
import mobileProfilePictureDefault from '../images/mobile-profile-picture-default.svg'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn, setIsSignedIn, user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await fetch('http://localhost:8787/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsSignedIn(false)
      setUser(null)
      navigate({ to: '/' })
    }
  }

  const handleHome = () => {
    navigate({ to: '/' })
  }

  const handleProfile = () => {
    navigate({ to: '/profile/profile' })
  }

  return (
    <>
      <header className="w-full max-h-24 py-7.5 px-8.75 xl:px-17.5 bg-white z-10 box-shadow max-w-360 mx-auto">
        <div className="flex justify-between items-center max-w-360 mx-auto">
          <Link to="/">
            <img
              src={geotaggerLogo}
              alt="Geotagger Logo"
              className="h-10 w-42.75"
            />
          </Link>
          <button className="cursor-pointer md:hidden">
            <img
              onClick={() => setIsOpen(true)}
              src={hamburgerMenuIcon}
              alt="Hamburger menu icon"
            />
          </button>

          <div className="hidden gap-4 items-center-safe w-full max-w-60 md:flex">
            {isSignedIn ? (
              <div className="flex w-full justify-between items-center-safe max-w-59.75">
                <p
                  className="body-p text-dark cursor-pointer"
                  onClick={handleHome}
                >
                  Home
                </p>
                <p
                  className="body-p text-dark cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </p>
                <img
                  src={mobileProfilePictureDefault}
                  alt="hero"
                  className="w-full h-full max-w-10 max-h-10 object-cover cursor-pointer"
                  onClick={handleProfile}
                />
              </div>
            ) : (
              <>
                <Link to="/auth/signIn" className="body-p-bold text-dark">
                  Sign in
                </Link>
                <p className="body-p text-dark">or</p>
                <Link
                  to="/auth/signUp"
                  className="sign-up-primary w-full max-w-34.25"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <nav
            className={`w-full py-7 px-8.75 fixed top-0 left-0 bg-white z-20 transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex flex-col w-full md:hidden">
              <button className=" max-h-10 flex justify-end-safe">
                <img
                  src={xIcon}
                  alt="eXit icon"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer -mr-2"
                />
              </button>

              {isSignedIn ? (
                <>
                  <div
                    className="flex items-center-safe mb-12.5"
                    onClick={handleProfile}
                  >
                    <img
                      src={mobileProfilePictureDefault}
                      alt="profile picture"
                      className="w-full h-full max-w-12 max-h-12 mr-7.5"
                    />
                    <h5 className="header-h5 text-2xl">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : 'Loading...'}
                    </h5>
                  </div>
                  <Link
                    to="/"
                    className="header-h5 text-2xl flex justify-between items-center mb-6 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    onClick={handleHome}
                  >
                    Home
                    <img
                      src={arrowRight}
                      alt="Arrow to right"
                      className="mr-4"
                    />
                  </Link>
                  <Link
                    to="/"
                    className="header-h5 text-2xl flex justify-between items-center text-primary cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    onClick={handleSignOut}
                  >
                    Logout
                    <img
                      src={arrowRightGreen}
                      alt="Arrow to right"
                      className="mr-4"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="header-h5 mt-6.25 mb-10.75 flex  justify-between items-center "
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                    <img
                      src={arrowRight}
                      alt="Arrow to right"
                      className="mr-4"
                    />
                  </Link>
                  <Link
                    to="/auth/signUp"
                    onClick={() => setIsOpen(false)}
                    className="sign-up-primary mb-6"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/auth/signIn"
                    onClick={() => setIsOpen(false)}
                    className="sign-in-primary"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
