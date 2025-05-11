# Azure Web App Deployment Guide

This guide explains how to deploy this Next.js portfolio application to Azure Web App using Docker containers and GitHub Actions.

## Prerequisites

1. An Azure account with an active subscription
2. A GitHub account
3. Azure CLI installed (optional, for manual deployment)
4. Git installed on your local machine

## Deployment Process

### Step 1: Create Azure Resources

1. Log in to the [Azure Portal](https://portal.azure.com/)
2. Create a new Resource Group (or use an existing one)
3. Create a new Web App with the following settings:
   - **Publish**: Docker Container
   - **Operating System**: Linux
   - **Region**: Select a region close to your target audience
   - **App Service Plan**: Select an appropriate plan (B1 or higher recommended)
   - **SKU and size**: Select according to your needs

### Step 2: Configure GitHub Secrets

1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**
2. Create the following secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE`:
     - Go to your Azure Web App in the Azure Portal
     - Select **Overview** > **Get publish profile**
     - Download the file and copy its contents into this secret

### Step 3: Configure Azure Web App for GitHub Container Registry

1. In your Azure Web App, go to **Settings** > **Configuration**
2. Add the following Application Settings:
   - `DOCKER_REGISTRY_SERVER_URL`: `https://ghcr.io`
   - `DOCKER_REGISTRY_SERVER_USERNAME`: Your GitHub username
   - `DOCKER_REGISTRY_SERVER_PASSWORD`: Your GitHub Personal Access Token (with `read:packages` scope)

### Step 4: Update GitHub Actions Workflow

1. In your GitHub repository, update the `.github/workflows/azure-container-webapp.yml` file
2. Set the `AZURE_WEBAPP_NAME` to match your Azure Web App name
3. Commit and push these changes to your repository

### Step 5: Trigger the Deployment

1. Push changes to your main/master branch, or
2. Go to the **Actions** tab in your GitHub repository and manually trigger the workflow

## Configuring Environment Variables

For environment-specific variables:

1. In your Azure Web App, go to **Settings** > **Configuration**
2. Add any required environment variables, such as:
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID`
   - Any other API keys or configuration values

## Monitoring and Troubleshooting

1. **Logs**: Access logs in Azure Portal > Your Web App > **Monitoring** > **Log stream**
2. **Diagnostics**: Enable App Service Logs for more detailed logging
3. **Metrics**: Monitor performance in Azure Portal > Your Web App > **Monitoring** > **Metrics**

## Custom Domain and SSL

1. In the Azure Portal, go to your Web App > **Settings** > **Custom domains**
2. Follow the instructions to add your custom domain
3. Enable managed SSL certificates or upload your own SSL certificate

## Scaling

1. In the Azure Portal, go to your Web App > **Settings** > **Scale up (App Service plan)**
2. Select an appropriate pricing tier based on your needs
3. For horizontal scaling, go to **Settings** > **Scale out (App Service plan)**

## CDN Integration

For better performance, especially for static assets:

1. In the Azure Portal, create a new CDN profile
2. Add an endpoint pointing to your Web App
3. Configure caching rules for optimal performance

## Best Practices

1. Use `output: 'standalone'` in your Next.js configuration for optimal containerization
2. Implement health checks in your application
3. Use separate environments for staging and production
4. Regularly update your dependencies
5. Set up monitoring and alerts for your application
