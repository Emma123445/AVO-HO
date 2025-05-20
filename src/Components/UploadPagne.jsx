import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPagne = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(response.data.analysis);
    } catch (err) {
      alert('Erreur lors de l’upload ou token invalide');
      navigate('/login');
    }
  };

  return (
    <div>
      <h2>Découvrez l’histoire de votre pagne</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button type="submit">Envoyer</button>
      </form>
      {result && (
        <div className="result">
          <h3>Analyse :</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPagne;
