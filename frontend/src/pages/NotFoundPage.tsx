import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Button from '../components/Button'
import { usePageSeo } from '../lib/seo'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  usePageSeo({
    title: 'Página não encontrada',
    description:
      'Página não encontrada no site da PyLadies Floripa. Volte ao início ou confira nossos eventos.',
    path: '/404',
    noindex: true,
  })

  return (
    <PageLayout>
      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Página não encontrada</h1>
          <p className={styles.text}>
            O endereço pode estar incorreto ou a página foi movida. Volte para o
            início ou veja a agenda de eventos.
          </p>
          <div className={styles.actions}>
            <Button href="/" variant="teal">
              Ir para o início
            </Button>
            <Link to="/eventos" className={styles.link}>
              Ver eventos
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
