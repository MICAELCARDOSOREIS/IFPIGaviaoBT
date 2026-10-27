import { ImageSourcePropType } from "react-native";

export interface Categoria {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: ImageSourcePropType;
}
