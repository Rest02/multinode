# Multinode — Documento de Diseño
**Fecha:** 2026-02-22  
**Estado:** Aprobado por el usuario ✅  
**Versión:** 1.0

---

## 1. Visión General

**Multinode** es una aplicación web personal de gestión de vida diaria. Su propósito es centralizar múltiples áreas de la vida del usuario (notas, salud, videojuegos, proyectos, etc.) en un único entorno de alta productividad, con una estética minimalista premium en blanco y negro.

La filosofía de diseño es **"Menos es más"**: un lienzo vacío y elegante donde el usuario invoca las herramientas que necesita, cuando las necesita, sin cluttering visual.

---

## 2. Principios de Diseño

- **Monocromático:** Paleta estrictamente de **Blanco y Negro** con sutiles grises para profundidad y sombras.
- **Tipografía como protagonista:** Fuentes sans-serif modernas y limpias (ej: Inter, DM Sans) para comunicar elegancia y orden.
- **Espacios amplios:** El "vacío" es parte del diseño, no un error.
- **Modularidad real:** Cada funcionalidad es un "Nodo" independiente construido como módulo autocontenido, preparado para ser exportado como aplicación independiente en el futuro.

---

## 3. Arquitectura de Navegación: The Command Hub

### Pantalla Principal
- Un **lienzo en blanco** (fondo blanco o negro, aún por definir según preferencia del usuario).
- Al centro, una única **Barra de Comandos (Omnibar)**: una caja de texto minimalista y elegante, como un campo de búsqueda premium.
- No hay menús laterales, no hay iconos flotantes. Solo el Omnibar.

### Activación de Módulos
El usuario escribe un comando precedido por `/` en el Omnibar:

| Comando       | Módulo que abre            |
|---------------|----------------------------|
| `/notas`      | Editor de Notas            |
| `/salud`      | Dashboard de Salud         |
| `/juegos`     | Stats de Videojuegos       |
| `/trabajo`    | Proyectos y Tareas         |
| `/alimentacion` | Registro de Dieta        |
| `/estudios`   | Tracker de Estudios        |
| `/finanzas`   | Control de Finanzas        |
| *(Expandible)* | Nuevos módulos futuros   |

La barra tendrá **autocompletado predictivo**: al escribir `/no`, sugiere `/notas` antes de que el usuario termine.

---

## 4. Gestión de Ventanas (Window Management)

### La Transición — "The Growing Box"
Al ejecutar un comando (ej: `/notas`), la propia caja del Omnibar se **expande orgánicamente** con una animación suave hacia afuera, convirtiéndose en una ventana flotante (un "Nodo") que ocupa una porción de la pantalla.

- La animación debe sentirse **fluida y física**, como si el cuadro tuviera peso y expansión natural.

### Controles de Ventana
Cada Nodo (ventana abierta) tendrá en su barra superior:
- **Título del módulo** (ej: "Notas")
- **Botón Minimizar** (`—`): Contrae la ventana al Dock invisible.
- **Botón Cerrar** (`✕`): Cierra el Nodo completamente.
- **Barra de arrastre:** El usuario puede hacer drag & drop para reposicionar el Nodo en la pantalla.

### Multitarea
El usuario puede tener **múltiples Nodos abiertos** al mismo tiempo, posicionados libremente en el lienzo. Puede abrir el Omnibar de nuevo (atajos de teclado, ej: `Ctrl+K` o `Cmd+K`) para lanzar un nuevo módulo adicional.

### El Dock Oculto (Hidden Taskbar)
- Una **línea ultra-fina** en la parte inferior de la pantalla, **invisible por defecto**.
- Al pasar el cursor sobre ella, aparece con suavidad (fade-in) mostrando los **títulos de los módulos minimizados** como pequeñas pastillas negras/blancas.
- Hacer clic en una pastilla **restaura** la ventana con una animación inversa (expand desde el dock).

---

## 5. Módulo Prioritario: Notas

El primer módulo a construir es el de **Notas**, que servirá como base para validar la arquitectura completa.

### Editor Block-Based
- **Modelo:** Similar a Notion, pero en blanco y negro.
- **Bloques:** El contenido se organiza en bloques apilables (párrafos, encabezados, listas, imágenes, etc.).
- **Sin barra de herramientas obvia:** La interfaz del editor es un lienzo limpio. Los controles de formato aparecen al seleccionar texto (tooltip flotante) o al escribir un comando.

### Comandos Internos del Editor (`/`)
Al escribir `/` dentro del editor, se despliega un menú contextual flotante con opciones de bloque:

| Comando    | Función                   |
|------------|---------------------------|
| `/h1`      | Título H1                 |
| `/h2`      | Título H2                 |
| `/h3`      | Título H3                 |
| `/lista`   | Lista con viñetas          |
| `/numerado`| Lista numerada            |
| `/separator` | Línea divisoria         |
| `/codigo`  | Bloque de código          |
| `/cita`    | Cita (Blockquote)         |
| *(Expandible)* | Nuevos tipos de bloque |

### Conectividad con otros Módulos
Dentro de una nota, el usuario puede **insertar widgets de datos de otros módulos** (ej: insertar un resumen de sus stats de salud), cumpliendo la visión de Ecosistema Conectado (Opción B pactada en el diseño).

---

## 6. Hoja de Ruta de Módulos

El desarrollo se hará de forma **incremental**, priorizando:

1. 🏗️ **Shell de la Aplicación** — El lienzo, el Omnibar, el sistema de ventanas y el Dock.
2. 📝 **Módulo Notas** — El editor block-based con comandos `/`.
3. 💚 **Módulo Salud** — Registros de ejercicio, sueño, bienestar.
4. 🎮 **Módulo Videojuegos** — Stats, horas jugadas, logros.
5. 💼 **Módulo Trabajo/Proyectos** — Tareas, plazos, proyectos personales.
6. 🍎 **Módulo Alimentación** — Registro de dieta y nutrición.
7. 📚 **Módulo Estudios** — Tracker de cursos, tecnologías aprendidas.
8. 💰 **Módulo Finanzas** — Control de gastos e ingresos.

---

## 7. Stack Tecnológico (Preliminar)

- **Frontend:** Next.js (React) — permite modularidad, routing y escalabilidad hacia múltiples usuarios en el futuro.
- **Estilos:** CSS Modules + Variables CSS (para mantener el sistema B&W centralizado).
- **3D/Animaciones:** Framer Motion para transiciones suaves del "Growing Box" y el Dock.
- **Editor de Notas:** `TipTap` (editor extensible basado en ProseMirror) — permite comandos `/` y bloques personalizados.
- **Base de Datos:** TBD (SQLite para MVP personal → PostgreSQL al escalar a múltiples usuarios).

---

## 8. Consideraciones Futuras

- **Multi-usuario:** La arquitectura modular facilita la transición a una app con autenticación, perfiles y datos por usuario.
- **Exportar Módulos:** Al ser cada Nodo un módulo autocontenido, el código de `/notas` podría ser extraído como una aplicación independiente de "Editor de Notas" con mínima refactorización.
- **Temas:** Aunque el MVP es estrictamente B&W, la arquitectura del sistema de diseño soportará temas de color en versiones futuras.

---

*Documento generado durante la sesión de brainstorming del 2026-02-22.*  
*Próximo paso: Crear el plan de implementación con la skill `writing-plans`.*
