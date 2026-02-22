# Multinode — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir el MVP de Multinode — una aplicación web personal estilo "sistema operativo minimalista" en blanco y negro, con barra de comandos central que lanza módulos como ventanas flotantes, comenzando por el módulo de Notas con editor block-based.

**Architecture:** Next.js como framework principal con TypeScript. La app tiene una pantalla tipo "lienzo" con una Omnibar central. Al ejecutar un comando (`/notas`), la Omnibar se expande en una ventana flotante (Nodo) draggable con controles de minimizar/cerrar. Los módulos son componentes React independientes para facilitar su futura extracción como apps separadas.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · CSS Modules (B&W design token system) · Framer Motion (animaciones) · TipTap (editor block-based) · Jest + React Testing Library (tests)

---

## Fase 1: Scaffolding & Design System

### Task 1: Inicializar el proyecto Next.js

**Files:**
- Create: `./` (proyecto raíz)

**Step 1: Crear el proyecto Next.js con TypeScript**

```bash
npx -y create-next-app@latest ./ --typescript --eslint --no-tailwind --src-dir --app --import-alias "@/*"
```

**Step 2: Verificar que el proyecto inicia**

```bash
npm run dev
```
Expected: Servidor corriendo en `http://localhost:3000`

**Step 3: Commit inicial**

```bash
git add .
git commit -m "feat: initialize Next.js project"
```

---

### Task 2: Instalar dependencias clave

**Files:**
- Modify: `package.json`

**Step 1: Instalar Framer Motion y TipTap**

```bash
npm install framer-motion @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder
```

**Step 2: Instalar dependencias de testing**

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

**Step 3: Configurar Jest — crear `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

**Step 4: Crear `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

**Step 5: Añadir script de test en `package.json`**

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

**Step 6: Verificar que los tests corren**

```bash
npm test -- --passWithNoTests
```
Expected: `Test Suites: 0 passed`

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add core dependencies and jest config"
```

---

### Task 3: Crear el Design System (tokens B&W)

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/app/globals.css`

**Step 1: Crear `src/styles/tokens.css`**

```css
:root {
  /* Paleta Monocromática */
  --color-black: #0a0a0a;
  --color-white: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;

  /* Tipografía */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Escala tipográfica */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Bordes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.3);

  /* Glassmorphism */
  --glass-bg: rgba(250, 250, 250, 0.85);
  --glass-border: rgba(10, 10, 10, 0.08);
  --glass-blur: blur(20px);

  /* Transiciones */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-index layers */
  --z-base: 1;
  --z-window: 100;
  --z-dock: 200;
  --z-omnibar: 300;
  --z-overlay: 400;
}
```

**Step 2: Reemplazar `src/app/globals.css` completamente**

```css
@import '../styles/tokens.css';

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-black);
  background-color: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--color-black);
  color: var(--color-white);
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-gray-300);
  border-radius: 2px;
}
```

**Step 3: Verificar que la app carga con los estilos**

```bash
npm run dev
```
Expected: La página carga sin errores en consola.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add B&W design token system"
```

---

## Fase 2: El Shell — Canvas + Omnibar

### Task 4: Crear el layout principal (Canvas)

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.module.css`

**Step 1: Crear `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multinode — Tu sistema operativo personal',
  description: 'Gestiona los nodos de tu vida en un solo lugar.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

**Step 2: Crear `src/app/page.module.css`**

```css
.canvas {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.watermark {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--text-xs);
  color: var(--color-gray-300);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  user-select: none;
}
```

**Step 3: Crear `src/app/page.tsx`**

```tsx
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.canvas}>
      <span className={styles.watermark}>multinode</span>
    </main>
  )
}
```

**Step 4: Verificar visualmente**

```bash
npm run dev
```
Expected: Pantalla blanca vacía con el texto "multinode" muy sutil en la parte inferior central.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add main canvas layout"
```

---

### Task 5: Crear el componente Omnibar

**Files:**
- Create: `src/components/Omnibar/Omnibar.tsx`
- Create: `src/components/Omnibar/Omnibar.module.css`
- Create: `src/components/Omnibar/Omnibar.test.tsx`

