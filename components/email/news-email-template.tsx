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
  summary: string
  date: string
  content: string
  unsubscribeUrl: string
}

export function NewsEmailTemplate({
  title,
  summary,
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
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body
        style={{
          backgroundColor: '#f4f4f5',
          fontFamily: "'Inter', Helvetica, Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: '#18181b',
              padding: '28px 32px',
              textAlign: 'center' as const,
            }}
          >
            <Text
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Arnold Moya
            </Text>
            <Text
              style={{
                fontSize: '12px',
                color: '#a1a1aa',
                margin: '4px 0 0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}
            >
              Newsletter
            </Text>
          </Section>

          {/* Date bar */}
          <Section
            style={{
              backgroundColor: '#ffffff',
              padding: '14px 32px',
              borderBottom: '1px solid #e4e4e7',
            }}
          >
            <Text
              style={{
                fontSize: '12px',
                color: '#71717a',
                margin: 0,
                textAlign: 'right' as const,
              }}
            >
              {date}
            </Text>
          </Section>

          {/* Title + Summary */}
          <Section
            style={{
              backgroundColor: '#ffffff',
              padding: '32px 32px 28px',
            }}
          >
            <Heading
              as="h1"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#18181b',
                lineHeight: '1.3',
                margin: 0,
              }}
            >
              {title}
            </Heading>
            {summary && (
              <Text
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#52525b',
                  margin: '16px 0 0',
                }}
              >
                {summary}
              </Text>
            )}
          </Section>

          <Section style={{ backgroundColor: '#ffffff', padding: '0 32px' }}>
            <Hr style={{ borderColor: '#e4e4e7', margin: 0 }} />
          </Section>

          {/* Content */}
          <Section style={{ backgroundColor: '#ffffff', padding: '24px 32px 32px' }}>
            <div
              style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#3f3f46',
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#fafafa',
              borderTop: '1px solid #e4e4e7',
              padding: '24px 32px',
              textAlign: 'center' as const,
            }}
          >
            <Text
              style={{
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#a1a1aa',
                margin: 0,
              }}
            >
              Recibiste este correo porque est&aacute;s suscrito al bolet&iacute;n de arnoldmoya.com
            </Text>
            <Link
              href={unsubscribeUrl}
              style={{
                fontSize: '12px',
                color: '#71717a',
                textDecoration: 'underline',
                marginTop: '8px',
                display: 'inline-block',
              }}
            >
              Cancelar suscripci&oacute;n
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
