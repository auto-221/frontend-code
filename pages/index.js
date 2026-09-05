import { useState, useEffect } from "react";
import SimpleSlider from "../components/cards/Slider";
import Base from "../components/layout/Base";
import { FaMicrophoneAlt } from "react-icons/fa";
import AdvancedSearch from "../components/AdvancedSearch";
import NosServices from "../components/NosServices";

let modele = [];

async function setMarque(data) {
  for (let index = 0; index < data.length; index++) {
    const marqueRequest = await fetch(
      "http://localhost:1337/modeles/" + data[index].voiture.modele
    );
    modele.push(await marqueRequest.json());
  }
  for (let i = 0; i < data.length; i++) {
    data[i]["modele"] = modele[i];
  }
  return data;
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:1337/annonces?_limit=3");
  let data = await res.json();
  data = await setMarque(data);

  return {
    props: {
      data,
    },
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