**Step 1: Escribir el test PRIMERO — `src/components/Omnibar/Omnibar.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Omnibar from './Omnibar'

describe('Omnibar', () => {
  it('renders the search input', () => {
    render(<Omnibar onCommand={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls onCommand with the command when Enter is pressed', async () => {
    const mockOnCommand = jest.fn()
    render(<Omnibar onCommand={mockOnCommand} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '/notas{Enter}')
    expect(mockOnCommand).toHaveBeenCalledWith('notas')
  })

  it('clears input after executing a command', async () => {
    render(<Omnibar onCommand={() => {}} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, '/notas{Enter}')
    expect(input.value).toBe('')
  })

  it('shows placeholder text', () => {
    render(<Omnibar onCommand={() => {}} />)
    expect(screen.getByPlaceholderText(/escribe un comando/i)).toBeInTheDocument()
  })
})
```

**Step 2: Ejecutar tests para verificar que FALLAN**

```bash
npm test -- Omnibar
```
Expected: FAIL — Cannot find module './Omnibar'

**Step 3: Crear `src/components/Omnibar/Omnibar.module.css`**

```css
.wrapper {
  position: relative;
  z-index: var(--z-omnibar);
}

.input {
  width: 480px;
  padding: var(--space-4) var(--space-6);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 300;
  color: var(--color-black);
  background: transparent;
  border: 1.5px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  outline: none;
  text-align: center;
  letter-spacing: 0.02em;
  transition: border-color var(--transition-base), box-shadow var(--transition-base), width var(--transition-slow);
}

.input::placeholder {
  color: var(--color-gray-300);
  font-weight: 300;
}

.input:focus {
  border-color: var(--color-black);
  box-shadow: var(--shadow-md);
  text-align: left;
}
```

**Step 4: Crear `src/components/Omnibar/Omnibar.tsx`**

```tsx
'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import styles from './Omnibar.module.css'

interface OmnibarProps {
  onCommand: (command: string) => void
}

export default function Omnibar({ onCommand }: OmnibarProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      const raw = value.trim()
      const command = raw.startsWith('/') ? raw.slice(1) : raw
      onCommand(command)
      setValue('')
    }
    if (e.key === 'Escape') {
      setValue('')
      inputRef.current?.blur()
    }
  }

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        role="textbox"
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un comando… (ej: /notas)"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  )
}
```

**Step 5: Ejecutar tests para verificar que PASAN**

```bash
npm test -- Omnibar
```
Expected: PASS — 4 tests passed

**Step 6: Integrar Omnibar en `src/app/page.tsx`**

```tsx
'use client'

import Omnibar from '@/components/Omnibar/Omnibar'
import styles from './page.module.css'

export default function Home() {
  const handleCommand = (command: string) => {
    console.log('Comando recibido:', command)
  }

  return (
    <main className={styles.canvas}>
      <Omnibar onCommand={handleCommand} />
      <span className={styles.watermark}>multinode</span>
    </main>
  )
}
```

**Step 7: Verificar visualmente**

```bash
npm run dev
```
Expected: Pantalla blanca con un input elegante centrado. Al escribir `/notas` y presionar Enter, se loguea en consola.

**Step 8: Commit**

```bash
git add .
git commit -m "feat: add Omnibar component with command parsing"
```

---

### Task 6: Crear el sistema de Ventanas (NodeWindow)

**Files:**
- Create: `src/components/NodeWindow/NodeWindow.tsx`
- Create: `src/components/NodeWindow/NodeWindow.module.css`
- Create: `src/components/NodeWindow/NodeWindow.test.tsx`

**Step 1: Escribir los tests PRIMERO**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import NodeWindow from './NodeWindow'

