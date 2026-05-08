import { useState } from "react"
import { Formulario, EventoCard } from "./components"
import { useEventos } from "./hooks"

function App() {
const { eventos, contadorFuturos, insertar, actualizar, eliminar, subirImagen } = useEventos()
  const [eventoEditar, setEventoEditar] = useState(null)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroTemporal, setFiltroTemporal] = useState("todos")

  const eventosFiltrados = eventos
    .filter(e => filtroTipo === "todos" || e.tipo === filtroTipo)
    .filter(e => {
      if (filtroTemporal === "futuros") return new Date(e.fecha) >= new Date()
      if (filtroTemporal === "pasados") return new Date(e.fecha) < new Date()
      return true
    })

  return (
    <div>
      {/* Contador */}
      <h1>Sistema de Eventos</h1>
      <p className="contador">Próximos eventos: <strong>{contadorFuturos}</strong></p>


      {/* Formulario */}
      <Formulario
  insertar={insertar}
  actualizar={actualizar}
  eventoEditar={eventoEditar}
  setEventoEditar={setEventoEditar}
  subirImagen={subirImagen}  
/>

      {/* Filtros */}
      <div className="filtros">

        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="todos">Todos los tipos</option>
          <option value="concierto">Concierto</option>
          <option value="festival">Festival</option>
          <option value="show">Show</option>
        </select>

        <select value={filtroTemporal} onChange={(e) => setFiltroTemporal(e.target.value)}>
          <option value="todos">Futuros y pasados</option>
          <option value="futuros">Solo futuros</option>
          <option value="pasados">Solo pasados</option>
        </select>
      </div>

      {/* Lista de eventos */}
      <div className="lista">
        {eventosFiltrados.map((evento) => (
          <EventoCard
  key={evento.id}
  {...evento}
  setEventoEditar={setEventoEditar}
  eliminar={eliminar}
/>
        ))}
      </div>
    </div>
  )
}

export default App