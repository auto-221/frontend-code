import Base from "../../components/layout/Base";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { getAnnonce, updateAnnonce } from "../../lib/api";

export async function getServerSideProps({ params }) {
  try {
    const annonce = await getAnnonce(params.updateParking);
    return { props: { annonce } };
  } catch {
    return { notFound: true };
  }
}

export default function UpdateParking({ annonce }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await updateAnnonce(annonce.documentId || annonce.id, data, token);
      router.push("/voitures/parking");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Base>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Editer annonce</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              defaultValue={annonce.description}
              {...register("description")}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Prix (DA)</label>
            <input
              type="number"
              defaultValue={annonce.prix}
              {...register("prix")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}
