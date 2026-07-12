import Reveal from './Reveal'
import styles from './Activities.module.css'
import { revealItemDelay } from '../lib/revealMotion'

const activities = [
  { icon: '/assets/icon-meetups.svg', title: 'Meetups presenciais e online' },
  { icon: '/assets/icon-book.svg', title: 'Clube do Livro (PyBook)' },
  { icon: '/assets/icon-english.svg', title: 'Aulas de conversação em inglês' },
  { icon: '/assets/icon-code.svg', title: 'Oficinas, workshops e encontros hands-on' },
  { icon: '/assets/icon-talks.svg', title: 'Palestras com profissionais da área' },
  { icon: '/assets/icon-mentoring.svg', title: 'Grupos de estudo e mentorias' },
  { icon: '/assets/icon-events.svg', title: 'Participação em conferências e eventos tech' },
  { icon: '/assets/icon-bar.svg', title: 'Confraternizações como o PyLadies Bar' },
]

export default function Activities() {
  return (
    <section className={`section ${styles.activities}`}>
      <div className="container">
        <Reveal variant="up">
          <div className={styles.header}>
            <h2 className={styles.title}>O que a gente faz?</h2>
            <p className={styles.description}>
              Na PyLadies Floripa, mulheres encontram um lugar para aprender Python,
              trocar experiências e se conhecer.
            </p>
            <p className={styles.subtitle}>Nossas atividades incluem:</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {activities.map((activity, activityIndex) => (
            <Reveal
              key={activity.title}
              variant="up"
              delay={revealItemDelay(activityIndex)}
              className={styles.gridItem}
            >
              <article className={`${styles.card} interactiveCard`}>
                <img src={activity.icon} alt="" className={styles.icon} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{activity.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
