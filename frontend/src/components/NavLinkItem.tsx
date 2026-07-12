import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavLinkItemProps {
  href: string
  external?: boolean
  className: string
  children: ReactNode
  onNavigate?: () => void
}

export default function NavLinkItem({
  href,
  external = false,
  className,
  children,
  onNavigate,
}: NavLinkItemProps) {
  const location = useLocation()
  const isActive = !external && location.pathname === href

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onNavigate}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={href}
      className={className}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  )
}
