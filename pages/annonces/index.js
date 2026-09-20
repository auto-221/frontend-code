import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Base from '../../components/layout/Base';
import { useRouter } from 'next/router';
import { createAnnonce, createVoiture, uploadImages } from '../../lib/api';
import { MARQUES, MARQUES_LIST } from '../../lib/marques';
import { FaSpinner, FaLock, FaCamera, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const schema = yup.object().shape({
  prix: yup.number().typeError('Prix invalide').required('Prix obligatoire').positive(),
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
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    setModeles(selectedMarque ? (MARQUES[selectedMarque] || []) : []);
  }, [selectedMarque]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setError('Maximum 5 photos');
      return;
    }
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setError('');
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');

      // 1. Upload images si présentes
      let imageIds = [];
      if (images.length > 0) {
        const uploaded = await uploadImages(images, token);
        imageIds = uploaded.map((f) => f.id);
      }

      // 2. Créer la voiture
      const voitureRes = await createVoiture({
        marque: data.marque || 'Autre',
        modele: data.modele || 'Autre',
        annee: data.annee ? parseInt(data.annee) : null,
        carburant: data.carburant || null,
        transmission: data.transmission || null,
        kilometrage: data.kilometrage ? parseInt(data.kilometrage) : null,
        prix: parseFloat(data.prix),
        images: imageIds,
      }, token);

      const voitureDocId = voitureRes?.data?.documentId;

      // 3. Créer l'annonce
      await createAnnonce({
        titre: `${data.marque || ''} ${data.modele || ''} ${data.annee || ''}`.trim() || data.description.slice(0, 50),
        description: data.description,
        prix: parseFloat(data.prix),
        categorie: 'voiture',
        statut: 'actif',
        ville: data.ville,
        contact: data.contact,
        voiture: voitureDocId ? { documentId: voitureDocId } : undefined,
      }, token);

      router.push('/voitures/ventes/search');
    } catch (e) {
      console.error(e);
      setError('Une erreur est survenue. Vérifiez votre connexion et réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm";
  const selectClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  if (isAuth === null) return null;

  if (!isAuth) {
    return (
      <Base>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaLock className="text-primary text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Connexion requise</h2>
            <p className="text-gray-600 mb-8">Vous devez être connecté pour publier une annonce sur Auto221.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login"><a className="block w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg text-center transition-colors">Se connecter</a></Link>
              <Link href="/register"><a className="block w-full border border-primary text-primary font-semibold py-3 rounded-lg text-center hover:bg-primary/5 transition-colors">Créer un compte</a></Link>
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
          <p className="text-gray-500 mt-1">Votre annonce sera visible par des milliers d'acheteurs</p>
        </div>

        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          {['vente', 'location'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all capitalize ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}>
              {tab === 'vente' ? 'Vente' : 'Location'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

          {/* Photos */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Photos</h2>
            <p className="text-xs text-gray-500 mb-4">Ajoutez jusqu'à 5 photos (la première sera la photo principale)</p>
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black">
                    <FaTimes size={10} />
                  </button>
                </div>
              ))}
              {previews.length < 5 && (
                <button type="button" onClick={() => fileInputRef.current.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors">
                  <FaCamera size={20} />
                  <span className="text-xs">Ajouter</span>
                </button>
              )}
              <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
            </div>
          </div>

          {/* Véhicule */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">Véhicule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Marque</label>
                <select {...register('marque')} onChange={(e) => setSelectedMarque(e.target.value)} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  {MARQUES_LIST.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Modèle</label>
                <select {...register('modele')} className={selectClass} disabled={!selectedMarque}>
                  <option value="">Sélectionnez</option>
                  {modeles.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Année</label>
                <select {...register('annee')} className={selectClass}>
                  <option value="">Sélectionnez</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Kilométrage</label>
                <input type="number" placeholder="Ex: 45 000" {...register('kilometrage')} className={inputClass} />
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
            </div>
          </div>

          {/* Annonce */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-100">Détails de l'annonce</h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Description</label>
                <textarea {...register('description')} rows="4" placeholder="État général, options, historique d'entretien..." className={inputClass + ' resize-none'} />
                {errors.description && <p className={errorClass}>{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Prix (FCFA)</label>
                  <input type="number" placeholder="Ex: 2 500 000" {...register('prix')} className={inputClass} />
                  {errors.prix && <p className={errorClass}>{errors.prix.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Ville</label>
                  <select {...register('ville')} className={selectClass}>
                    <option value="">Sélectionnez</option>
                    {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  {errors.ville && <p className={errorClass}>{errors.ville.message}</p>}
                </div>
              </div>
              <div>
                <label className={labelClass}>Numéro WhatsApp / Téléphone</label>
                <input type="text" placeholder="Ex: +221 77 123 45 67" {...register('contact')} className={inputClass} />
                {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading && <FaSpinner className="animate-spin" />}
              {isLoading ? 'Publication en cours...' : "Publier l'annonce"}
            </button>
            <button type="button" onClick={() => router.back()}
              className="px-6 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
