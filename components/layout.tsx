import Link from 'next/link'
import React from 'react'
import styles from './layout.module.css'

export interface LayoutProps {
  children: React.ReactNode
  extraTitle?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, extraTitle }) => (
  <>
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>
          <Link href="/">
            <a>GitHub Explorer</a>
          </Link>{' '}
          {extraTitle && (
            <>
              <span className={styles.extraTitle} aria-hidden="true">
                &gt;
              </span>{' '}
              <span className={styles.extraTitle}>{extraTitle}</span>
            </>
          )}
        </h1>
      </div>
    </header>
    <main className={styles.main}>
      <div className={styles.content}>{children}</div>
    </main>
  </>
)
