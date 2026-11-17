import { useEffect, useRef, useState } from 'react'
import './App.css'

const escala = (n: number) => `${n} ${n} ${n}`

export default function App() {
  const [personaje, setPersonaje] = useState(false)
  const [grande, setGrande] = useState(false)
  const [clics, setClics] = useState(0)
  const [detectado, setDetectado] = useState(false)

  const markerRef = useRef<any>(null)

  useEffect(() => {
    const marker = markerRef.current

    const encontrado = () => {
      console.log('Marcador Hiro detectado')
      setDetectado(true)
    }

    const perdido = () => {
      console.log('Marcador Hiro perdido')
      setDetectado(false)
    }

    if (marker) {
      marker.addEventListener('markerFound', encontrado)
      marker.addEventListener('markerLost', perdido)
    }

    return () => {
      if (marker) {
        marker.removeEventListener('markerFound', encontrado)
        marker.removeEventListener('markerLost', perdido)
      }
    }
  }, [])

  return (
    <>
      <div className="panel">
        <header className="panel__cabecera">
          <h1>Aldo Figueredo</h1>
          <p>Realidad aumentada · Clases Mu</p>
        </header>

        <div className="panel__controles">
          <button
            type="button"
            onClick={() => {
              setPersonaje(!personaje)
              setClics((n) => n + 1)
            }}
          >
            {personaje ? 'Mostrar cubo' : 'Mostrar dragón'}
          </button>

          <button
            type="button"
            onClick={() => {
              setGrande(!grande)
              setClics((n) => n + 1)
            }}
          >
            {grande ? 'Tamaño: grande' : 'Tamaño: normal'}
          </button>

          <span className="panel__dato">Clics: {clics}</span>

          <span className={`panel__estado ${detectado ? 'activo' : ''}`}>
            {detectado ? '✅ Hiro detectado' : 'Buscando Hiro…'}
          </span>
        </div>

        <p className="panel__pista">
          Apunta la cámara al marcador <strong>Hiro</strong> para ver el modelo.
        </p>
      </div>

      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        vr-mode-ui="enabled: false"
        renderer="antialias: true; alpha: true"
      >
        <a-marker ref={markerRef} preset="hiro" emitevents="true">
          <a-entity
            scale={escala(grande ? 2 : 1)}
            animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
          >
            <a-cylinder
              color="#7c3aed"
              radius="0.8"
              height="0.05"
              position="0 0 0"
            />

            {personaje ? (
              <a-gltf-model src="/DragonAttenuation.glb" scale={escala(0.5)} />
            ) : (
              <a-box position="0 0.5 0" color="#a855f7" />
            )}
          </a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </>
  )
}
