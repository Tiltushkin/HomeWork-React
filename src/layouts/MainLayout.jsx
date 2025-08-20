import React from 'react'
import s from './Layout.module.scss'
import Header from './Header'
import Footer from './Footer'

function MainLayout({ children }) {
  return (
    <div className={s.layout}>
        <Header />
          <div className={s.content}>{ children }</div>
        <Footer />
    </div>
  )
}

export default MainLayout