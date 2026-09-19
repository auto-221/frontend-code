import Base from "../../../components/layout/Base";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { getAnnonce } from "../../../lib/api";

export async function getServerSideProps({ params }) {
  const data = await getAnnonce(params.id);
  return { props: { data } };
}

export default function Ventes({ data }) {
  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Images */}
          <div className="md:col-span-2">
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
              <AwesomeSlider animation="cubeAnimation" className="h-full">
                <div data-src="/bmw.jpg" className="h-full" />
                <div data-src="/peugeot.jpg" className="h-full" />
              </AwesomeSlider>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {data.voiture?.marque} {data.voiture?.modele}
            </h1>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div>
                <span className="text-gray-600">Prix:</span>
                <span className="ml-2 text-2xl font-bold text-primary">
                  {data.prix.toFixed(2)} DA
                </span>
              </div>
              <div>
                <span className="text-gray-600">Carburant:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {data.voiture.carburant}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Transmission:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {data.voiture.transmission}
                </span>
              </div>
              {data.voiture.kilometrage && (
                <div>
                  <span className="text-gray-600">Kilometrage:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {data.voiture.kilometrage} km
                  </span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Annee:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {data.voiture.annee}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{data.description}</p>

            {/* Seller Info */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-secondary text-white rounded-full p-3">
                  <FaUser />
                </div>
                <div>
                  <span className="text-sm text-gray-600">Vendeur:</span>
                  <p className="font-semibold text-gray-900">
                    {data.users_permissions_user.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white rounded-full p-3">
                  <FaPhone size={16} />
                </div>
                <div>
                  <span className="text-sm text-gray-600">Telephone:</span>
                  <p className="font-semibold text-gray-900">
                    {data.users_permissions_user.tel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary text-white rounded-full p-3">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div>
                  <span className="text-sm text-gray-600">Adresse:</span>
                  <p className="font-semibold text-gray-900">
                    {data.users_permissions_user.adresse}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors">
              Contacter le vendeur
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
}
