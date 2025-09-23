export default function WorkInProgress() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Work in progress</h1>
        <p style={styles.subtitle}>We're building something awesome — come back soon!</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #f7f7fb 0%, #ffffff 100%)',
    margin: 0,
    fontFamily: "Inter, Roboto, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial",
  },
  card: {
    textAlign: 'center',
    padding: '40px 32px',
    borderRadius: 12,
    boxShadow: '0 8px 30px rgba(20,20,40,0.06)',
    background: '#fff',
    maxWidth: 520,
  },
  title: {
    margin: 0,
    fontSize: '1.9rem',
    letterSpacing: '-0.02em',
    color: '#111827',
  },
  subtitle: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: '1rem',
  },
};