describe('NodeWindow', () => {
  const defaultProps = {
    id: 'test-window',
    title: 'Notas',
    onClose: jest.fn(),
    onMinimize: jest.fn(),
    children: <div>Contenido de la ventana</div>,
  }

  it('renders the window title', () => {
    render(<NodeWindow {...defaultProps} />)
    expect(screen.getByText('Notas')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<NodeWindow {...defaultProps} />)
    expect(screen.getByText('Contenido de la ventana')).toBeInTheDocument()
  })

  it('calls onClose when X button is clicked', () => {
    const onClose = jest.fn()
    render(<NodeWindow {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Cerrar ventana'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onMinimize when minimize button is clicked', () => {
    const onMinimize = jest.fn()
    render(<NodeWindow {...defaultProps} onMinimize={onMinimize} />)
    fireEvent.click(screen.getByLabelText('Minimizar ventana'))
    expect(onMinimize).toHaveBeenCalledTimes(1)
  })
})
```

**Step 2: Ejecutar tests — Expected: FAIL**

```bash
npm test -- NodeWindow
```

**Step 3: Crear `src/components/NodeWindow/NodeWindow.module.css`**

```css
.window {
  position: absolute;
  width: 680px;
  min-height: 420px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-gray-100);
  cursor: grab;
  user-select: none;
}

.titlebar:active {
  cursor: grabbing;
}

.title {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-gray-600);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.controls {
  display: flex;
  gap: var(--space-2);
}

.controlBtn {
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-gray-400);
  font-size: var(--text-xs);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
  line-height: 1;
}

.controlBtn:hover {
  background: var(--color-gray-100);
  color: var(--color-black);
  border-color: var(--color-gray-300);
}

.controlBtn.close:hover {
  background: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}
```

**Step 4: Crear `src/components/NodeWindow/NodeWindow.tsx`**

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './NodeWindow.module.css'

interface NodeWindowProps {
  id: string
  title: string
  onClose: () => void
  onMinimize: () => void
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
}

export default function NodeWindow({
  id,
  title,
  onClose,
  onMinimize,
  children,
  initialPosition = { x: 0, y: 0 },
}: NodeWindowProps) {
  return (
    <motion.div
      className={styles.window}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag
      dragMomentum={false}
      style={{
        left: `calc(50% + ${initialPosition.x}px)`,
        top: `calc(50% + ${initialPosition.y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className={styles.titlebar}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={onMinimize}
            aria-label="Minimizar ventana"
          >
            —
          </button>
          <button
            className={`${styles.controlBtn} ${styles.close}`}
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  )
}
```

**Step 5: Ejecutar tests — Expected: PASS**

```bash
npm test -- NodeWindow
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add NodeWindow component with drag and animation"
```

---

### Task 7: Crear el Window Manager y el Dock

**Files:**
- Create: `src/hooks/useWindowManager.ts`
- Create: `src/components/Dock/Dock.tsx`
- Create: `src/components/Dock/Dock.module.css`
- Create: `src/hooks/useWindowManager.test.ts`

**Step 1: Escribir el test del hook PRIMERO**

```typescript
import { renderHook, act } from '@testing-library/react'
import useWindowManager from './useWindowManager'

describe('useWindowManager', () => {
  it('starts with empty windows', () => {
    const { result } = renderHook(() => useWindowManager())
    expect(result.current.windows).toHaveLength(0)
  })

  it('opens a new window', () => {
    const { result } = renderHook(() => useWindowManager())
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    expect(result.current.windows).toHaveLength(1)
    expect(result.current.windows[0].id).toBe('notas')
  })

  it('closes a window', () => {
    const { result } = renderHook(() => useWindowManager())
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    act(() => result.current.closeWindow('notas'))
    expect(result.current.windows).toHaveLength(0)
  })

  it('minimizes a window', () => {
    const { result } = renderHook(() => useWindowManager())
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    act(() => result.current.minimizeWindow('notas'))
    expect(result.current.windows[0].minimized).toBe(true)
  })

  it('restores a minimized window', () => {
    const { result } = renderHook(() => useWindowManager())
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    act(() => result.current.minimizeWindow('notas'))
    act(() => result.current.restoreWindow('notas'))
    expect(result.current.windows[0].minimized).toBe(false)
  })

  it('does not open duplicate windows', () => {
    const { result } = renderHook(() => useWindowManager())
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    act(() => result.current.openWindow({ id: 'notas', title: 'Notas' }))
    expect(result.current.windows).toHaveLength(1)
  })
})
```

**Step 2: Ejecutar tests — Expected: FAIL**

```bash
npm test -- useWindowManager
```

**Step 3: Crear `src/hooks/useWindowManager.ts`**

```typescript
import { useState, useCallback } from 'react'

export interface WindowConfig {
  id: string
  title: string
  minimized?: boolean
}

export default function useWindowManager() {
  const [windows, setWindows] = useState<WindowConfig[]>([])

  const openWindow = useCallback((config: WindowConfig) => {
    setWindows((prev) => {
      const exists = prev.some((w) => w.id === config.id)
      if (exists) {
        return prev.map((w) => w.id === config.id ? { ...w, minimized: false } : w)
      }
      return [...prev, { ...config, minimized: false }]
    })
  }, [])

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: true } : w))
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: false } : w))
  }, [])

  return { windows, openWindow, closeWindow, minimizeWindow, restoreWindow }
}
```

**Step 4: Ejecutar tests — Expected: PASS**

```bash
npm test -- useWindowManager
```

**Step 5: Crear `src/components/Dock/Dock.module.css`**

```css
.dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: var(--z-dock);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0;
  transition: height var(--transition-base), padding-bottom var(--transition-base);
}

