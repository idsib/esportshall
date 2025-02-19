<div align="center">
  <img src="/public/images/esportshall.png" alt="EsportsHall Logo" width="200"/>

  # EsportsHall

  [![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.0-blue?style=flat-square&logo=postgresql)](https://neon.tech)
  [![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Bun](https://img.shields.io/badge/Bun-1.0.26-f9f1e1?style=flat-square&logo=bun)](https://bun.sh/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

  **La plataforma definitiva para la comunidad española de esports**

  [Demo](https://esportshall.vercel.app) · [Reportar Bug](https://github.com/tu-usuario/esportshall/issues) · [Solicitar Feature](https://github.com/tu-usuario/esportshall/issues)

</div>

---

## 🚀 Inicio Rápido

### Prerrequisitos

- [Bun](https://bun.sh/) >= 1.0.26
- [PostgreSQL](https://neon.tech) (cuenta en Neon.tech)

### Instalación en 3 Pasos

1. **Instalar Bun (macOS, Linux, o WSL)**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   # O usando Homebrew en macOS
   brew tap oven-sh/bun
   brew install bun
   ```

2. **Clonar e instalar dependencias**
   ```bash
   bun create esportshall
   cd esportshall
   bun install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   bun run dev
   ```

Visita `http://localhost:3000` 🎮

## 🛠️ Stack Tecnológico

### Frontend
- **Runtime & Package Manager**: Bun 1.0.26
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion

### Backend
- **Database**: PostgreSQL 17 (Neon.tech)
- **Deployment**: Vercel Edge Runtime

## 🔑 Variables de Entorno

```bash
# .env
DATABASE_URL="postgresql://user:pass@db.neon.tech/dbname"
AUTH_SECRET="tu-secreto"
VERCEL_URL="http://localhost:3000"
```

## 🎯 Características Principales

- ⚡️ **Rendimiento Optimizado**
  - Bun Runtime
  - Edge Functions
  - Streaming SSR
  
- 🎨 **UI/UX Moderna**
  - Modo Oscuro/Claro
  - Animaciones Fluidas
  - Diseño Responsivo
  
- 🔒 **Seguridad**
  - Auth.js
  - Rate Limiting
  - Protección CSRF

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

<div align="center">
  
  **[⬆ Volver arriba](#esportshall)**
  
  [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)

</div>

## 📦 Estructura del Proyecto

```
esportshall/
├── public/                # Archivos estáticos e imágenes
├── src/
│   ├── app/              # App router y páginas
│   │   ├── components/   # Componentes de la aplicación
│   │   ├── context/     # Contextos de React (tema, auth)
│   │   └── styles/      # Estilos y configuración CSS
│   ├── server/          # Lógica del servidor
│   │   ├── db/         # Configuración de PostgreSQL
│   │   │   ├── migrations/  # Migraciones de la base de datos
│   │   │   └── schema/     # Esquemas y modelos
│   │   ├── api/        # Endpoints de la API
│   │   │   ├── auth/      # Autenticación y autorización
│   │   │   ├── teams/     # Endpoints de equipos
│   │   │   └── tournaments/ # Endpoints de torneos
│   │   └── utils/      # Utilidades del servidor
│   ├── lib/            # Utilidades compartidas
│   │   ├── types/     # Tipos TypeScript
│   │   └── config/    # Configuraciones globales
│   └── hooks/         # Custom hooks de React
└── tests/             # Tests unitarios y de integración
    ├── api/          # Tests de API
    └── components/   # Tests de componentes
```

### 🔧 Frameworks y Herramientas

```
Backend:
├── Database
│   ├── PostgreSQL 17    # Base de datos principal
│   └── Neon.tech       # Hosting de PostgreSQL
├── API
│   ├── Next.js API     # API Routes
│   └── Edge Runtime    # Funciones Edge
└── Testing
    ├── Bun Test       # Testing nativo de Bun
    └── Playwright     # Testing E2E
```
