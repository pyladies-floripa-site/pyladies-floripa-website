import Button from './Button'
import PhotoStack from './PhotoStack'
import Reveal from './Reveal'
import { communityCtaLabel, signupFormUrl } from '../data/links'
import { heroPhotos } from '../data/heroPhotos'
import { REVEAL_HERO_SECOND_DELAY } from '../lib/revealMotion'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={`container ${styles.inner}`}>
        <Reveal variant="up" immediate className={styles.content}>
          <div className={styles.socialProof}>
            <div className={styles.avatars} aria-hidden="true">
              <img src="/assets/avatar-1.png" alt="" />
              <img src="/assets/avatar-2.png" alt="" />
              <img src="/assets/avatar-3.png" alt="" />
            </div>
            <p className={styles.socialText}>+200 mulheres na comunidade</p>
          </div>

          <div className={styles.textBlock}>
            <h1 className={styles.title}>
              Comunidade de{' '}
              <span className={styles.highlight}>mulheres em Python</span> em
              Florianópolis
            </h1>
            <p className={styles.subtitle}>
              Somos o capítulo local do movimento PyLadies. Organizamos encontros,
              workshops e apoiamos mulheres que querem aprender Python e trabalhar
              com tecnologia.
            </p>
            <Button href={signupFormUrl} size="large" className={styles.cta}>
              {communityCtaLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal
          variant="up"
          immediate
          delay={REVEAL_HERO_SECOND_DELAY}
          className={styles.photosReveal}
        >
          <PhotoStack photos={heroPhotos} />
        </Reveal>
      </div>
    </section>
  )
}
