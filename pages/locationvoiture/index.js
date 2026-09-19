import Base from "../../components/layout/Base";
import Link from "next/link";

import { getAnnonces, STRAPI_URL } from "../../lib/api";

export async function getStaticProps() {
  try {
    const data = await getAnnonces("filters[categorie]=voiture");
    return { props: { data }, revalidate: 3600 };
  } catch (error) {
    console.error("Error fetching rental cars:", error);
    return { props: { data: [] }, revalidate: 60 };
  }
}

const Locationvoiture = ({ data }) => {
  const api = STRAPI_URL;

  if (!data || data.length === 0) {
    return (
      <Base>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Voitures a louer
          </h1>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucune voiture disponible pour le moment
            </p>
          </div>
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Voitures a louer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={
                    api +
                    post.voiture?.photo1?.[0]?.formats?.thumbnail?.url
                  }
                  alt={post.description}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Nouveau
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 space-y-2">
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.description}
                  </span>
                  <span className="ml-2 inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.voiture?.annee}
                  </span>
                </div>

                <div className="mb-4 space-y-2">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.voiture?.transmission}
                  </span>
                  <span className="ml-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.voiture?.carburant}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">
                    {post.prix?.toFixed(2)} DA
                  </div>
                </div>

                <button className="mt-4 block w-full text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 rounded-lg transition-colors">
                  Louer maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Locationvoiture;
