export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AUTO 221</h3>
            <p className="text-white text-opacity-90">
              Votre plateforme de confiance pour acheter, vendre et louer des voitures
            </p>
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-white hover:text-primary-hover transition-colors">
              Conditions
            </a>
            <span className="mx-4 text-white text-opacity-50">•</span>
            <a href="#" className="text-white hover:text-primary-hover transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 pt-8">
          <p className="text-center text-white text-opacity-80">
            © 2021 Auto 221. Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