.dock:hover,
.dock.hasItems {
  height: 48px;
  padding-bottom: var(--space-3);
}

.items {
  display: flex;
  gap: var(--space-2);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--transition-base), transform var(--transition-base);
  pointer-events: none;
}

.dock:hover .items,
.dock.hasItems .items {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.pill {
  padding: var(--space-1) var(--space-3);
  background: var(--color-black);
  color: var(--color-white);
  border-radius: 20px;
  font-size: var(--text-xs);
  font-weight: 500;
  cursor: pointer;
  border: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.pill:hover {
  background: var(--color-gray-800);
  transform: translateY(-2px);
}
```

**Step 6: Crear `src/components/Dock/Dock.tsx`**

```tsx
'use client'

import styles from './Dock.module.css'
import { WindowConfig } from '@/hooks/useWindowManager'

interface DockProps {
  minimizedWindows: WindowConfig[]
  onRestore: (id: string) => void
}

export default function Dock({ minimizedWindows, onRestore }: DockProps) {
  const hasItems = minimizedWindows.length > 0

  return (
    <div className={`${styles.dock} ${hasItems ? styles.hasItems : ''}`}>
      <div className={styles.items}>
        {minimizedWindows.map((w) => (
          <button
            key={w.id}
            className={styles.pill}
            onClick={() => onRestore(w.id)}
          >
            {w.title}
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add window manager hook and dock component"
```

---

## Fase 3: El Módulo de Notas

### Task 8: Crear el módulo de Comandos (command registry)

**Files:**
- Create: `src/modules/index.ts`
- Create: `src/modules/notes/index.ts`

**Step 1: Crear `src/modules/notes/index.ts`**

```typescript
export const notesModule = {
  id: 'notas',
  title: 'Notas',
  commands: ['notas', 'nota', 'n'],
}
```

**Step 2: Crear `src/modules/index.ts`**

```typescript
import { notesModule } from './notes'

export const modules = [notesModule]

export function resolveCommand(input: string): typeof modules[number] | null {
  const cleaned = input.toLowerCase().trim()
  return modules.find((m) => m.commands.includes(cleaned)) ?? null
}
```

**Step 3: Escribir test para `resolveCommand`**

Crear `src/modules/index.test.ts`:

```typescript
import { resolveCommand } from './index'

describe('resolveCommand', () => {
  it('resolves /notas to the notes module', () => {
    expect(resolveCommand('notas')?.id).toBe('notas')
  })

  it('resolves alias /n to the notes module', () => {
    expect(resolveCommand('n')?.id).toBe('notas')
  })

  it('returns null for unknown command', () => {
    expect(resolveCommand('desconocido')).toBeNull()
  })

  it('is case insensitive', () => {
    expect(resolveCommand('NOTAS')?.id).toBe('notas')
  })
})
```

**Step 4: Ejecutar tests — Expected: PASS**

```bash
npm test -- modules/index
```

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add module registry with command resolver"
```

---

### Task 9: Crear el Editor de Notas (TipTap)

**Files:**
- Create: `src/modules/notes/NotesEditor.tsx`
- Create: `src/modules/notes/NotesEditor.module.css`

**Step 1: Crear `src/modules/notes/NotesEditor.module.css`**

```css
.editor {
  min-height: 300px;
  outline: none;
}

/* Estilos del contenido TipTap */
.editor :global(.ProseMirror) {
  min-height: 300px;
  outline: none;
  font-family: var(--font-sans);
  color: var(--color-black);
  line-height: 1.7;
}

.editor :global(.ProseMirror h1) {
  font-size: var(--text-3xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
  line-height: 1.2;
}

.editor :global(.ProseMirror h2) {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.editor :global(.ProseMirror h3) {
  font-size: var(--text-xl);
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.editor :global(.ProseMirror p) {
  margin-bottom: var(--space-3);
  font-size: var(--text-base);
  color: var(--color-gray-800);
}

.editor :global(.ProseMirror ul),
.editor :global(.ProseMirror ol) {
  padding-left: var(--space-6);
  margin-bottom: var(--space-3);
}

.editor :global(.ProseMirror li) {
  margin-bottom: var(--space-1);
  color: var(--color-gray-800);
}

.editor :global(.ProseMirror code) {
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.editor :global(.ProseMirror blockquote) {
  border-left: 3px solid var(--color-black);
  padding-left: var(--space-4);
  color: var(--color-gray-600);
  font-style: italic;
  margin: var(--space-4) 0;
}

/* Placeholder */
.editor :global(.ProseMirror p.is-editor-empty:first-child::before) {
  color: var(--color-gray-300);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
```

**Step 2: Crear `src/modules/notes/NotesEditor.tsx`**

```tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import styles from './NotesEditor.module.css'

export default function NotesEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Empieza a escribir... escribe / para ver comandos de bloque',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  })

  return <EditorContent editor={editor} className={styles.editor} />
}
```

**Step 3: Verificar visualmente integrando al canvas**

En `src/app/page.tsx`, importar `NotesEditor` temporalmente para verificar que TipTap funciona.

```bash
npm run dev
```
Expected: El editor muestra el placeholder correctamente.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add TipTap notes editor with B&W styles"
```

---

## Fase 4: Integración Final del Shell

### Task 10: Conectar todo en el Canvas principal

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Actualizar `src/app/page.tsx` con la integración completa**

```tsx
'use client'

import { AnimatePresence } from 'framer-motion'
import Omnibar from '@/components/Omnibar/Omnibar'
import NodeWindow from '@/components/NodeWindow/NodeWindow'
import Dock from '@/components/Dock/Dock'
import NotesEditor from '@/modules/notes/NotesEditor'
import useWindowManager from '@/hooks/useWindowManager'
import { resolveCommand } from '@/modules'
import styles from './page.module.css'

const moduleContent: Record<string, React.ReactNode> = {
  notas: <NotesEditor />,
}

export default function Home() {
  const { windows, openWindow, closeWindow, minimizeWindow, restoreWindow } = useWindowManager()

  const handleCommand = (command: string) => {
    const mod = resolveCommand(command)
    if (mod) {
      openWindow({ id: mod.id, title: mod.title })
    }
  }

  const visibleWindows = windows.filter((w) => !w.minimized)
  const minimizedWindows = windows.filter((w) => w.minimized)

  return (
    <main className={styles.canvas}>
      <Omnibar onCommand={handleCommand} />

      <AnimatePresence>
        {visibleWindows.map((w, index) => (
          <NodeWindow
            key={w.id}
            id={w.id}
            title={w.title}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            initialPosition={{ x: index * 30, y: index * 30 }}
          >
            {moduleContent[w.id]}
          </NodeWindow>
        ))}
      </AnimatePresence>

      <Dock
        minimizedWindows={minimizedWindows}
        onRestore={restoreWindow}
      />

      <span className={styles.watermark}>multinode</span>
    </main>
  )
}
```

**Step 2: Verificar el flujo completo**

```bash
npm run dev
```

Checklist manual:
- [ ] Pantalla en blanco con input centrado
- [ ] Escribir `/notas` + Enter abre una ventana
- [ ] La ventana es draggable
- [ ] El botón `—` minimiza y aparece en el Dock inferior
- [ ] Hacer hover sobre el Dock muestra la pastilla "Notas"
- [ ] Hacer clic en la pastilla restaura la ventana
- [ ] El botón `✕` cierra la ventana completamente
- [ ] El editor TipTap funciona dentro de la ventana

**Step 3: Ejecutar todos los tests**

```bash
npm test
```
Expected: Todos los tests pasan.

**Step 4: Commit final**

```bash
git add .
git commit -m "feat: integrate shell — canvas, omnibar, window manager and notes module"
```

---

## Resumen del MVP

Al completar estas tareas, Multinode tendrá:

1. ✅ **Canvas minimalista** en blanco con Omnibar central
2. ✅ **Sistema de ventanas** flotantes, draggables, con minimizar/cerrar
3. ✅ **Dock oculto** que aparece al hover con ventanas minimizadas
4. ✅ **Módulo de Notas** con editor TipTap y soporte de bloques
5. ✅ **Command Registry** extensible para futuros módulos

---

*Plan creado: 2026-02-22 · Basado en el diseño aprobado: 2026-02-22-multinode-design.md*
