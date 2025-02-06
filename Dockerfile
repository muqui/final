# Usamos una imagen optimizada de Node.js
FROM node:18-alpine 

# Establecer el directorio de trabajo
WORKDIR /app 

# Copiar package.json e instalar dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiar el resto del código y compilar TypeScript
COPY . . 
RUN npm run build  # 👈 Asegurar que la compilación genera dist/main.js

# Exponer el puerto (Render lo asigna automáticamente)
EXPOSE 3000 

# Comando para ejecutar la aplicación en producción
CMD ["node", "dist/main.js"]
