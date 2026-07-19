export const Typography = ({ variant = 'body', children, style, ...props }) => {
  const styles = {
    h1: {
      fontSize: 'var(--text-h1)',
      fontWeight: 'var(--weight-extrabold)',
      letterSpacing: '-0.015em',
      lineHeight: 1.04,
      color: 'var(--color-ink)',
    },
    h2: {
      fontSize: 'var(--text-list-title)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-ink)',
    },
    body: {
      fontSize: 'var(--text-body)',
      lineHeight: 1.65,
      color: 'var(--color-muted)',
    },
    caption: {
      fontSize: 'var(--text-small)',
      color: 'var(--color-muted-light)',
    },
  }

  const Tag = variant.startsWith('h') ? variant : 'p'

  return (
    <Tag style={{ ...styles[variant], ...style }} {...props}>
      {children}
    </Tag>
  )
}
