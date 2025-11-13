FROM node:20-alpine AS builder

WORKDIR /app

# 1. Ставим зависимости
COPY package*.json ./
RUN npm install

# 2. Копируем исходники
COPY . .

# 3. Сборка TypeScript -> dist
RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app

# 4. Копируем node_modules и dist из builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
