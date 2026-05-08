type Props = {
  id: number
  nombre: string
  lugar: string
  fecha: string
  precio: string
  tipo: string
  setEventoEditar: (evento: any) => void
  eliminar: (id: number) => void
  imagen: string | null
}

function EventoCard({ id, nombre, imagen, lugar, fecha, precio, tipo, setEventoEditar, eliminar }: Props) {
  const esFuturo = new Date(fecha) >= new Date()

  return (
    <div className={`card ${esFuturo ? "futuro" : "pasado"}`}>
      <span className="badge">{esFuturo ? "🟢 Futuro" : "🔴 Pasado"}</span>
      <span className="tipo">{tipo}</span>
      {imagen && (
  <img
    src={imagen}
    alt={nombre}
    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }}
  />
)}
      <h3>{nombre}</h3>
      <p>📍 {lugar}</p>
      <p>📅 {fecha}</p>
      <p>💰 {Number(precio) === 0 ? "Gratuito" : `$${Number(precio).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`}</p>
      <div className="acciones">
        <button onClick={() => setEventoEditar({ id, nombre, lugar, fecha, precio, tipo })}>
          Editar
        </button>
        <button onClick={() => eliminar(id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default EventoCard