import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import LogoMark from './LogoMark'
import NavLinkItem from './NavLinkItem'
import { signupFormUrl, siteNavLinks, communityCtaLabel } from '../data/links'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <nav
          className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
          aria-label="Navegação principal"
        >
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <LogoMark size={42} />
          <span className={styles.brandText}>
            <span className={styles.brandOrange}>PyLadies</span>{' '}
            <span className={styles.brandTeal}>Floripa</span>
          </span>
        </Link>

        <div className={styles.right}>
          <ul className={styles.links}>
            {siteNavLinks.map((link) => (
              <li key={link.label}>
                <NavLinkItem
                  href={link.href}
                  external={link.external}
                  className={`${styles.link} ${styles.linkUnderline}`}
                >
                  {link.label}
                </NavLinkItem>
              </li>
            ))}
          </ul>
          <Button href={signupFormUrl} className={styles.navButton}>
            {communityCtaLabel}
          </Button>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        </nav>
      </div>

      <div
        id={menuId}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        hidden={!menuOpen}
      >
        <button
          type="button"
          className={styles.mobileBackdrop}
          aria-label="Fechar menu"
          onClick={closeMenu}
        />

        <div className={styles.mobilePanel} role="dialog" aria-modal="true" aria-label="Menu">
          <ul className={styles.mobileLinks}>
            {siteNavLinks.map((link) => (
              <li key={link.label}>
                <NavLinkItem
                  href={link.href}
                  external={link.external}
                  className={styles.mobileLink}
                  onNavigate={closeMenu}
                >
                  {link.label}
                </NavLinkItem>
              </li>
            ))}
          </ul>

          <Button href={signupFormUrl} className={styles.mobileCta} onClick={closeMenu}>
            {communityCtaLabel}
          </Button>
        </div>
      </div>
    </header>
  )
}
