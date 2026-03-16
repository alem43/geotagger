import React from 'react'
import logoFooter from '../images/logo-footer.svg'

const Footer = () => {
  return (
    <div className="rounded-t-4xl gradient-footer flex justify-between items-center-safe px-10.5 h-16.25">
      <img src={logoFooter} alt="footer logo" />
      <p className="text-footer">All Rights Reserved | paroot.io</p>
    </div>
  )
}

export default Footer
