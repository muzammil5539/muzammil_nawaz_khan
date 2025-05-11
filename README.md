# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. This portfolio showcases my projects, skills, and professional experience with a clean and interactive design.

## 🚀 Features

- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Mode**: Theme toggle with persistent state
- **Smooth Animations**: Subtle transitions and hover effects
- **Modern UI Components**: Clean and professional user interface
- **SEO Optimized**: Built with SEO best practices
- **Type-Safe**: Built with TypeScript for better development experience

## 🏗️ Project Structure

```
src/
├── app/
│   └── page.tsx               # Main page component
├── components/
│   ├── Header.tsx            # Navigation and theme toggle
│   ├── Hero.tsx              # Hero section with introduction
│   ├── Projects.tsx          # Projects showcase section
│   ├── ProjectCard.tsx       # Individual project card component
│   ├── Experience.tsx        # Professional experience section
│   ├── ExperienceCard.tsx    # Individual experience card
│   ├── Skills.tsx            # Skills and technologies section
│   ├── Contact.tsx           # Contact form section
│   ├── Footer.tsx            # Footer with navigation and socials
│   └── TypeWriter.tsx        # Animated typing effect
└── context/
    └── ThemeContext.tsx      # Dark/Light theme context
```

## 🧱 Components Overview

### Header (`Header.tsx`)

- Fixed navigation bar with logo
- Responsive mobile menu
- Dark/Light theme toggle
- Resume download button

### Hero Section (`Hero.tsx`)

- Animated introduction with TypeWriter effect
- Professional image
- Quick navigation buttons
- Gradient background effects

### Projects Section (`Projects.tsx`, `ProjectCard.tsx`)

- Grid layout of project cards
- Interactive project cards with:
  - Project image/preview
  - Title and description
  - Technology tags
  - Hover effects and animations

### Experience Section (`Experience.tsx`, `ExperienceCard.tsx`)

- Timeline of professional experience
- Detailed cards with:
  - Role and company information
  - Key responsibilities
  - Technologies used
  - Video demonstrations (where applicable)

### Skills Section (`Skills.tsx`)

- Categorized skill bubbles
- Interactive hover effects
- Four main categories:
  - AI & Machine Learning
  - Programming & Tools
  - Domain Expertise
  - Frameworks & Libraries

### Contact Section (`Contact.tsx`)

- Contact form with validation
- Input fields for:
  - Name
  - Email
  - Subject
  - Message
- Form submission handling

### Footer (`Footer.tsx`)

- Site navigation links
- Social media links
- Copyright information
- Logo and branding

## 🎨 Theme Context

The `ThemeContext.tsx` manages the application's theme state:

- Toggles between dark and light modes
- Persists theme preference
- Provides theme context to all components

## 🛠️ Technologies Used

- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Icons**: Icon components
- **React Context**: State management

## 📱 Responsive Design

The portfolio is fully responsive with:

- Mobile-first approach
- Breakpoint-specific layouts
- Optimized images and assets
- Touch-friendly interactions

## 🎯 SEO Optimization

- Semantic HTML structure
- Meta tags and descriptions
- Optimized asset loading
- Accessibility considerations

## 🚀 Performance Optimization

- Image optimization with Next.js
- Lazy loading components
- Minimized bundle size
- Efficient state management

## 🌐 Deployment

This application is configured for deployment to Azure Web App using Docker containers and GitHub Actions.

For detailed deployment instructions, see [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)

### Key Deployment Features:

- Containerized application using Docker
- CI/CD pipeline with GitHub Actions
- Auto-deployment on code push
- Environment configuration for development and production
- Azure Web App optimized Docker configuration

## 👥 Contact

For any inquiries or collaborations, please reach out through:

- The contact form on the website
- [LinkedIn](https://www.linkedin.com/in/mnk539/)
- [GitHub](https://github.com/muzammil5539)
- Email: mnk.7muzammil86@gmail.com
