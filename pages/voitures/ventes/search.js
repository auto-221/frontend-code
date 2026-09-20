import Base from '../../../components/layout/Base';
import { useState } from 'react';
import Link from 'next/link';
import { getAnnonces, STRAPI_URL } from '../../../lib/api';
import { formatPrix, whatsappUrl } from '../../../lib/format';
import { FaMapMarkerAlt, FaWhatsapp, FaTachometerAlt, FaCalendarAlt, FaFilter, FaTimes } from 'react-icons/fa';
import { MARQUES_LIST, MARQUES } from '../../../lib/marques';

const VILLES = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba', 'Mbour', 'Rufisque'];

function buildParams(query) {
  const parts = ['filters[categorie][$eq]=voiture'];
  if (query.marque) parts.push(`filters[voiture][marque][$containsi]=${encodeURIComponent(query.marque)}`);
  if (query.modele) parts.push(`filters[voiture][modele][$containsi]=${encodeURIComponent(query.modele)}`);
  if (query.annee) parts.push(`filters[voiture][annee][$gte]=${query.annee}`);
  if (query.prix) parts.push(`filters[prix][$lte]=${query.prix}`);
  if (query.carburant) parts.push(`filters[voiture][carburant][$eq]=${query.carburant.toLowerCase()}`);
  if (query.transmission) parts.push(`filters[voiture][transmission][$eq]=${query.transmission.toLowerCase()}`);
  if (query.ville) parts.push(`filters[ville][$containsi]=${encodeURIComponent(query.ville)}`);
  parts.push('pagination[limit]=12');
  return parts.join('&');
}

export async function getServerSideProps({ query }) {
  try {
    const data = await getAnnonces(buildParams(query));
    return { props: { initialData: data, query } };
  } catch {
    return { props: { initialData: [], query } };
  }
}

export default function Search({ initialData, query }) {
  const [items, setItems] = useState(initialData);
  const [filters, setFilters] = useState({
    marque: query.marque || '',
    modele: query.modele || '',
    annee: query.annee || '',
    prix: query.prix || '',
    carburant: query.carburant || '',
    transmission: query.transmission || '',
    ville: query.ville || '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modeles, setModeles] = useState(filters.marque ? (MARQUES[filters.marque] || []) : []);

  const handleMarqueChange = (marque) => {
    setFilters((f) => ({ ...f, marque, modele: '' }));
    setModeles(MARQUES[marque] || []);
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const { getAnnonces } = await import('../../../lib/api');
      const data = await getAnnonces(buildParams(filters));
      setItems(data);
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  };

  const clearFilters = async () => {
    const empty = { marque: '', modele: '', annee: '', prix: '', carburant: '', transmission: '', ville: '' };
    setFilters(empty);
    setModeles([]);
    setLoading(true);
    try {
      const { getAnnonces } = await import('../../../lib/api');
      const data = await getAnnonces('filters[categorie][$eq]=voiture&pagination[limit]=12');
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  const hasFilters = Object.values(filters).some(Boolean);
  const selectClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white";

  return (
    <Base>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Voitures à vendre</h1>
            <p className="text-gray-500 text-sm mt-1">{items.length} annonce{items.length !== 1 ? 's' : ''} trouvée{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${hasFilters ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700'}`}
          >
            <FaFilter size={12} />
            Filtres {hasFilters && `(actifs)`}
          </button>
        </div>

        {/* Panneau filtres */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Marque</label>
                <select value={filters.marque} onChange={(e) => handleMarqueChange(e.target.value)} className={selectClass}>
                  <option value="">Toutes</option>
                  {MARQUES_LIST.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Modèle</label>
                <select value={filters.modele} onChange={(e) => setFilters((f) => ({ ...f, modele: e.target.value }))} className={selectClass} disabled={!filters.marque}>
                  <option value="">Tous</option>
                  {modeles.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Année min.</label>
                <select value={filters.annee} onChange={(e) => setFilters((f) => ({ ...f, annee: e.target.value }))} className={selectClass}>
                  <option value="">Toutes</option>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Prix max (FCFA)</label>
                <select value={filters.prix} onChange={(e) => setFilters((f) => ({ ...f, prix: e.target.value }))} className={selectClass}>
                  <option value="">Tous</option>
                  <option value="1000000">1 000 000</option>
                  <option value="2000000">2 000 000</option>
                  <option value="3000000">3 000 000</option>
                  <option value="5000000">5 000 000</option>
                  <option value="10000000">10 000 000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Carburant</label>
                <select value={filters.carburant} onChange={(e) => setFilters((f) => ({ ...f, carburant: e.target.value }))} className={selectClass}>
                  <option value="">Tous</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Transmission</label>
                <select value={filters.transmission} onChange={(e) => setFilters((f) => ({ ...f, transmission: e.target.value }))} className={selectClass}>
                  <option value="">Toutes</option>
                  <option value="manuelle">Manuelle</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ville</label>
                <select value={filters.ville} onChange={(e) => setFilters((f) => ({ ...f, ville: e.target.value }))} className={selectClass}>
                  <option value="">Toutes</option>
                  {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={applyFilters} className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                Appliquer les filtres
              </button>
              {hasFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium text-sm">
                  <FaTimes size={12} /> Effacer
                </button>
              )}
            </div>
          </div>
        )}

        {/* Grille */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucune annonce trouvée.</p>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-4 text-primary font-semibold hover:underline">
                Effacer les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={item.voiture?.images?.[0]?.formats?.thumbnail?.url
                      ? `${STRAPI_URL}${item.voiture.images[0].formats.thumbnail.url}`
                      : item.voiture?.images?.[0]?.url
                      ? `${STRAPI_URL}${item.voiture.images[0].url}`
                      : '/placeholder.jpg'}
                    alt={item.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                  {item.ville && (
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaMapMarkerAlt size={10} /> {item.ville}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {item.voiture?.marque} {item.voiture?.modele} {item.voiture?.annee}
                  </h3>
                  <div className="flex gap-2 text-xs text-gray-500 mb-3">
                    {item.voiture?.kilometrage && (
                      <span className="flex items-center gap-1"><FaTachometerAlt size={10} /> {new Intl.NumberFormat('fr-SN').format(item.voiture.kilometrage)} km</span>
                    )}
                    {item.voiture?.carburant && (
                      <span className="capitalize">{item.voiture.carburant}</span>
                    )}
                  </div>
                  <p className="text-primary font-extrabold text-lg mb-3">{formatPrix(item.prix)}</p>
                  <div className="flex gap-2">
                    <Link href={`/voitures/ventes/${item.documentId}`}>
                      <a className="flex-1 text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                        Voir détails
                      </a>
                    </Link>
                    {item.contact && (
                      <a
                        href={whatsappUrl(item.contact, item.titre)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        title="WhatsApp"
                      >
                        <FaWhatsapp size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Base>
  );
}
