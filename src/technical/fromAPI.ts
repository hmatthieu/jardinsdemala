const SERVER = process.env.STRAPI_URL;

interface IURL {
  url?: string;
}

interface IImage {
  formats?: {
    medium?: IURL;
    small?: IURL;
    thumbnail?: IURL;
  };
}

type FormatKey = keyof IImage["formats"];
const formats: FormatKey[] = ["medium", "small", "thumbnail"];

interface IImageParams {
  image?: IImage;
  format: FormatKey;
}

export function fromAPI(pathOrImage: string | IImageParams | undefined) {
  if (!pathOrImage) {
    return undefined;
  }

  if (typeof pathOrImage === "string") {
    return `${SERVER}${pathOrImage}`;
  }

  const formatIndex = formats.indexOf(pathOrImage.format);
  for (let i = formatIndex; i < formats.length; i++) {
    if (pathOrImage.image?.formats?.[formats[i]]?.url) {
      return fromAPI(pathOrImage.image?.formats?.[formats[i]]?.url);
    }
  }
}
