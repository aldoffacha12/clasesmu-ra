import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any
      'a-marker': any
      'a-entity': any
      'a-box': any
      'a-cylinder': any
      'a-gltf-model': any
    }
  }
}
