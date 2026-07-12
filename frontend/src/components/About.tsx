import Reveal from './Reveal'
import LogoMark from './LogoMark'
import { getPhotoById } from '../data/photos'
import { REVEAL_COLUMN_DELAY } from '../lib/revealMotion'
import styles from './About.module.css'

const aboutPhoto = getPhotoById('grupo-sala-branca-21')

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="sobre">
      <div className={`container ${styles.inner}`}>
        <Reveal variant="up" className={styles.content}>
          <div className={styles.headingBlock}>
            <p className={styles.label}>Quem somos</p>
            <h2 className={styles.title}>
              Diversidade, <span className={styles.highlight}>inclusão</span> e{' '}
              <span className={styles.highlight}>protagonismo feminino</span>
            </h2>
            <p className={styles.lead}>
              Promovemos esses valores por meio de eventos, oficinas, mentorias e
              iniciativas ao longo do ano em Florianópolis.
            </p>
          </div>

          <div className={styles.values}>
            <p className={styles.valuesIntro}>Somos guiadas por:</p>
            <ul>
              <li>
                <strong>Missão:</strong> Empoderar mulheres por meio da tecnologia
                e do compartilhamento de conhecimento.
              </li>
              <li>
                <strong>Visão:</strong> Ser referência em formação e acolhimento
                de mulheres em programação em Florianópolis.
              </li>
              <li>
                <strong>Valores:</strong> Diversidade, sororidade, acolhimento,
                educação aberta, acessibilidade e protagonismo feminino.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal variant="up" delay={REVEAL_COLUMN_DELAY} className={styles.imageReveal}>
          <div className={styles.imageWrapper}>
            <div className={styles.photoFrame}>
              <img
                src={aboutPhoto?.file ?? '/photos/grupo-sala-branca-21.jpg'}
                alt={aboutPhoto?.alt ?? 'Mulheres da PyLadies Floripa reunidas'}
                className={styles.photo}
              />
            </div>
            <div className={`${styles.floatingPython} ${styles.floatBadge}`} aria-hidden="true">
              <img src="/assets/python-icon.svg" alt="" />
            </div>
            <div className={`${styles.floatingLogo} ${styles.floatBadge}`} aria-hidden="true">
              <LogoMark size={79} contained />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
