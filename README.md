# Clases Mu · Realidad Aumentada

Proyecto de **realidad aumentada** construido con React 19, TypeScript y Vite, usando **A-Frame** + **AR.js** con el marcador **Hiro**. Personalizado para **Aldo Figueredo** con tema morado.

## ¿Qué hace?

- Muestra un modelo 3D de dragón (`DragonAttenuation.glb`) sobre el marcador Hiro.
- Permite alternar entre el dragón y un cubo morado.
- Cambia el tamaño del objeto (normal / grande).
- Cuenta los clics realizados en los controles.
- Indica cuándo el marcador Hiro ha sido detectado por la cámara.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador y permite el acceso a la cámara. Imprime o muestra en otra pantalla el marcador Hiro de AR.js para ver el modelo.

## Scripts

| Comando          | Descripción                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Servidor de desarrollo          |
| `npm run build`  | Compilación de producción       |
| `npm run preview`| Vista previa de la compilación  |
| `npm run lint`   | Linter (Oxlint)                 |

## Repositorio

https://github.com/aldoffacha12/clasesmu-ra
