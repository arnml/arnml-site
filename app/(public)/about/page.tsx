import type { Metadata } from 'next'
import Link from 'next/link'
import { HomeSubscribeForm } from '@/components/home-subscribe-form'
import styles from '@/app/(public)/news/[slug]/page.module.css'

export const metadata: Metadata = {
  title: 'Sobre mí - Arnold Moya',
  description:
    'Developer enfocado en inteligencia artificial, software y startups. Actualmente estudiando Master en Ingeniería de Computadores en USP, Brasil.',
}

export default function AboutPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arnold Moya',
    url: 'https://arnoldmoya.com',
    jobTitle: 'Software Developer',
    email: 'dev.arn.ml@gmail.com',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Software Development',
      'Python',
      'C#',
      'JavaScript',
      'React',
      'Next.js',
      'AWS',
      'Cloud Computing',
      'Startups',
      'AI Agents',
      'Generative AI',
      'LLM Fine-tuning',
    ],
    sameAs: [
      'https://linkedin.com/in/arnoldmoya', // Update with actual LinkedIn
      'https://github.com/arnml',
      'https://arnml.substack.com',
    ],
    affiliation: {
      '@type': 'EducationalOrganization',
      name: 'USP PPGEE',
      url: 'https://www.usp.br',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold">Sobre mí</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <div>
            <h2>Quién soy</h2>
            <p>
              Me llamo <strong>Arnold Moya</strong>, soy Software Developer con expertise en
              inteligencia artificial, desarrollo de software y el ecosistema de startups.
            </p>
            <p>
              Actualmente trabajo en{' '}
              <strong>VISIONTECH CONSULTING</strong> (Nova Scotia, Canadá) desde junio 2022,
              desarrollando sistemas avanzados de validación de identidad con IA y facial
              recognition. También estoy cursando una <strong>Maestría en Ingeniería de Computadores</strong> en la USP (Brasil).
            </p>
          </div>

          <div>
            <h2>¿Por qué este newsletter?</h2>
            <p>
              Creo que hay mucho ruido en internet sobre IA y startups, pero poco contenido
              curado y enfocado. Mi propósito con este newsletter es:
            </p>
            <ul>
              <li>
                <strong>Compartir tendencias reales</strong> en IA, no hype
              </li>
              <li>
                <strong>Analizar herramientas</strong> que realmente son útiles para developers
              </li>
              <li>
                <strong>Entender el ecosistema de startups</strong> desde una perspectiva técnica
              </li>
              <li>
                <strong>Conectar conceptos</strong> entre IA, software y business
              </li>
            </ul>
          </div>

          <div>
            <h2>Mi expertise</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold">Software Development</h3>
                <ul className="space-y-1 text-sm">
                  <li>Python, C#, C++, JavaScript</li>
                  <li>React, Next.js</li>
                  <li>FastAPI, ASP.NET Core</li>
                  <li>PostgreSQL, MySQL, BigQuery</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">AI & Machine Learning</h3>
                <ul className="space-y-1 text-sm">
                  <li>Deep Learning & NLP</li>
                  <li>LLM Fine-tuning</li>
                  <li>AI Agents & Automation</li>
                  <li>Computer Vision</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Cloud & DevOps</h3>
                <ul className="space-y-1 text-sm">
                  <li>AWS (EC2, Lambda, S3, RDS, SageMaker)</li>
                  <li>Google Cloud</li>
                  <li>Docker, Terraform</li>
                  <li>CI/CD (GitHub Actions)</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Languages</h3>
                <ul className="space-y-1 text-sm">
                  <li>🇺🇸 English (Fluent)</li>
                  <li>🇪🇸 Spanish (Native)</li>
                  <li>🇧🇷 Portuguese (Intermediate)</li>
                  <li>🇫🇷 French (Basic)</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2>Publicaciones</h2>
            <p>
              Tengo dos publicaciones peer-reviewed en conferencias de NLP y procesamiento de
              lenguaje natural:
            </p>
            <ul className="space-y-2">
              <li>
                <strong>PROPOR 2024:</strong> &quot;From Random to Informed Data Selection: A
                Diversity-Based Approach to Optimize Human Annotation and Few-Shot Learning&quot;
                <br />
                <Link
                  href="https://aclanthology.org/2024.propor-1.50.pdf"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver publicación →
                </Link>
              </li>
              <li>
                <strong>STIL 2024:</strong> &quot;No Argument Left Behind: Overlapping Chunks for
                Faster Processing of Arbitrarily Long Legal Texts&quot;
                <br />
                <Link
                  href="https://arxiv.org/abs/2410.19184"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en arXiv →
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe Section - Same style as news detail page */}
          <div className={styles.subscribeButtonArea}>
            <p className={styles.footerText}>
              Suscríbete a mi boletín para recibir más contenido sobre IA, software y startups
            </p>
            <HomeSubscribeForm buttonText="Suscríbete gratis" />
          </div>
        </div>
      </div>
    </>
  )
}
