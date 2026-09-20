import { useState } from 'react';
import Base from '../../../components/layout/Base';
import { FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaTachometerAlt, FaGasPump, FaCog, FaCalendarAlt, FaTag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getAnnonce, STRAPI_URL } from '../../../lib/api';
import { formatPrix, formatKm, whatsappUrl } from '../../../lib/format';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  try {
    const data = await getAnnonce(params.id);
    if (!data) return { notFound: true };
    return { props: { data } };
  } catch {
    return { notFound: true };
  }
}

export default function AnnonceDetail({ data }) {
  const images = data.voiture?.images || data.images || [];
  const [currentImg, setCurrentImg] = useState(0);

  const voiture = data.voiture || {};
  const contact = data.contact;
  const waUrl = whatsappUrl(contact, data.titre);

  const prevImg = () => setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setCurrentImg((i) => (i === images.length - 1 ? 0 : i + 1));

  const getImgSrc = (img) => img?.url ? `${STRAPI_URL}${img.url}` : '/placeholder.jpg';

  const specs = [
    { icon: <FaCalendarAlt />, label: 'Année', value: voiture.annee },
    { icon: <FaTachometerAlt />, label: 'Kilométrage', value: formatKm(voiture.kilometrage) },
    { icon: <FaGasPump />, label: 'Carburant', value: voiture.carburant ? voiture.carburant.charAt(0).toUpperCase() + voiture.carburant.slice(1) : null },
    { icon: <FaCog />, label: 'Transmission', value: voiture.transmission ? voiture.transmission.charAt(0).toUpperCase() + voiture.transmission.slice(1) : null },
    { icon: <FaTag />, label: 'Couleur', value: voiture.couleur },
    { icon: <FaMapMarkerAlt />, label: 'Ville', value: data.ville },
  ].filter((s) => s.value);

  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/"><a className="hover:text-primary">Accueil</a></Link>
          <span className="mx-2">/</span>
          <Link href="/voitures/ventes/search"><a className="hover:text-primary">Voitures</a></Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{data.titre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Galerie images */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-80 md:h-[460px]">
              <img
                src={images.length > 0 ? getImgSrc(images[currentImg]) : '/placeholder.jpg'}
                alt={data.titre}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = '/placeholder.jpg')}
              />
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors">
                    <FaChevronLeft />
                  </button>
                  <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors">
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImg(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentImg ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
              {/* Badge statut */}
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {data.statut === 'actif' ? 'Disponible' : data.statut}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImg(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === currentImg ? 'border-primary' : 'border-transparent'}`}>
                    <img src={getImgSrc(img)} alt="" className="w-full h-full object-cover" onError={(e) => (e.target.src = '/placeholder.jpg')} />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{data.description || 'Aucune description fournie.'}</p>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="text-primary text-lg">{spec.icon}</span>
                    <div>
                      <p className="text-xs text-gray-500">{spec.label}</p>
                      <p className="font-semibold text-gray-900 text-sm">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Prix + titre */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {voiture.marque} {voiture.modele} {voiture.annee}
              </h1>
              {data.ville && (
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <FaMapMarkerAlt className="text-primary" /> {data.ville}
                </p>
              )}
              <p className="text-3xl font-extrabold text-primary mb-1">{formatPrix(data.prix)}</p>
            </div>

            {/* Contact vendeur */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h2 className="font-bold text-gray-900">Contacter le vendeur</h2>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  <FaWhatsapp size={22} />
                  Contacter sur WhatsApp
                </a>
              )}

              {contact && (
                <a
                  href={`tel:${contact}`}
                  className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-semibold py-3.5 rounded-xl transition-colors"
                >
                  <FaPhoneAlt size={16} />
                  {contact}
                </a>
              )}

              {!contact && (
                <p className="text-gray-500 text-sm text-center">Contact non renseigné</p>
              )}
            </div>

            {/* Sécurité */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-800 font-medium mb-1">Conseils de sécurité</p>
              <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                <li>Visitez le véhicule avant tout paiement</li>
                <li>Vérifiez les documents du véhicule</li>
                <li>N'envoyez jamais d'argent à l'avance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
