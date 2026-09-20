export function formatPrix(prix) {
  if (!prix && prix !== 0) return '—';
  return new Intl.NumberFormat('fr-SN').format(prix) + ' FCFA';
}

export function formatKm(km) {
  if (!km) return '—';
  return new Intl.NumberFormat('fr-SN').format(km) + ' km';
}

export function whatsappUrl(contact, titre) {
  if (!contact) return null;
  const phone = contact.replace(/[\s\-().+]/g, '');
  const msg = encodeURIComponent(`Bonjour, je suis intéressé par votre annonce sur Auto221 : "${titre}". Est-elle toujours disponible ?`);
  return `https://wa.me/${phone}?text=${msg}`;
}
