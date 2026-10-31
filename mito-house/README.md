# Mito House · Menú (Vercel + Upstash Redis)

Estructura: public/index.html (web) · api/login.js · api/dishes.js · api/_lib.js

## Despliegue
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com: Add New > Project > importa el repo (Framework Preset: Other) > Deploy.
3. En el proyecto: Storage > Marketplace > Upstash Redis (plan gratis) > Connect to Project.
   Vercel agrega solo KV_REST_API_URL y KV_REST_API_TOKEN.
4. Settings > Environment Variables, agrega:
   - ADMIN_USER = tu usuario
   - ADMIN_PASS = tu contraseña (larga)
   - AUTH_SECRET = texto aleatorio de 32+ caracteres
5. Deployments > Redeploy (para que tome las variables).
6. Genera el QR con la URL de producción (o tu dominio propio), no con la de preview.

## Pruebas locales
npm i -g vercel && vercel link && vercel env pull && vercel dev
