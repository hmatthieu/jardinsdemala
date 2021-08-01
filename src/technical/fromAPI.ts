const SERVER = process.env.STRAPI_URL;

export function fromAPI(path: string) {
  return `${SERVER}${path}`;
}
