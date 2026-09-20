import Base from "../../components/layout/Base";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

export async function getServerSideProps({ req, res }) {
  try {
    const { getAnnonces } = await import("../../lib/api");
    const data = await getAnnonces();
    return { props: { data } };
  } catch {
    return { props: { data: [] } };
  }
}

export default function Parking({ data }) {
  const [annonces, setAnnonces] = useState(data);

  const handleDelete = (id) => {
    setAnnonces(annonces.filter((a) => a.id !== id));
  };

  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Parking</h1>
          <Link href="/voitures/ventes/publish">
            <a className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg">
              Ajouter voiture
            </a>
          </Link>
        </div>

        {annonces.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">Aucune annonce</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Voiture</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Prix</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {annonces.map((annonce) => (
                  <tr key={annonce.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{annonce.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{annonce.prix?.toFixed(2)} DA</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(annonce.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link href={`/voitures/${annonce.documentId}`}>
                        <a className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <FaEdit /> Editer
                        </a>
                      </Link>
                      <button onClick={() => handleDelete(annonce.id)} className="inline-flex items-center gap-1 text-red-600 hover:text-red-800">
                        <FaTrash /> Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Base>
  );
}
