export enum StrapiColor {
  ORANGE = "Orange",
  PURPLE = "Violet",
  BLUE = "Bleu",
  GREEN_LIGHT = "VertClair",
  GREEN_DARK = "VertFonce",
}

export const ORANGE = "#F87028";
export const PURPLE = "#a20086";
export const BLUE = "#00a6a9";
export const GREEN_LIGHT = "#65c864";
export const GREEN_DARK = "#169250";

export const StrapiToColors: Record<StrapiColor, string> = {
  [StrapiColor.ORANGE]: ORANGE,
  [StrapiColor.PURPLE]: PURPLE,
  [StrapiColor.BLUE]: BLUE,
  [StrapiColor.GREEN_LIGHT]: GREEN_LIGHT,
  [StrapiColor.GREEN_DARK]: GREEN_DARK,
};

export const PRIMARY = "black";
