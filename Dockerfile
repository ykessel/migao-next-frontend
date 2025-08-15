# ---- Build Stage ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit

# Copy only necessary files for build
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

# Copy built assets and minimal dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js* ./ # only if exists

USER nextjs

EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]