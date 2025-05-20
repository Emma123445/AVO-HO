import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Inscription réussie !');
      navigate('/upload'); // redirection directe
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Erreur lors de l'inscription.";
      alert(`${errorMsg}`);
      console.error('Erreur inscription :', error);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      alert('Connexion réussie !');
      navigate('/upload'); // redirection directe upload
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erreur lors de la connexion.';
      alert(`${errorMsg}`);
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <div className="logInSignUp">
      <div className="logInSignUp-container">
        <h1>{isLoginMode ? 'Connexion' : 'Inscription'}</h1>
        <div className="logInSignUp-fields">
          {!isLoginMode && (
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={isLoginMode ? handleLogin : handleSignUp}>
          {isLoginMode ? 'Se connecter' : "S'inscrire"}
        </button>
        <p className="logInSignUp-login">
          {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
          <span onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "S'inscrire ici" : 'Se connecter ici'}
          </span>
        </p>
        {!isLoginMode && (
          <div className="logInSignUp-agree">
            <input type="checkbox" required />
            <p>
              En continuant, j'accepte les conditions d'utilisation & la
              politique de confidentialité.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
