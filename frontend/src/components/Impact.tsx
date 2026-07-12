import Button from './Button'
import Reveal from './Reveal'
import { communityCtaLabel, signupFormUrl } from '../data/links'
import { getPhotoById } from '../data/photos'
import { REVEAL_COLUMN_DELAY } from '../lib/revealMotion'
import styles from './Impact.module.css'

const impactPhoto = getPhotoById('grupo-escritorio-9')

export default function Impact() {
  return (
    <section className={`section ${styles.impact}`} id="faca-parte">
      <div className={`container ${styles.inner}`}>
        <Reveal variant="up" className={styles.imageReveal}>
          <div className={styles.imageWrapper}>
            <div className={styles.photoFrame}>
              <img
                src={impactPhoto?.file ?? '/photos/grupo-escritorio-9.jpg'}
                alt={impactPhoto?.alt ?? 'Mulheres da PyLadies Floripa em workshop'}
                className={styles.photo}
              />
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={REVEAL_COLUMN_DELAY} className={styles.content}>
          <div className={styles.headingBlock}>
            <p className={styles.label}>Desde 2018</p>
            <h2 className={styles.title}>
              Já realizamos mais de{' '}
              <span className={styles.highlight}>90 atividades por ano</span>,
              com centenas de mulheres participando de workshops, meetups e
              encontros.
            </h2>
          </div>

          <p className={styles.description}>
            Fomos selecionadas para o programa internacional #ChamaAsMina da
            LINUXtips, que deu início à Escola PyLadies Floripa, com capacitações
            técnicas em Python, Linux, Docker, AWS e muito mais.
          </p>

          <Button variant="orange" href={signupFormUrl} size="large">
            {communityCtaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
