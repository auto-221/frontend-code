import { useState, useEffect } from "react";
import SimpleSlider from "../components/cards/Slider";
import Base from "../components/layout/Base";
import { FaMicrophoneAlt } from "react-icons/fa";
import AdvancedSearch from "../components/AdvancedSearch";
import NosServices from "../components/NosServices";

import { getAnnonces } from "../lib/api";

export async function getServerSideProps() {
  const data = await getAnnonces("pagination[limit]=3");
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  return (
    <Base>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Trouver la voiture ideale sur Auto221
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            La plateforme numero un pour acheter, vendre et louer des voitures
          </p>
        </div>

        {/* Search Section */}
        <AdvancedSearch />

        {/* Featured Listings */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaMicrophoneAlt className="text-primary text-2xl" />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Annonces en Vedette
            </h2>
          </div>
          <SimpleSlider key={data[0]?.id} data={data} />
        </div>

        {/* Services Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 underline">
            Nos services
          </h2>
          <NosServices />
        </div>
      </div>
    </Base>
  );
}
