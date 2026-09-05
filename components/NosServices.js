import { FaMicrophoneAlt, FaCar } from 'react-icons/fa';

export default function NosServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 mx-auto max-w-6xl px-4">
      {/* Buy/Sell Service */}
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <FaMicrophoneAlt className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Achat et vente de voitures
            </h3>
            <p className="text-gray-600 mb-4">
              Trouvez la voiture parfaite sur Auto221 ou créez votre compte et commencez à publier vos annonces.
            </p>
            <button className="bg-secondary hover:bg-secondary-hover text-white font-semibold py-2 px-4 rounded transition-colors">
              Devenir annonceur
            </button>
          </div>
        </div>
      </div>

      {/* Rental Service */}
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <FaCar className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Location de voitures
            </h3>
            <p className="text-gray-600 mb-4">
              Trouvez rapidement une voiture de location correspondant à vos besoins avec nos parkings.
            </p>
            <button className="bg-secondary hover:bg-secondary-hover text-white font-semibold py-2 px-4 rounded transition-colors">
              Faire une location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
