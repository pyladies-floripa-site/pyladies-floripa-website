import { Link } from 'react-router-dom'
import LogoMark from './LogoMark'
import NavLinkItem from './NavLinkItem'
import Reveal from './Reveal'
import SocialIcon from './SocialIcon'
import { signupFormUrl, siteNavLinks, communityCtaLabel } from '../data/links'
import { socialLinks } from '../data/socialLinks'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Reveal variant="up" className={styles.revealWrap}>
        <div className={styles.inner}>
          <div className={styles.main}>
            <div className={styles.brandColumn}>
              <Link to="/" className={styles.brand}>
                <LogoMark size={36} />
                <span className={styles.brandText}>
                  <span className={styles.brandOrange}>PyLadies</span>{' '}
                  <span className={styles.brandTeal}>Floripa</span>
                </span>
              </Link>

              <p className={styles.tagline}>
                Comunidade de mulheres em Python em Florianópolis.
              </p>

              <nav className={styles.socials} aria-label="Redes sociais">
                <ul className={styles.socialList}>
                  {socialLinks.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`PyLadies Floripa no ${social.label}`}
                      >
                        <SocialIcon id={social.id} className={styles.socialIcon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <nav className={styles.navColumn} aria-label="Links do rodapé">
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

              <a
                href={signupFormUrl}
                className={`${styles.cta} ${styles.linkUnderline}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {communityCtaLabel}
              </a>
            </nav>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <p className={styles.copyright}>
            © {year} PyLadies Floripa. Feito com carinho pelas voluntárias da comunidade.
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
