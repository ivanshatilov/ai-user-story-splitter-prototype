# =========================
# 1) Стадия сборки (builder)
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем весь проект внутрь контейнера
COPY . .

# Собираем Mastra (создаст .mastra/output/index.js и mastra.mjs)
RUN npm run build


# =========================
# 2) Стадия рантайма (production)
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

# Только prod-зависимости
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем собранные артефакты Mastra
COPY --from=builder /app/.mastra ./.mastra

# (по желанию) Если нужны какие-то ещё файлы / конфиги — копируй их тут
# COPY --from=builder /app/src ./src

# Порт, на котором Mastra поднимает API (по умолчанию 4111)
EXPOSE 4111

# Запуск Mastra-сервера
CMD ["node", ".mastra/output/index.mjs"]
