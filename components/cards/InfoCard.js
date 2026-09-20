import Link from "next/link";
import { FaInfo, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { STRAPI_URL } from "../../lib/api";
import { formatPrix, whatsappUrl } from "../../lib/format";

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

            {vente.ville && (
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-primary" size={10} /> {vente.ville}
              </p>
            )}
            <div className="flex gap-2 text-xs text-gray-500 mb-3">
              {vente.voiture?.carburant && <span className="capitalize">{vente.voiture.carburant}</span>}
              {vente.voiture?.annee && <span>· {vente.voiture.annee}</span>}
            </div>
            <p className="text-primary font-extrabold text-lg mb-4">{formatPrix(vente.prix)}</p>

            <div className="flex gap-2">
              <Link href={`/voitures/ventes/${vente.documentId}`}>
                <a className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm">
                  <FaInfo size={14} /> Détails
                </a>
              </Link>
              {vente.contact && (
                <a href={whatsappUrl(vente.contact, vente.titre)} target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors" title="WhatsApp">
                  <FaWhatsapp size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfoCard;
