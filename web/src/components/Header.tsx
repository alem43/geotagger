import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Home, Menu, X } from 'lucide-react'
import geotaggerLogo from '../images/geotagger-logo.svg'
import hamburgerMenuIcon from '../images/hamburger-menu-icon.svg'
import xIcon from '../images/icon-x.svg'
import arrowRight from '../images/arrow-right.svg'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="w-full max-h-24 py-7.5 px-8.75 flex justify-between items-center bg-white">
        <Link to="/">
          <img src={geotaggerLogo} alt="Geotagger Logo" />
        </Link>
        <button className="cursor-pointer md:hidden">
          <img
            onClick={() => setIsOpen(true)}
            src={hamburgerMenuIcon}
            alt="Hamburger menu icon"
          />
        </button>
        <nav
          className={`w-full py-7 px-8.75 fixed top-0 left-0 bg-white z-20 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col mx-auto w-full md:hidden">
            <button className=" max-h-10 flex justify-end-safe">
              <img
                src={xIcon}
                alt="eXit icon"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer -mr-2"
              />
            </button>
            <Link
              to="/"
              className="header-h5 mt-6.25 mb-10.75 flex  justify-between items-center "
              onClick={() => setIsOpen(false)}
            >
              Home
              <img src={arrowRight} alt="Arrow to right" className="mr-4" />
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
          </div>
        </nav>
      </header>
    </>
  )
}
