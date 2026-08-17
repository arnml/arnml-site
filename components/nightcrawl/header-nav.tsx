'use client'

import type { View } from '@/lib/nightcrawl/types'
import type { NavItemVM } from './vm-types'

interface HeaderNavProps {
  crawlName: string
  city: string
  hojeTxt: string
  navItems: NavItemVM[]
  onNav: (v: View) => void
  onNovoParceiro: () => void
}

export function HeaderNav({ crawlName, city, hojeTxt, navItems, onNav, onNovoParceiro }: HeaderNavProps) {
  return (
    <>
      <header
        className="nc-pad nc-head"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 30,
          paddingTop: 30,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--nc-color-accent-700)',
            }}
          >
            Mesa de parcerias
          </div>
          <div
            className="nc-big"
            style={{
              fontFamily: 'var(--nc-font-heading)',
              fontWeight: 600,
              fontSize: 40,
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              marginTop: 4,
            }}
          >
            {crawlName}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--nc-color-neutral-700)', paddingBottom: 10 }}>
          <div>{city}</div>
          <div>{hojeTxt}</div>
        </div>
      </header>

      <div className="nc-pad" style={{ paddingTop: 20, borderBottom: '1px solid var(--nc-color-divider)' }} />

      <nav className="nc-pad nc-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 14 }}>
        <div className="nc-row" style={{ display: 'flex', gap: 22 }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNav(item.key as View)}
              style={{
                background: 'none',
                border: 0,
                padding: '0 0 8px',
                cursor: 'pointer',
                fontSize: 15,
                borderBottom: item.active ? '2px solid var(--nc-color-accent)' : '2px solid transparent',
                color: item.active ? 'var(--nc-color-text)' : 'var(--nc-color-neutral-700)',
              }}
            >
              {item.label}
              {item.badge ? (
                <span style={{ marginLeft: 7, fontSize: 12, color: 'var(--nc-color-accent-2-700)' }}>{item.badge}</span>
              ) : null}
            </button>
          ))}
        </div>
        <button className="nc-btn nc-btn-primary" onClick={onNovoParceiro} style={{ marginBottom: 8 }}>
          + Novo parceiro
        </button>
      </nav>
    </>
  )
}
