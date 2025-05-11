# Dockerfile for Next.js project optimized for Azure Web App deployment

# 1. Base Stage: Use an official Node.js runtime as a parent image
FROM node:20-alpine AS base

# 2. Dependencies Stage: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock or pnpm-lock.yaml)
COPY package.json package-lock.json* ./
# COPY package.json yarn.lock* ./
# COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci --only=production 
# RUN yarn install --frozen-lockfile --production
# RUN pnpm install --frozen-lockfile --prod

# 3. Build Stage: Build the Next.js application
FROM base AS builder
WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time arguments if any, e.g., for environment variables
# ARG NEXT_PUBLIC_FORMSPREE_FORM_ID
# ENV NEXT_PUBLIC_FORMSPREE_FORM_ID=${NEXT_PUBLIC_FORMSPREE_FORM_ID}

# Build the Next.js application
RUN npm run build
# RUN yarn build
# RUN pnpm build

# 4. Runner Stage: Prepare the final image
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
# ENV NEXT_PUBLIC_FORMSPREE_FORM_ID=${NEXT_PUBLIC_FORMSPREE_FORM_ID} # You can set this at runtime

# For Azure Web App, using output: 'standalone' is recommended for better performance
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port that Azure Web App expects (8080)
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
# CMD ["yarn", "start"]
# CMD ["pnpm", "start"]