import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Button from '../components/Button'
import NavLinkItem from '../components/NavLinkItem'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import {
  aboutGalleryPhotos,
  aboutPillars,
  aboutProjects,
  aboutStats,
  aboutTimeline,
  joinPaths,
} from '../data/aboutPage'
import { signupFormUrl } from '../data/links'
import { usePageSeo } from '../lib/seo'
import { buildAboutStructuredData } from '../lib/structuredData'
import { REVEAL_COLUMN_DELAY, revealItemDelay } from '../lib/revealMotion'
import styles from './AboutPage.module.css'

const ABOUT_SEO_DESCRIPTION =
  'História, pilares e projetos da PyLadies Floripa. Comunidade de Python para mulheres em Florianópolis desde 2018.'

export default function AboutPage() {
  usePageSeo({
    title: 'Sobre a PyLadies Floripa',
    description: ABOUT_SEO_DESCRIPTION,
    path: '/sobre',
  })

  return (
    <PageLayout>
      <JsonLd id="about" data={buildAboutStructuredData(ABOUT_SEO_DESCRIPTION)} />
      <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <Reveal variant="up" immediate>
            <p className={styles.label}>Sobre nós</p>
            <h1 className={styles.heroTitle}>
              A história da PyLadies em{' '}
              <span className={styles.highlight}>Florianópolis</span>
            </h1>
            <p className={styles.heroLead}>
              Somos o capítulo local do movimento PyLadies, uma rede global de
              mulheres na tecnologia.
            </p>
          </Reveal>

          <Reveal variant="up" delay={REVEAL_COLUMN_DELAY}>
            <ul className={styles.stats}>
              {aboutStats.map((stat) => (
                <li key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.timeline}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.sectionHeader}>
              <p className={styles.label}>Trajetória</p>
              <h2 className={styles.sectionTitle}>Como chegamos até aqui</h2>
              <p className={styles.sectionDescription}>
                Cada encontro, projeto e parceria ajudou a construir o que a
                comunidade é hoje.
              </p>
            </div>
          </Reveal>

          <ol className={styles.timelineList}>
            {aboutTimeline.map((item, index) => (
              <Reveal key={item.year} variant="up" delay={revealItemDelay(index)}>
                <li className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineCard}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineText}>{item.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section ${styles.pillars}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.sectionHeader}>
              <p className={styles.label}>Norteadores</p>
              <h2 className={styles.sectionTitle}>O que nos guia</h2>
            </div>
          </Reveal>

          <div className={styles.pillarsGrid}>
            {aboutPillars.map((pillar, index) => (
              <Reveal key={pillar.title} variant="up" delay={revealItemDelay(index)}>
                <article className={`${styles.pillarCard} interactiveCard`}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarText}>{pillar.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.gallery}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.sectionHeader}>
              <p className={styles.label}>Comunidade</p>
              <h2 className={styles.sectionTitle}>Momentos que marcaram</h2>
              <p className={styles.sectionDescription}>
                Festas, workshops, encontros informais e celebrações fazem parte
                do dia a dia da PyLadies Floripa.
              </p>
            </div>
          </Reveal>

          <div className={styles.galleryGrid}>
            {aboutGalleryPhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                variant="up"
                delay={revealItemDelay(index)}
                className={`${styles.galleryItem} ${styles[`galleryItem${index + 1}`]}`}
              >
                <figure className={styles.galleryFigure}>
                  <img src={photo.src} alt={photo.alt} className={styles.galleryImage} />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.school}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.schoolCard}>
              <p className={styles.schoolLabel}>#ChamaAsMina · LINUXtips</p>
              <h2 className={styles.schoolTitle}>
                Escola PyLadies Floripa
              </h2>
              <p className={styles.schoolText}>
                Fomos selecionadas para o programa internacional #ChamaAsMina da
                LINUXtips, com trilhas em Python, Linux, Docker, AWS e outras
                tecnologias, com foco em formação prática e mentoria.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.join}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.sectionHeader}>
              <p className={styles.label}>Envolvimento</p>
              <h2 className={styles.sectionTitle}>Como entrar na comunidade</h2>
              <p className={styles.sectionDescription}>
                Tem mais de um jeito de participar. Veja qual faz sentido para
                você agora.
              </p>
            </div>
          </Reveal>

          <div className={styles.joinGrid}>
            {joinPaths.map((path, index) => (
              <Reveal key={path.title} variant="up" delay={revealItemDelay(index)}>
                <article className={`${styles.joinCard} interactiveCard`}>
                  <h3 className={styles.joinTitle}>{path.title}</h3>
                  <p className={styles.joinText}>{path.description}</p>
                  <NavLinkItem
                    href={path.href}
                    external={path.external}
                    className={`${styles.joinLink} linkUnderline`}
                  >
                    {path.cta}
                  </NavLinkItem>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.projects}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={styles.sectionHeader}>
              <p className={styles.label}>Iniciativas</p>
              <h2 className={styles.sectionTitle}>Projetos em movimento</h2>
              <p className={styles.sectionDescription}>
                Além dos eventos pontuais, mantemos iniciativas que rodam o ano
                todo para mulheres que querem aprender e colaborar com o grupo.
              </p>
            </div>
          </Reveal>

          <div className={styles.projectsGrid}>
            {aboutProjects.map((project, index) => (
              <Reveal key={project.name} variant="up" delay={revealItemDelay(index)}>
                <article className={`${styles.projectCard} interactiveCard`}>
                  <span className={styles.projectTag}>{project.tag}</span>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <p className={styles.projectText}>{project.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal variant="up">
            <div className={`${styles.ctaCard} interactiveCard`}>
              <h2 className={styles.ctaTitle}>Quer participar?</h2>
              <p className={styles.ctaText}>
                Veja os próximos encontros ou cadastre-se para receber novidades e
                convites por e-mail.
              </p>
              <div className={styles.ctaActions}>
                <Button variant="orange" href={signupFormUrl} size="large">
                  Entrar na comunidade
                </Button>
                <Link to="/eventos" className={`${styles.ctaSecondary} linkUnderline`}>
                  Ver próximos eventos
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </PageLayout>
  )
}
