import React from 'react';

const Login = () => {
  return (
    <div className="login-container" style={styles.container}>
      <h1 className="text-center" style={styles.header}>Login</h1>
      <form style={styles.form}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-danger" style={styles.button}>Login</button>
      </form>
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
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#ff5722',
    padding: '12px 25px',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;
