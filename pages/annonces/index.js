import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Base from "../../components/layout/Base";
import { FaCar, FaWrench, FaCalendar, FaFire, FaWaveSquare, FaRoad, FaMoneyBill } from "react-icons/fa";

import { createAnnonce } from "../../lib/api";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  return { props: {} };
}

export default function Annonces() {
  const [activeTab, setActiveTab] = useState("vente");
  const router = useRouter();

  const schema = yup.object().shape({
    prix: yup.string().matches(/^[0-9]*$/, "Prix invalide"),
    description: yup.string().required("Description obligatoire"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await createAnnonce({ ...data, categorie: activeTab === "vente" ? "voiture" : "voiture" }, token);
      router.push("/voitures/parking");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Base>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Publier une annonce</h1>

        <div className="mb-8 border-b border-gray-200 flex space-x-8">
          <button
            onClick={() => setActiveTab("vente")}
            className={`pb-4 font-semibold ${activeTab === "vente" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
          >
            Vente
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={`pb-4 font-semibold ${activeTab === "location" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
          >
            Location
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations voiture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Marque</label>
                <input type="text" {...register("marque")} placeholder="Ex: Toyota" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Modele</label>
                <input type="text" {...register("modele")} placeholder="Ex: Corolla" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Annee</label>
                <input type="number" {...register("annee")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Carburant</label>
                <select {...register("carburant")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                  <option value="">Selectionnez</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Electrique">Electrique</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Transmission</label>
                <select {...register("transmission")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                  <option value="">Selectionnez</option>
                  <option value="Manuelle">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Places</label>
                <select {...register("places")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                  <option value="">Selectionnez</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Details annonce</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea {...register("description")} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" placeholder="Decrivez votre annonce..." />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Prix (DA)</label>
                <input type="number" {...register("prix")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Images</label>
                <input type="file" multiple accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Publier
            </button>
            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-lg">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
