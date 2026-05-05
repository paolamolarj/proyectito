import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

type Evento = {
  id: number
  nombre: string
  lugar: string
  fecha: string
  precio: number
  tipo: string
  imagen: string | null  
}

function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([])

  const traer = async () => {
    const { data } = await supabase.from("eventos").select("*")
    if (data) setEventos(data)
  }

  const subirImagen = async (archivo: File) => {
  const nombreArchivo = `${Date.now()}_${archivo.name}`
  const { error } = await supabase.storage
    .from("eventos-imagenes")
    .upload(nombreArchivo, archivo)

  if (error) return null

  const { data } = supabase.storage
    .from("eventos-imagenes")
    .getPublicUrl(nombreArchivo)

  return data.publicUrl
}
const insertar = async (nombre: string, lugar: string, fecha: string, precio: number, tipo: string, imagen: string | null) => {
  const { error } = await supabase.from("eventos").insert([{ nombre, lugar, fecha, precio, tipo, imagen }])
  if (!error) traer()
}

const actualizar = async (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string, imagen: string | null) => {
  const { error } = await supabase.from("eventos").update({ nombre, lugar, fecha, precio, tipo, imagen }).eq("id", id)
  if (!error) traer()
}
  const eliminar = async (id: number) => {
    const { error } = await supabase.from("eventos").delete().eq("id", id)
    if (!error) traer()
  }

  useEffect(() => {
    traer()
  }, [])

  // 🧠 Lógica de negocio: clasifica futuros vs pasados
  const hoy = new Date()
  const eventosFuturos = eventos.filter(e => new Date(e.fecha) >= hoy)
  const eventosPasados = eventos.filter(e => new Date(e.fecha) < hoy)

  return {
    eventos,
    eventosFuturos,
    eventosPasados,
    contadorFuturos: eventosFuturos.length,
    insertar,
    actualizar,
    eliminar,
    subirImagen,
  }
}

export default useEventos