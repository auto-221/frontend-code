import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Base from '../components/layout/Base';
import Link from 'next/link';
import { FaSpinner, FaUser, FaCar, FaParking } from 'react-icons/fa';

const schema = yup.object().shape({
  username: yup.string().required('Nom complet obligatoire'),
  email: yup.string().required('Email obligatoire').email('Email invalide'),
  password: yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe obligatoire'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('Confirmation obligatoire'),
  tel: yup.string().required('Téléphone obligatoire'),
  adresse: yup.string().required('Adresse obligatoire'),
});

export default function Register() {
  const [hasPark, setHasPark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          tel: data.tel,
          adresse: data.adresse,
        }),
      });
      const result = await res.json();

      if (result.error) {
        setError("Cet email est déjà utilisé ou une erreur est survenue.");
        return;
      }

      if (result.user && hasPark) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parkings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${result.jwt}`,
          },
          body: JSON.stringify({
            data: {
              nom: data.nom,
              adresse: data.adresseparking,
              description: data.description,
            },
          }),
        });
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (e) {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <Base>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
            <p className="text-gray-500 mt-2">Rejoignez Auto221 et publiez vos annonces</p>
          </div>

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              Compte créé avec succès ! Redirection vers la connexion...
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Infos personnelles */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaUser className="text-primary" />
                <h2 className="text-lg font-semibold text-gray-800">Informations personnelles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nom complet</label>
                  <input type="text" placeholder="Ex: Moussa Diallo" {...register('username')} className={inputClass} />
                  {errors.username && <p className={errorClass}>{errors.username.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Téléphone</label>
                  <input type="tel" placeholder="Ex: 77 123 45 67" {...register('tel')} className={inputClass} />
                  {errors.tel && <p className={errorClass}>{errors.tel.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Email</label>
                  <input type="email" placeholder="exemple@email.com" {...register('email')} className={inputClass} />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Adresse</label>
                  <input type="text" placeholder="Ex: Dakar, Almadies" {...register('adresse')} className={inputClass} />
                  {errors.adresse && <p className={errorClass}>{errors.adresse.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Mot de passe</label>
                  <input type="password" placeholder="Minimum 6 caractères" {...register('password')} className={inputClass} />
                  {errors.password && <p className={errorClass}>{errors.password.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Confirmer le mot de passe</label>
                  <input type="password" placeholder="Répétez le mot de passe" {...register('confirmPassword')} className={inputClass} />
                  {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <FaParking className="text-primary" />
                <h2 className="text-lg font-semibold text-gray-800">Vous avez un parking ?</h2>
              </div>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hasPark" value="oui" onChange={() => setHasPark(true)}
                    className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700">Oui</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="hasPark" value="non" defaultChecked onChange={() => setHasPark(false)}
                    className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-700">Non</span>
                </label>
              </div>

              {hasPark && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <label className={labelClass}>Nom du parking</label>
                    <input type="text" placeholder="Ex: Parking Sandaga" {...register('nom')} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Adresse du parking</label>
                    <input type="text" placeholder="Ex: Plateau, Dakar" {...register('adresseparking')} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea rows="2" placeholder="Décrivez votre parking..." {...register('description')}
                      className={inputClass + ' resize-none'} />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <FaSpinner className="animate-spin" />}
              {isLoading ? 'Création en cours...' : "S'inscrire"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link href="/login">
                <a className="text-primary font-semibold hover:underline">Se connecter</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Base>
  );
}
