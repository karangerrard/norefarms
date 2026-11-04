export const homeUrl = import.meta.env.BASE_URL;

export function productUrl(slug: string) {
  return `${homeUrl}products/${slug}/`;
}

export function sectionUrl(id: string) {
  return `${homeUrl}#${id}`;
}
