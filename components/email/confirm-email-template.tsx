import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Font,
} from '@react-email/components'

interface ConfirmEmailTemplateProps {
  confirmUrl: string
}

export function ConfirmEmailTemplate({
  confirmUrl,
}: Readonly<ConfirmEmailTemplateProps>) {
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
            url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap',
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

            <Section style={{ padding: '36px 32px 40px' }}>
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
                Suscríbete a mi boletín
              </Text>

              <Text
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#f8fafc',
                  lineHeight: '1.3',
                  margin: '22px 0 0',
                }}
              >
                Confirma tu correo electrónico
              </Text>

              <Text
                style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#d1d5db',
                  margin: '16px 0 0',
                }}
              >
                Haz clic en el botón de abajo para confirmar tu dirección de correo
                electrónico y activar tu suscripción al boletín.
              </Text>

              <Section style={{ margin: '24px 0 0' }}>
                <Button
                  href={confirmUrl}
                  style={{
                    backgroundColor: '#0a0d14',
                    borderRadius: '999px',
                    padding: '12px 26px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#f8fafc',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                    display: 'inline-block',
                  }}
                >
                  Confirmar correo electrónico
                </Button>
              </Section>

              <Text
                style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#9ca3af',
                  margin: '22px 0 0',
                }}
              >
                Si el botón no funciona, copia y pega este enlace en tu navegador:
              </Text>
              <Text
                style={{
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: '#cbd5f5',
                  margin: '6px 0 0',
                  wordBreak: 'break-all',
                }}
              >
                {confirmUrl}
              </Text>

              <Hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: '28px 0 0' }} />

              <Text
                style={{
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: '#9ca3af',
                  margin: '18px 0 0',
                }}
              >
                Si no solicitaste esta suscripción, puedes ignorar este mensaje.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
