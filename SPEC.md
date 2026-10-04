# Auto221 — Spécification Technique

## Vue d'ensemble

Auto221 est une plateforme de petites annonces automobiles pour le Sénégal.
Fonctionnalités principales : vente de voitures, location, gestion de parkings.

---

## Architecture

| Composant     | Technologie               | Port  |
|---------------|---------------------------|-------|
| Frontend      | Next.js 10.2.3 + Tailwind | 3001  |
| Backend API   | Strapi v5.52.3 (TypeScript) | 1337 |
| Base de données | PostgreSQL 14            | 5432  |

**Repos GitHub :**
- Frontend : https://github.com/auto-221/frontend-code (branch: `tailwind-migration`)
- Backend : https://github.com/auto-221/strapi-api (branch: `main`)

---

## Démarrage local

```bat
# Lancer les deux serveurs (bat sur le bureau)
start-parking.bat

# Ou manuellement :
cd strapi-api && npm run develop      # http://localhost:1337
cd frontend-code && npm run dev       # http://localhost:3001
```

**Variables d'environnement frontend** (`.env.local`) :
```
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## Content Types Strapi

### Annonce
Champs : `titre`, `description`, `prix` (integer), `categorie` (voiture|parking|location),
`statut` (disponible|vendu|loue), `ville`, `contact` (string, numéro WhatsApp),
`images` (media, multiple), `voiture` (relation → Voiture), `parking` (relation → Parking)

### Voiture
Champs : `marque`, `modele`, `annee`, `kilometrage`, `carburant` (essence|diesel|hybride|electrique),
`transmission` (manuelle|automatique), `couleur`, `statut`, `images` (media, multiple)

### Parking
Champs : `nom`, `adresse`, `ville`, `capacite`, `prix_par_jour`, `disponible` (bool),
`lat`, `lon`, `images` (media, multiple)

### Location Voiture
Champs : `date_debut`, `date_fin`, `prix_total`, `statut`, `voiture` (relation)

### User (extension)
Extension Strapi à `src/extensions/users-permissions/content-types/user/schema.json`
Champs additionnels : `tel` (string), `adresse` (string)

---

## Permissions API (configurées dans `src/index.ts`)

| Rôle           | Actions autorisées                          |
|----------------|---------------------------------------------|
| Public         | `find`, `findOne` sur tous les content types |
| Authenticated  | CRUD complet + upload images                 |

---

## Structure Frontend

```
pages/
  index.js              — Page d'accueil (annonces récentes)
  login.js              — Connexion (JWT → localStorage)
  register.js           — Inscription + optionnellement créer un parking
  annonces/
    index.js            — Formulaire de publication (auth requis)
  voitures/
    index.js            — Liste toutes les voitures
    parking.js          — Mes annonces (auth requis)
    ventes/
      search.js         — Recherche avec filtres avancés
      [id].js           — Détail annonce (documentId Strapi v5)
  locationvoiture.js    — Location de voitures (à revoir)

components/
  layout/
    Base.js             — Layout principal (Header + Footer)
    Header.js           — Nav réactive auth/non-auth
  cards/
    InfoCard.js         — Carte annonce (liste)

lib/
  api.js                — Fonctions API centralisées (Strapi v5)
  format.js             — formatPrix() FCFA, formatKm(), whatsappUrl()
  marques.js            — MARQUES_LIST, MARQUES (marques/modèles séné)
```

---

## Flux d'authentification

1. **Inscription** : `POST /auth/local/register` → `{username, email, password}`
2. **Connexion** : `POST /auth/local` → JWT stocké dans `localStorage.token` + `cookies-next`
3. **Lecture auth** : `useEffect` lit `localStorage.user` — header réactif à chaque changement de route
4. **Déconnexion** : Supprime `localStorage.token` + `localStorage.user` → redirect `/`

---

## Flux de publication d'annonce

1. Upload images → `POST /upload` (multipart, Bearer token) → retourne IDs
2. Créer voiture → `POST /voitures` avec `imageIds` → retourne `documentId`
3. Créer annonce → `POST /annonces` avec `voiture.documentId`

---

## Points d'attention Strapi v5

- Utiliser `documentId` (string) et non `id` (integer) pour les liens et l'accès API
- Enums en **minuscules** : `essence`, `diesel`, `manuelle`, `automatique`
- `draftAndPublish` activé → ajouter `?status=published` à la création si nécessaire
- Populate : utiliser `populate=voiture,parking,images` (pas `populate[images][*]`)
- L'extension user schema (`src/extensions/...`) : vérifier que Strapi la charge au démarrage

---

## Fonctionnalités P0 (implementées)

- [x] Annonces voitures avec photos
- [x] Recherche avec filtres (marque, modele, ville, prix, carburant, transmission, annee)
- [x] Détail annonce : galerie photos, specs, prix FCFA
- [x] Bouton WhatsApp sur chaque annonce
- [x] Prix en FCFA (Intl.NumberFormat fr-SN)
- [x] Inscription / Connexion / Déconnexion
- [x] Publication d'annonce avec upload photos (auth requis)
- [x] Header réactif (connecté / non connecté)
- [x] Responsive mobile

## Fonctionnalités P1 (à faire)

- [ ] Profil vendeur public
- [ ] Favoris / liste de souhaits
- [ ] Badge "Vendeur vérifié"
- [ ] Compteur de vues par annonce
- [ ] Page location voiture fonctionnelle
- [ ] Champs tel/adresse dans le profil utilisateur
- [ ] Confirmation email à l'inscription
- [ ] Pagination des résultats de recherche

---

## Données de test

Compte test : `test@test.com` / `Test1234!`

Annonces créées : BMW Série 3 (2019), Peugeot 308 (2018), Toyota Land Cruiser (2015),
Parking Plateau.

Images : `bmw.jpg` (id:2), `peugeot.jpg` (id:3), `hero.jpeg` (id:4) dans Strapi Media Library.
