import Base from "../../components/layout/Base";
import { useState, useEffect } from "react";

import { getAnnonces, STRAPI_URL } from "../../lib/api";

export async function getServerSideProps() {
  try {
    const data = await getAnnonces();
    return { props: { data } };
  } catch {
    return { props: { data: [] } };
  }
}

export default function Result({ data }) {
  const api = STRAPI_URL;
  const [items, setItems] = useState(data);

  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resultats de recherche</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun resultat</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src={api + item.voiture?.photo1?.[0]?.formats?.thumbnail?.url} alt={item.description} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.voiture?.annee}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{item.prix?.toFixed(2)} DA</span>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-semibold py-2 rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Base>
  );
}
