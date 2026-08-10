import CarrosselRoteiros from "../../components/ui/CarrosselRoteiros";
import { CardRoteiroProps } from "./CardRoteiro";

export interface CarrosselRoteirosProps {
    titulo: string;
    descricao: string;
    listaRoteiros: CardRoteiroProps[]
}