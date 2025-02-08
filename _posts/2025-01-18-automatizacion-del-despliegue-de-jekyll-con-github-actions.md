---
title: Automatización del Despliegue de Jekyll con GitHub Actions
image: https://github.com/user-attachments/assets/f714f62e-1bda-4502-8290-ddb5e72cfe5e
date: 18-01-2025
categories: [github,github actions,jekyll,github pages,gemfile]
tags: [github,github actions,jekyll,github pages,gemfile]
pin: false
comments: false
render_with_liquid: false
---


## 🚀 Automatización del Despliegue de Jekyll con GitHub Actions

Si tienes un sitio web construido con [Jekyll](https://jekyllrb.com/) y lo alojas en **GitHub Pages**, sabrás que gestionar el flujo de trabajo de despliegue manualmente puede ser tedioso. La buena noticia es que **GitHub Actions** puede ayudarte a automatizar este proceso, desde la compilación de tu sitio hasta el despliegue en producción. 🌐

En este post, te guiaré para configurar **GitHub Actions** en tu repositorio de GitHub, usar un `Gemfile` para gestionar dependencias, y asegurarte de que tu sitio Jekyll se compile y despliegue sin problemas. 🛠️

### ¿Qué es GitHub Actions? 🤔

[**GitHub Actions**](https://github.com/features/actions) es una herramienta que te permite automatizar tareas como pruebas, compilación y despliegue, directamente desde tu repositorio en GitHub. Con GitHub Actions, puedes configurar flujos de trabajo (workflows) que se ejecutan en respuesta a ciertos eventos, como un `push` a tu repositorio o la creación de un `pull request`. 💻

### Paso 1: Configurar el `Gemfile` para Jekyll 📄

El primer paso es asegurarte de que tu proyecto Jekyll esté correctamente configurado con un archivo `Gemfile`. Este archivo es crucial para gestionar las dependencias de Ruby que tu sitio necesita para funcionar correctamente, incluyendo **Jekyll** y otros plugins.

1. Crea un archivo `Gemfile` en la raíz de tu repositorio si no lo tienes aún:

   ```ruby
   source 'https://rubygems.org'

   gem 'jekyll', '~> 4.0'
   gem 'github-pages', group: :jekyll_plugins
   ```

2. En tu terminal, corre el siguiente comando para instalar las dependencias de Ruby:

   ```bash
   bundle install
   ```

   Esto asegura que todas las gemas necesarias (como `jekyll` y `github-pages`) estén disponibles y configuradas. 📦

### Paso 2: Crear el archivo de flujo de trabajo de GitHub Actions ⚙️

Ahora que tu proyecto Jekyll está listo, vamos a configurar **GitHub Actions** para automatizar la compilación y el despliegue del sitio. Los flujos de trabajo de GitHub Actions se configuran a través de archivos YAML ubicados en el directorio `.github/workflows`.

1. Crea el directorio `.github/workflows` si no existe en tu proyecto.

2. Crea un archivo dentro de `.github/workflows` llamado `deploy.yml` para definir el flujo de trabajo. El archivo debe tener este contenido:

   ```yaml
   name: "Build and Deploy"
on:
  push:
    branches:
      - main
      - master
    paths-ignore:
      - .gitignore
      - README.md
      - LICENSE

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          # submodules: true
          # If using the 'assets' git submodule from Chirpy Starter, uncomment above
          # (See: https://github.com/cotes2020/chirpy-starter/tree/main/assets)

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
# Es importante el orden en el que se ejecutan los comandos. Uno de los errores que había era porque primero hacía "Install dependencies"
# y luego el "Setup Ruby" por lo que al instalr las dependencias no estaba Ruby contemplado

      # Limpiar el caché de Bundler
      - name: Clean Bundler cache
        run: rm -rf vendor/bundle

      # No estaba especificada la versión de Ruby a configurar. Tiene que coincidir con la del archivo Gemfile.
      # Hay una nueva que es la 3.4.1, pero la más estable hasta la fecha es la 3.0.0 Importante ponerlo entre comillas.
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0.0'
          bundler-cache: true
        
      - name: Install dependencies
        run: bundle install
        
      - name: Remove old _site folder (if exists)
        run: rm -rf _site

      - name: Build site
        run: bundle exec jekyll b -d "_site"
        env:
          JEKYLL_ENV: "production"

      - name: Test site
        run: |
          bundle exec htmlproofer _site \
            \-\-disable-external=true \
            \-\-ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/"

      - name: upload site artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./_site
          
      - name: List files in the _site directory
        run: ls -l _site
          

  deploy:
    permissions:
      pages: write      # to deploy to Pages
      id-token: write   # to verify the deployment originates from an appropriate source
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
   ```

### Explicación del flujo de trabajo 📝

- **on.push**: Este flujo de trabajo se activa cada vez que se hace un `push` a la rama `main`. Si deseas activar el flujo de trabajo en otra rama, simplemente cambia `main` por el nombre de la rama de tu elección. ⚡

- **jobs.build**: Aquí es donde definimos las tareas que se van a ejecutar:
  
  - **Check out code**: Se clona el código de tu repositorio para que GitHub Actions pueda acceder a él. 🔄
 
  - **Clean Bundler cache**: Limpia el caché que se haya podido quedar guardado de compilaciones anteriores. 🗑️
  
  - **Set up Ruby**: Se instala la versión de Ruby que especifiques. En este caso, se usa Ruby 2.7. 💎
  
  - **Install dependencies**: Se instala Bundler y luego se instalan las dependencias definidas en tu `Gemfile`. 📦
  
  - **Build the Jekyll site**: Se ejecuta el comando `bundle exec jekyll build`, que compila tu sitio estático de Jekyll en la carpeta `_site`. ⚙️
  
  - **Deploy to GitHub Pages**: Esta es la parte crucial que se encarga de publicar tu sitio en **GitHub Pages**. Utilizamos la acción `peaceiris/actions-gh-pages` para hacer el despliegue. El directorio `./_site` es el que contiene los archivos estáticos generados por Jekyll. 🌍

### Paso 3: Configurar las páginas de GitHub 🖥️

1. Ve a la configuración de tu repositorio en GitHub.

2. En la sección **GitHub Pages**, selecciona la rama `gh-pages` y la carpeta `/` para habilitar el despliegue de tu sitio desde esa rama. 🚀

### Paso 4: Hacer un Commit y Push 📤

Una vez que todo esté configurado, realiza un commit de todos los cambios y empuja a tu repositorio:

```bash
git add .
git commit -m "Configuración de GitHub Actions para Jekyll"
git push origin main
```

GitHub Actions se encargará de ejecutar el flujo de trabajo definido en `deploy.yml`, construirá tu sitio y lo publicará automáticamente en la rama `gh-pages`. 🎉
