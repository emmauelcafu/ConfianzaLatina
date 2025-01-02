import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container" style={styles.container}>
      <h1 className="text-center" style={styles.header}>Welcome Confianza Latina</h1>
      <p className="text-center" style={styles.paragraph}>This is a platform for modern web applications</p>
      <div className="text-center">
        <Link to="/login">
          <button className="btn btn-danger" style={styles.button}>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f1f1f1',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#007bff',
    fontSize: '3rem',
  },
  paragraph: {
    color: '#333',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#ff5722',
    padding: '12px 25px',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
