import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

/* Bottle dimensions (world units, y-up, base at y = 0).
   Proportions taken from the reference: total aspect ≈ 3.2:1,
   cap ≈ 55% of body width, shoulder ≈ 11% of height. */
const R = 0.46 // body radius
const SHOULDER_Y = 2.14
const NECK_R = 0.14
const NECK_TOP = 2.58
const CAP_R = 0.252
const CAP_TOP = 2.935

const buildBodyGeometry = () => {
  const pts = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.31, 0),
    new THREE.Vector2(0.4, 0.008),
    new THREE.Vector2(0.445, 0.032),
    new THREE.Vector2(R, 0.075),
    new THREE.Vector2(R, 0.34),
    // subtle seam groove above the base band
    new THREE.Vector2(R - 0.004, 0.36),
    new THREE.Vector2(R, 0.385),
    new THREE.Vector2(R, SHOULDER_Y),
  ]
  // smooth dome shoulder, tangent to the cylinder wall and the neck
  const shoulder = new THREE.CubicBezierCurve(
    new THREE.Vector2(R, SHOULDER_Y),
    new THREE.Vector2(R, SHOULDER_Y + 0.19),
    new THREE.Vector2(NECK_R + 0.015, NECK_TOP - 0.18),
    new THREE.Vector2(NECK_R, NECK_TOP - 0.08),
  )
  pts.push(...shoulder.getPoints(28).slice(1))
  pts.push(
    new THREE.Vector2(NECK_R, NECK_TOP),
    new THREE.Vector2(NECK_R - 0.012, NECK_TOP),
    new THREE.Vector2(0, NECK_TOP),
  )
  return new THREE.LatheGeometry(pts, 128)
}

const buildCapGeometry = () => {
  const pts = [
    new THREE.Vector2(0, NECK_TOP + 0.005),
    new THREE.Vector2(CAP_R - 0.03, NECK_TOP + 0.005),
    new THREE.Vector2(CAP_R, NECK_TOP + 0.02),
    new THREE.Vector2(CAP_R, CAP_TOP - 0.075),
    new THREE.Vector2(CAP_R - 0.008, CAP_TOP - 0.045),
    new THREE.Vector2(CAP_R - 0.03, CAP_TOP - 0.018),
    new THREE.Vector2(CAP_R - 0.075, CAP_TOP - 0.004),
    new THREE.Vector2(0, CAP_TOP),
  ]
  return new THREE.LatheGeometry(pts, 128)
}

/* Vertically-brushed roughness for the metal cap, generated locally. */
const makeBrushedTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  for (let x = 0; x < canvas.width; x += 1) {
    const v = 82 + Math.random() * 78
    ctx.fillStyle = `rgb(${v},${v},${v})`
    ctx.fillRect(x, 0, 1, canvas.height)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 1)
  return texture
}

export const Bottle3D = ({ reduceMotion = false }) => {
  const groupRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  const bodyGeometry = useMemo(buildBodyGeometry, [])
  const capGeometry = useMemo(buildCapGeometry, [])
  const brushedMap = useMemo(makeBrushedTexture, [])

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1b1b1e',
        roughness: 0.58,
        metalness: 0.3,
        clearcoat: 0.22,
        clearcoatRoughness: 0.55,
        envMapIntensity: 0.75,
      }),
    [],
  )

  const capMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#3a3a40',
        metalness: 1,
        roughness: 0.36,
        roughnessMap: brushedMap,
        envMapIntensity: 1.2,
        anisotropy: 0.85,
      }),
    [brushedMap],
  )

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c0c0e',
        roughness: 0.2,
        metalness: 0.75,
        envMapIntensity: 0.9,
      }),
    [],
  )

  useEffect(() => {
    if (reduceMotion) return undefined
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduceMotion])

  useEffect(
    () => () => {
      bodyGeometry.dispose()
      capGeometry.dispose()
      brushedMap.dispose()
      bodyMaterial.dispose()
      capMaterial.dispose()
      ringMaterial.dispose()
    },
    [bodyGeometry, capGeometry, brushedMap, bodyMaterial, capMaterial, ringMaterial],
  )

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    if (reduceMotion) {
      group.rotation.set(0, 0.18, 0)
      group.position.y = -1.42
      return
    }
    const t = state.clock.elapsedTime
    const targetY = 0.14 + pointer.current.x * 0.5 + Math.sin(t * 0.45) * 0.05
    const targetX = pointer.current.y * 0.12
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.2, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.2, delta)
    group.position.y = -1.42 + Math.sin(t * 1.25) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, -1.42, 0]} rotation={[0, 0.18, 0]}>
      <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow receiveShadow />
      {/* glossy neck ring between cap and shoulder */}
      <mesh material={ringMaterial} position={[0, NECK_TOP - 0.015, 0]}>
        <cylinderGeometry args={[NECK_R + 0.022, NECK_R + 0.028, 0.055, 64]} />
      </mesh>
      <mesh geometry={capGeometry} material={capMaterial} castShadow />
    </group>
  )
}
