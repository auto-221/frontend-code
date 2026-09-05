import Base from "../../../components/layout/Base";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps() {
  const marques = await fetch("http://localhost:1337/marques").then((r) => r.json());
  return { props: { marques } };
}

export default function Publish({ marques }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [modeles, setModeles] = useState([]);

  const handleMarqueChange = async (marqueId) => {
    if (!marqueId) return;
    const res = await fetch(`http://localhost:1337/marques/${marqueId}`);
    const data = await res.json();
    setModeles(data.modeles || []);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      
      await fetch("http://localhost:1337/voitures", {
        method: "POST",
        body: formData,
      });
      router.push("/voitures/parking");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Base>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Publier une voiture</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Marque</label>
              <select
                {...register("marque")}
                onChange={(e) => handleMarqueChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Selectionnez</option>
                {marques.map((m) => (
                  <option key={m.id} value={m.id}>{m.libelle}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Modele</label>
              <select
                {...register("modele")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Selectionnez</option>
                {modeles.map((m) => (
                  <option key={m.id} value={m.id}>{m.libelle}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Annee</label>
              <input type="number" {...register("annee")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Prix (DA)</label>
              <input type="number" {...register("prix")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Carburant</label>
              <select {...register("carburant")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                <option value="">Selectionnez</option>
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
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
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea {...register("description")} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Images</label>
            <input type="file" multiple accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Publier
            </button>
            <button type="button" onClick={() => router.back()} className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-lg">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
