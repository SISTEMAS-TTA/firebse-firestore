# MVP Task Dashboard - Firebase & Next.js

Un sistema de gestión de tareas desarrollado con Next.js 15, Firebase y TypeScript.

## ✨ Características

- 🔐 **Autenticación completa** con Firebase Auth
- 📋 **Gestión de tareas** con Firestore
- 👥 **Sistema de roles** (Usuario/Admin)
- 🎨 **UI moderna** con Tailwind CSS
- 🔒 **Rutas protegidas** con AuthWrapper
- 📱 **Diseño responsivo**

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd mvp-task-dashboard-firebase-nextjs
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication (Email/Password)
3. Crea una base de datos Firestore
4. Copia el archivo `.env.example` a `.env.local`
5. Completa las variables de entorno con tu configuración de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 4. Configurar Firestore

Crea las siguientes colecciones en Firestore:

#### Colección `users`

```
users/{userId}
├── email: string
├── role: "user" | "admin"
└── createdAt: timestamp
```

#### Colección `tasks`

```
tasks/{taskId}
├── title: string
├── description: string
├── assigneeId: string
├── deleted: boolean
└── createdAt: timestamp
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── AuthWrapper.tsx      # Protección de rutas
│   │   ├── LoginForm.tsx        # Formulario de login
│   │   ├── NavSidebar.tsx       # Barra de navegación lateral
│   │   ├── RegisterForm.tsx     # Formulario de registro
│   │   └── TaskList.tsx         # Lista de tareas
│   ├── hooks/
│   │   └── useUser.tsx          # Hook para gestión de usuario
│   ├── lib/
│   │   └── firebase.ts          # Configuración de Firebase
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── login/
│   │   └── page.tsx             # Página de login
│   ├── register/
│   │   └── page.tsx             # Página de registro
│   ├── tasks/
│   │   └── page.tsx             # Página de tareas
│   ├── logs/
│   │   └── page.tsx             # Página de logs (admin)
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Dashboard principal
```

## 🔐 Rutas y Funcionalidades

### Rutas Públicas

- `/login` - Iniciar sesión
- `/register` - Crear cuenta

### Rutas Protegidas (requieren autenticación)

- `/` - Dashboard principal
- `/tasks` - Gestión de tareas
- `/logs` - Logs del sistema (solo admin)

### Funcionalidades por Rol

#### Usuario

- ✅ Ver dashboard
- ✅ Ver sus tareas asignadas
- ✅ Cambiar configuración personal

#### Admin

- ✅ Todas las funcionalidades de usuario
- ✅ Acceso a logs del sistema
- 🔄 Gestionar usuarios (próximamente)
- 🔄 Asignar tareas (próximamente)

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Estado**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router

## 📋 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

## 🔒 Seguridad

- Autenticación basada en Firebase Auth
- Rutas protegidas con AuthWrapper
- Validación de tipos con TypeScript
- Variables de entorno para configuración sensible

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático con cada push

### Otros proveedores

- Netlify
- AWS Amplify
- Firebase Hosting

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.
