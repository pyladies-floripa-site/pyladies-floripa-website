// src/components/Partners.tsx
import Reveal from './Reveal'
import { partnersData } from '../data/partners'
import  Separator from './Separator'
import styles from './Partners.module.css'

export default function Partners() {
  if (!partnersData.length) return null

  return (
    <section className={`section ${styles.partners}`} id="parceiros">
      <div className={`container ${styles.inner}`}>
        <Reveal variant="up">
          <header className={styles.headingBlock}>
            <p className={styles.label}>Apoio & Parcerias</p>
            <h2 className={styles.title}>Quem constrói junto com a gente</h2>
          </header>
        </Reveal>

        <Reveal variant="up">
          <div className={styles.grid}>
            {partnersData.map((partner) => (
              <a
                key={partner.id}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                aria-label={`Visitar site oficial da empresa ${partner.name}`}
              >
                <img
                  src={partner.logoUrl}
                  alt={`Logo da ${partner.name}`}
                  className={`${styles.logo} ${partner.invertColors ? styles.inverted : ''}`}
                  loading="lazy"
                  decoding="async"
                />
                
                  <div className={styles.cardFooter}>
                    <span className={styles.partnerName}>{partner.name}</span>
                    <Separator />
                  </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}