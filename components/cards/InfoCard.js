import Link from "next/link";
import { FaInfo } from "react-icons/fa";
import { STRAPI_URL } from "../../lib/api";

function InfoCard({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
      {data.map((vente) => (
        <div
          key={vente.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
        >
          <div className="relative h-64 bg-gray-200">
            <img
              src={vente.voiture?.images?.[0]?.formats?.thumbnail?.url
                ? `${STRAPI_URL}${vente.voiture.images[0].formats.thumbnail.url}`
                : "/placeholder.jpg"}
              alt={vente.titre}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Nouveau
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {vente.voiture?.marque} {vente.voiture?.modele}
            </h3>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Prix:</span> {vente.prix?.toFixed(2)} DA
              </p>
              <p>
                <span className="font-medium text-gray-900">Carburant:</span> {vente.voiture?.carburant}
              </p>
              <p>
                <span className="font-medium text-gray-900">Transmission:</span> {vente.voiture?.transmission}
              </p>
            </div>

            <Link href={`/voitures/ventes/${vente.documentId}`}>
              <a className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                <FaInfo size={16} />
                Details
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoCard;
