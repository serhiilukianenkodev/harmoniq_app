const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function HomePage() {
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to the Phonebook App!</h1>
      </div>
    </>
  );
}
