import Base from "../../../components/layout/Base";
import { useState, useEffect } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps({ query }) {
  try {
    const res = await fetch("http://localhost:1337/annonces?type=vente&_limit=9");
    const data = await res.json();
    return { props: { initialData: data } };
  } catch {
    return { props: { initialData: [] } };
  }
}

export default function Search({ initialData }) {
  const [items, setItems] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(9);

  const fetchMore = async () => {
    try {
      const res = await fetch(`http://localhost:1337/annonces?type=vente&_start=${start}&_limit=9`);
      const data = await res.json();
      if (data.length < 9) setHasMore(false);
      setItems([...items, ...data]);
      setStart(start + 9);
    } catch {
      setHasMore(false);
    }
  };

  return (
    <Base>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Recherche de voitures</h1>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="text-center py-4">Chargement...</div>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img
                    src={`http://localhost:1337${item.voiture?.photo1?.[0]?.formats?.thumbnail?.url}`}
                    alt={item.description}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.description}</h3>
                  <p className="text-gray-600 text-sm mb-4">Annee: {item.voiture?.annee}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">{item.prix?.toFixed(2)} DA</span>
                  </div>
                  <Link href={`/voitures/ventes/${item.id}`}>
                    <a className="w-full block text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 rounded-lg transition-colors">
                      Details
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Base>
  );
}
