import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HomePageIn = () => {
  return (
    <>
      <Header />

      <h4 className="header-h4 text-[2.1875rem] text-primary">
        Personal best guesses
      </h4>
      <p className="body-p text-dark">
        Your personal best guesses appear here. Go on and try to beat your
        personal records or set new!
      </p>
      <Footer />
    </>
  )
}

export default HomePageIn
