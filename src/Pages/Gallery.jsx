// // src/Pages/HistoryPage.tsx
// import { useEffect, useState } from "react"; 
// import './history.css';

// type Pagne = {
//   _id: string;
//   name: string;
//   origin: string;
//   story: string;
//   evolution: string; 
//   imageUrl?: string;
// };

// export default function HistoryPage() {
//   const [pagnes, setPagnes] = useState<Pagne[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/gallery")
//       .then((res) => res.json())
//       .then((data) => setPagnes(data))
//       .catch((error) => console.error("Erreur fetch pagnes :", error));
//   }, []);

//   return (
//     <div className="history-container">
//       <h1 className="history-title">🧵 Historique des pagnes analysés</h1>
//       <div className="pagne-grid">
//         {pagnes.map((pagne) => (
//           <div className="pagne-card" key={pagne._id}>
//             <h2>{pagne.name}</h2>
//             <p><strong>Origine :</strong> {pagne.origin}</p>
//             <p><strong>Histoire :</strong> {pagne.story}</p>
//             <p><strong>Évolution :</strong> {pagne.evolution}</p>
//             {pagne.imageUrl && <img src={pagne.imageUrl} alt={pagne.name} />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
