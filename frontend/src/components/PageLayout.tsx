import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from './PageLayout.module.css'

interface PageLayoutProps {
  children: ReactNode
  withGlows?: boolean
}

export default function PageLayout({ children, withGlows = false }: PageLayoutProps) {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Pular para o conteúdo
      </a>

      <Navbar />

      <div className={styles.page}>
        {withGlows && (
          <>
            <div className={styles.glowTop} aria-hidden="true" />
            <div className={styles.glowLeft} aria-hidden="true" />
          </>
        )}

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
