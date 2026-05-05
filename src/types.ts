export interface Evento {
  id: number;
  nombre: string;
  lugar: string;
  fecha: string;
  precio: number;
  tipo: "Concierto" | "Festival" | "Show";
}

export type TipoFiltro = "Todos" | "Concierto" | "Festival" | "Show";