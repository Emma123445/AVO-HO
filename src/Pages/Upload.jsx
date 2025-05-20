import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/Upload.css'; // assure-toi que ce fichier est bien lié
import { FaRobot, FaUser, FaUpload } from 'react-icons/fa';

const Upload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Vérification initiale du token


  const handleUpload = async () => { 
    if (!image) return alert('Veuillez sélectionner une image.');
    setLoading(true);
  
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Réponse : ", response.data);
      alert("Analyse réussie !");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Une erreur inconnue est survenue.";
      console.error("Erreur upload :", errorMessage);
      alert("Erreur : " + errorMessage);
    }
    
  };
  
  

  return (
    <div className="upload-container">
    <div className="chat-box">
      <div className="chat-header">
        <FaRobot style={{ marginRight: '8px' }} />
        AVO-HO AI
      </div>

      <div className="chat-message bot">
        <p>
          <strong>AVO-HO AI</strong> permet de reconnaître et raconter l’histoire d’un pagne africain à partir
          d'une simple image : origine, nom traditionnel, symbolique et évolution dans les pays d'Afrique, notamment au Bénin.
        </p>
      </div>

      <div className="upload-input">
        <label htmlFor="file-input" className="upload-label">
          <FaUpload />
          Choisir une image
        </label> 
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Analyse en cours...' : 'Analyser le pagne'}
        </button>
      </div>

      {result && (
        <div className="chat-message bot result">
          {result.name && (
            <p><strong>Nom africain :</strong> {result.name}</p>
          )}
          {result.origin && (
            <p><strong>Pays d'origine :</strong> {result.origin}</p>
          )}
          {result.story && (
            <p><strong>Histoire :</strong> {result.story}</p>
          )}
          {result.evolution && (
            <p><strong>Évolution :</strong> {result.evolution}</p>
          )}
        </div>
      )}


      {/* {result && (
        <div className="chat-message bot result">
          {result.name && <p><strong>Nom africain :</strong> {result.name}</p>}
          {result.origin && <p><strong>Pays d'origine :</strong> {result.origin}</p>}
          {result.story && <p><strong>Histoire :</strong> {result.story}</p>}
          {result.evolution && <p><strong>Évolution :</strong> {result.evolution}</p>}
        </div>
      )} */}


      <div className="chat-message user">
        <FaUser style={{ marginRight: '5px' }} />
        <p>Vous : {image ? image.name : 'Aucune image sélectionnée'}</p>
      </div>
    </div>
  </div>
  );
};

export default Upload;
