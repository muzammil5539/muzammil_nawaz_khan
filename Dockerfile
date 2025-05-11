# Dockerfile for Next.js project

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
RUN npm install
# RUN yarn install --frozen-lockfile
# RUN pnpm install --frozen-lockfile

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
# ENV NEXT_PUBLIC_FORMSPREE_FORM_ID=${NEXT_PUBLIC_FORMSPREE_FORM_ID} # You can set this at runtime

# Copy the .next/standalone folder (if you configure output: 'standalone' in next.config.ts)
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

# For a standard Next.js build (without output: 'standalone')
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# For output: 'standalone', the command would be: CMD ["node", "server.js"]
CMD ["npm", "start"]
# CMD ["yarn", "start"]
# CMD ["pnpm", "start"]