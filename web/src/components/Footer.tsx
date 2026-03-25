import React from 'react'
import logoFooter from '../images/logo-footer.svg'
import logoFooterFull from '../images/footer-logo-full.svg'

const Footer = () => {
  return (
    <div className="rounded-t-4xl gradient-footer">
      <div className="flex justify-between items-center-safe max-w-360 mx-auto px-10.5 xl:pl-18 xl:pr-17.5 h-16.25">
        <picture>
          <source media="(min-width: 1280px)" srcSet={logoFooterFull} />
          <img src={logoFooter} alt="logo footer" />
        </picture>
        <p className="text-footer">All Rights Reserved | paroot.io</p>
      </div>
    </div>
  )
}

export default Footer
