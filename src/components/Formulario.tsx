import { useState, useEffect } from "react"

type Props = {
  insertar: (nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => void
  actualizar: (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => void
  eventoEditar: any
  setEventoEditar: (e: any) => void
}

function Formulario({ insertar, actualizar, eventoEditar, setEventoEditar }: Props) {
  const [nombre, setNombre] = useState('')
  const [lugar, setLugar] = useState('')
  const [fecha, setFecha] = useState('')
  const [precio, setPrecio] = useState(0)
  const [tipo, setTipo] = useState('concierto')

  // Si hay un evento a editar, carga sus datos en el form
  useEffect(() => {
    if (eventoEditar) {
      setNombre(eventoEditar.nombre)
      setLugar(eventoEditar.lugar)
      setFecha(eventoEditar.fecha)
      setPrecio(eventoEditar.precio)
      setTipo(eventoEditar.tipo)
    }
  }, [eventoEditar])

  const limpiar = () => {
    setNombre('')
    setLugar('')
    setFecha('')
    setPrecio(0)
    setTipo('concierto')
    setEventoEditar(null)
  }

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (eventoEditar) {
      actualizar(eventoEditar.id, nombre, lugar, fecha, precio, tipo)
    } else {
      insertar(nombre, lugar, fecha, precio, tipo)
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
      <button type="submit">{eventoEditar ? "Actualizar" : "Guardar"}</button>
      {eventoEditar && (
        <button type="button" onClick={limpiar}>Cancelar</button>
      )}
    </form>
  )
}

export default Formulario