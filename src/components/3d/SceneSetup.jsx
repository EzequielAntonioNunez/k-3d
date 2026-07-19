import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { isWebGLAvailable } from '../../lib/webgl'
import { Bottle3D } from './Bottle3D'
import { SceneFallback } from './SceneFallback'

export const SceneSetup = () => {
  const [webgl] = useState(isWebGLAvailable)
  const [ready, setReady] = useState(false)
  const reduceMotion = useReducedMotion()

  // Defer the WebGL init until after first paint to protect LCP/TBT.
  useEffect(() => {
    if (!webgl) return undefined
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 700 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 150)
    return () => window.clearTimeout(id)
  }, [webgl])

  if (!webgl || !ready) {
    return <SceneFallback />
  }

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.05, 8.6], fov: 30 }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <group scale={1.42}>
            <Bottle3D reduceMotion={reduceMotion} />
          </group>
          {/* Local studio environment — no network fetches */}
          <Environment resolution={256} frames={1}>
            <Lightformer
              intensity={5}
              position={[-3.5, 1.6, 3]}
              scale={[2.2, 6, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={1.3}
              position={[3.5, 0.6, 2.5]}
              scale={[1.8, 5, 1]}
              color="#dfe4ea"
            />
            <Lightformer
              intensity={2.4}
              position={[0, 5, -0.5]}
              rotation-x={Math.PI / 2}
              scale={[5, 2.5, 1]}
              color="#ffffff"
            />
            <Lightformer
              intensity={0.75}
              position={[0, -1.2, 5]}
              scale={[6, 2, 1]}
              color="#f2f2f2"
            />
          </Environment>
        </Suspense>
        <ContactShadows
          position={[0, -2.12, 0]}
          opacity={0.34}
          scale={8}
          blur={2.8}
          far={3}
          resolution={512}
          color="#0a0a0a"
          frames={reduceMotion ? 1 : Number.POSITIVE_INFINITY}
        />
      </Canvas>
    </div>
  )
}
