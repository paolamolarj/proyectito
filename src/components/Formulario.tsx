import { useState, useEffect } from "react"

type Props = {
  insertar: (nombre: string, lugar: string, fecha: string, precio: number, tipo: string, imagen: string | null) => void
  actualizar: (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string, imagen: string | null) => void
  eventoEditar: any
  setEventoEditar: (e: any) => void
  subirImagen: (archivo: File) => Promise<string | null>
}

function Formulario({ insertar, actualizar, eventoEditar, setEventoEditar, subirImagen }: Props) {
  const [nombre, setNombre] = useState('')
  const [lugar, setLugar] = useState('')
  const [fecha, setFecha] = useState('')
  const [precio, setPrecio] = useState(0)
  const [tipo, setTipo] = useState('concierto')
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (eventoEditar) {
      setNombre(eventoEditar.nombre)
      setLugar(eventoEditar.lugar)
      setFecha(eventoEditar.fecha)
      setPrecio(eventoEditar.precio)
      setTipo(eventoEditar.tipo)
      setPreview(eventoEditar.imagen || null)
    }
  }, [eventoEditar])

  const limpiar = () => {
    setNombre('')
    setLugar('')
    setFecha('')
    setPrecio(0)
    setTipo('concierto')
    setEventoEditar(null)
    setArchivoImagen(null)
    setPreview(null)
  }

  const manejarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setArchivoImagen(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let urlImagen = eventoEditar?.imagen || null

    if (archivoImagen) {
      urlImagen = await subirImagen(archivoImagen)
    }

    if (eventoEditar) {
      actualizar(eventoEditar.id, nombre, lugar, fecha, precio, tipo, urlImagen)
    } else {
      insertar(nombre, lugar, fecha, precio, tipo, urlImagen)
    }
    limpiar()
  }

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Nombre del evento"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Lugar"
        value={lugar}
        onChange={(e) => setLugar(e.target.value)}
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        min={0}
        onChange={(e) => setPrecio(Number(e.target.value))}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="concierto">Concierto</option>
        <option value="festival">Festival</option>
        <option value="show">Show</option>
      </select>
      {preview && (
        <img src={preview} alt="preview" style={{ width: "100px", borderRadius: "8px" }} />
      )}
      <input type="file" accept="image/*" onChange={manejarArchivo} />
      <button type="submit">{eventoEditar ? "Actualizar" : "Guardar"}</button>
      {eventoEditar && (
        <button type="button" onClick={limpiar}>Cancelar</button>
      )}
    </form>
  )
}

export default Formulario