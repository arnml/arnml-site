import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Hr,
  Font,
} from '@react-email/components'

interface NewsEmailTemplateProps {
  title: string
  date: string
  content: string
  unsubscribeUrl: string
}

export function NewsEmailTemplate({
  title,
  date,
  content,
  unsubscribeUrl,
}: Readonly<NewsEmailTemplateProps>) {
  return (
    <Html lang="es">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="JetBrains Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body
        style={{
          backgroundColor: '#000000',
          fontFamily: "'Inter', Helvetica, Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '24px',
          }}
        >
          <Section
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: '#0e121a',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
            }}
          >
            <Section
              style={{
                backgroundColor: 'rgba(10, 13, 20, 0.9)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px 18px',
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: '0',
                  lineHeight: 0,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '999px',
                    backgroundColor: '#ff5f56',
                    boxShadow: '0 0 8px rgba(255, 95, 86, 0.35)',
                    marginRight: '8px',
                  }}
                />
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '999px',
                    backgroundColor: '#ffbd2e',
                    boxShadow: '0 0 8px rgba(255, 189, 46, 0.35)',
                    marginRight: '8px',
                  }}
                />
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '999px',
                    backgroundColor: '#27c93f',
                    boxShadow: '0 0 8px rgba(39, 201, 63, 0.35)',
                  }}
                />
              </Text>
            </Section>

            <Section style={{ padding: '32px 32px 12px' }}>
              <Text
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#9ca3af',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Últimas noticias
              </Text>
              <Text
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#a1a1aa',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: '12px 0 0',
                }}
              >
                {date}
              </Text>
              <Heading
                as="h1"
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#f8fafc',
                  lineHeight: '1.3',
                  margin: '14px 0 0',
                }}
              >
                {title}
              </Heading>
            </Section>

            <Section style={{ padding: '0 32px' }}>
              <Hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: 0 }} />
            </Section>

            <Section style={{ padding: '20px 32px 0' }}>
              <div
                style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#e2e8f0',
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Section>

            <Section style={{ padding: '28px 32px 0' }}>
              <Hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: 0 }} />
            </Section>

            <Section style={{ padding: '18px 32px 32px' }}>
              <Text
                style={{
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: '#9ca3af',
                  margin: 0,
                }}
              >
                Recibiste este correo porque estás suscrito al boletín de
                arnoldmoya.com
              </Text>
              <Link
                href={unsubscribeUrl}
                style={{
                  fontSize: '12px',
                  color: '#cbd5f5',
                  marginTop: '8px',
                  display: 'inline-block',
                }}
              >
                Cancelar suscripción
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
