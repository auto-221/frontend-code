import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Base from '../../components/layout/Base';
import { useRouter } from 'next/router';
import { createAnnonce } from '../../lib/api';
import { MARQUES, MARQUES_LIST } from '../../lib/marques';
import { FaSpinner, FaLock } from 'react-icons/fa';
import Link from 'next/link';

const schema = yup.object().shape({
  prix: yup.number().typeError('Prix invalide').required('Prix obligatoire').positive('Prix doit être positif'),
  description: yup.string().required('Description obligatoire'),
  ville: yup.string().required('Ville obligatoire'),
  contact: yup.string().required('Contact obligatoire'),
});

const VILLES = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba', 'Mbour', 'Rufisque', 'Diourbel', 'Tambacounda', 'Kolda', 'Fatick', 'Louga', 'Matam', 'Kédougou', 'Sédhiou', 'Kaffrine', 'Pikine', 'Guédiawaye', 'Autre'];

export default function Annonces() {
  const [activeTab, setActiveTab] = useState('vente');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [selectedMarque, setSelectedMarque] = useState('');
  const [modeles, setModeles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  useEffect(() => {
    if (selectedMarque && MARQUES[selectedMarque]) {
      setModeles(MARQUES[selectedMarque]);
    } else {
      setModeles([]);
    }
  }, [selectedMarque]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await createAnnonce({
        ...data,
        categorie: activeTab === 'vente' ? 'voiture' : 'voiture',
        statut: 'actif',
      }, token);
      router.push('/voitures/ventes/search');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm";
  const selectClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  // Page de chargement
  if (isAuth === null) return null;

  // Non connecté
  if (!isAuth) {
    return (
      <Base>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaLock className="text-primary text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Connexion requise</h2>
            <p className="text-gray-600 mb-8">
              Vous devez être connecté pour publier une annonce sur Auto221.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <a className="block w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors text-center">
                  Se connecter
                </a>
              </Link>
              <Link href="/register">
                <a className="block w-full border border-primary text-primary hover:bg-primary/5 font-semibold py-3 rounded-lg transition-colors text-center">
                  Créer un compte
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publier une annonce</h1>
          <p className="text-gray-500 mt-1">Remplissez le formulaire pour mettre votre véhicule en vente ou en location</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('vente')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'vente' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Vente
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'location' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Location
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

          {/* Infos véhicule */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">
              Informations du véhicule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Marque</label>
                <select
                  {...register('marque')}
                  onChange={(e) => setSelectedMarque(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Sélectionnez une marque</option>
                  {MARQUES_LIST.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Modèle</label>
                <select {...register('modele')} className={selectClass} disabled={!selectedMarque}>
                  <option value="">Sélectionnez un modèle</option>
                  {modeles.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Année</label>
                <select {...register('annee')} className={selectClass}>
                  <option value="">Sélectionnez une année</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Carburant</label>
                <select {...register('carburant')} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                  <option value="gpl">GPL</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Transmission</label>
                <select {...register('transmission')} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  <option value="manuelle">Manuelle</option>
                  <option value="automatique">Automatique</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Kilométrage</label>
                <input type="number" placeholder="Ex: 45000" {...register('kilometrage')} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Détails annonce */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">
              Détails de l'annonce
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  {...register('description')}
                  rows="4"
                  placeholder="Décrivez votre véhicule : état, options, historique..."
                  className={inputClass + ' resize-none'}
                />
                {errors.description && <p className={errorClass}>{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Prix (FCFA)</label>
                  <input type="number" placeholder="Ex: 2500000" {...register('prix')} className={inputClass} />
                  {errors.prix && <p className={errorClass}>{errors.prix.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Ville</label>
                  <select {...register('ville')} className={selectClass}>
                    <option value="">Sélectionnez une ville</option>
                    {VILLES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  {errors.ville && <p className={errorClass}>{errors.ville.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Contact (WhatsApp / Téléphone)</label>
                  <input type="text" placeholder="Ex: +221 77 123 45 67" {...register('contact')} className={inputClass} />
                  {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <FaSpinner className="animate-spin" />}
              {isLoading ? 'Publication...' : 'Publier l\'annonce'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
