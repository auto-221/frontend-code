import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaCar,
  FaWrench,
  FaCalendar,
  FaFire,
  FaWaveSquare,
  FaRoad,
  FaMoneyBill,
} from "react-icons/fa";

export default function AdvancedSearch() {
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const router = useRouter();

  const schema = yup.object().shape({
    prix: yup.string().matches(/^[0-9]*$/, "Prix invalide"),
    places: yup.string().max(3, "Invalide"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchMarques();
  }, []);

  const fetchMarques = async () => {
    try {
      const res = await fetch("http://localhost:1337/marques");
      const data = await res.json();
      setMarques(data);
    } catch (error) {
      console.error("Error fetching marques:", error);
    }
  };

  const handleMarqueChange = async (marqueId) => {
    if (!marqueId) {
      setModeles([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:1337/marques/${marqueId}`);
      const data = await res.json();
      setModeles(data.modeles || []);
    } catch (error) {
      console.error("Error fetching modeles:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      router.push(`/voitures/ventes/search?${queryParams.toString()}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaCar className="text-primary mr-2" /> Marque
            </label>
            <select
              {...register("marque")}
              onChange={(e) => handleMarqueChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez une marque</option>
              {marques.map((marque) => (
                <option key={marque.id} value={marque.id}>
                  {marque.libelle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaWrench className="text-primary mr-2" /> Modele
            </label>
            <select
              {...register("modele")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez un modele</option>
              {modeles.map((modele) => (
                <option key={modele.id} value={modele.id}>
                  {modele.libelle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaCalendar className="text-primary mr-2" /> Annee
            </label>
            <input
              type="number"
              placeholder="Annee"
              {...register("annee")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaFire className="text-primary mr-2" /> Kilometrage
            </label>
            <select
              {...register("kilometrage")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez</option>
              <option value="0-50000">0 - 50,000 km</option>
              <option value="50000-100000">50,000 - 100,000 km</option>
              <option value="100000-200000">100,000 - 200,000 km</option>
              <option value="200000+">200,000+ km</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaWaveSquare className="text-primary mr-2" /> Transmission
            </label>
            <select
              {...register("transmission")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
              <option value="Semi-Automatique">Semi-Automatique</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaRoad className="text-primary mr-2" /> Nombre de places
            </label>
            <select
              {...register("places")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaMoneyBill className="text-primary mr-2" /> Prix Max
            </label>
            <input
              type="number"
              placeholder="Prix maximum"
              {...register("prix")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>}
          </div>

          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <FaFire className="text-primary mr-2" /> Carburant
            </label>
            <select
              {...register("carburant")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selectionnez</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Electrique">Electrique</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}
