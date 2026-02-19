# Rayelus Newsletter

Una plataforma minimalista y moderna para blogging y gestión de newsletters, construida con las últimas tecnologías web.
<img width="1018" height="557" alt="image" src="https://github.com/user-attachments/assets/645c0189-63e6-4f43-a12a-ee9e0f220a71" />

## Características Principales

### Blog Público
- Interfaz de lectura limpia y optimizada.
- Diseño minimalista enfocado en el contenido.
- SEO optimizado con metadatos dinámicos.

### Newsletter
- Sistema de suscripción y baja (unsubscribe) automático.
- Envío de correos transaccionales y boletines masivos usando **Resend**.
- Plantillas de correo personalizadas con React Email.

### Panel de Administración
- **Dashboard Protegido**: Autenticación con NextAuth y capa extra de seguridad por IP.
- **Editor Rico (WYSIWYG)**: Integración avanzada con **Tiptap** para escribir posts con formato, listas, imágenes y bloques de código con resaltado de sintaxis.
- Gestión completa de posts (Crear, Editar, Borrar, Publicar/Despublicar).
- Envío de newsletters directamente desde el editor.

## Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) (vía [Prisma ORM](https://www.prisma.io/))
- **Emails**: [Resend](https://resend.com/) + [React Email](https://react.email/)
- **Editor**: [Tiptap](https://tiptap.dev/)

## Arquitectura y Tipado

Este proyecto sigue un enfoque moderno de desarrollo con TypeScript:

> **Nota sobre `types.ts`**:
> No encontrarás un archivo centralizado `types.ts` en este proyecto. Esto es intencional:
> 1. **Prisma**: Los tipos de la base de datos se generan automáticamente en `@prisma/client` basados en el esquema `schema.prisma`. Esto garantiza que los tipos siempre estén sincronizados con la DB.
> 2. **Componentes**: Las interfaces específicas (como `PostCardProps`) se definen ("co-locan") en el mismo archivo del componente que las utiliza, promoviendo la modularidad.

## Capturas de pantalla

<img width="1018" height="557" alt="image" src="https://github.com/user-attachments/assets/02115ede-b6b1-4791-b115-c0168a0c17f0" />
<img width="1018" height="557" alt="image" src="https://github.com/user-attachments/assets/578d31f2-fe3a-4057-9a60-84c2215cffd5" />
<img width="1018" height="557" alt="image" src="https://github.com/user-attachments/assets/0034c472-67af-42e8-b696-611734e759f8" />

## Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone <repo-url>
   cd rayelus_newsletter
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` con las claves necesarias (DATABASE_URL, RESEND_API_KEY, NEXTAUTH_SECRET, etc.).

4. **Correr migraciones de base de datos**:
   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.
