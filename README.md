# EsportsHall

<div align="center">
  <img src="/public/images/esportshall.png" alt="EsportsHall Logo" width="200"/>

  [![Next.js](https://img.shields.io/badge/Next.js-14.1.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.0-blue?style=flat-square&logo=postgresql)](https://neon.tech)
  [![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

  La plataforma definitiva para la comunidad española de esports
</div>

## 🚀 Inicio Rápido

### 1. Instalar Bun

**macOS**
```bash
# Usando curl
curl -fsSL https://bun.sh/install | bash

# O usando Homebrew
brew tap oven-sh/bun
brew install bun
```

**Linux**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows**
```bash
# 1. Instalar WSL (Windows Subsystem for Linux)
wsl --install

# 2. Reiniciar el sistema

# 3. En WSL, ejecutar:
curl -fsSL https://bun.sh/install | bash
```

### 2. Configurar el Proyecto
```bash
# Clonar e instalar
bun create esportshall
cd esportshall
bun install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar desarrollo
bun run dev
```

## 📝 Variables de Entorno

```bash
DATABASE_URL="postgresql://user:pass@db.neon.tech/dbname"
AUTH_SECRET="tu-secreto"
VERCEL_URL="http://localhost:3000"
```

## 🛠️ Stack Principal

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript
- **Backend**: PostgreSQL (Neon.tech), Edge Runtime
- **Desarrollo**: Bun Runtime & Package Manager

## 📦 Estructura del Proyecto

```
esportshall/
├── src/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── auth/          # Autenticación
│   │   └── main/          # Funcionalidades principales
│   │       ├── communities/   # Gestión de comunidades
│   │       ├── news/         # Noticias y actualizaciones
│   │       ├── players/      # Perfiles de jugadores
│   │       ├── profile/      # Gestión de perfil
│   │       ├── teams/        # Gestión de equipos
│   │       └── tournaments/  # Sistema de torneos
│   ├── components/        # Componentes compartidos
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades y configuraciones
│   └── providers/        # Providers globales
├── public/
│   └── images/          # Imágenes y assets
└── tests/               # Tests
```

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)

</div>

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
