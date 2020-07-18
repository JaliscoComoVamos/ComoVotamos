# Jalisco Cómo Votamos

Repositorio para el sitio web [https://jaliscocomovotamos.netlify.app](https://jaliscocomovotamos.netlify.app)

## Acerca de

<b>Jalisco Cómo Votamos</b> es un proyecto de software libre y de código abierto del observatorio ciudadano [Jalisco Cómo Vamos](http://jaliscocomovamos.org/). Antes de las elecciones de 1 de julio de 2018, era una herramienta para conocer a las y los candidatos que se encontrarían en la boleta, basado en una dirección de credencial para votar (en el estado de Jalisco, México). Ahora sirve como portal para conocer a quiénes serán las y los representantes en los diferentes órdenes de gobierno cuando empiezan las nuevas administraciones. En el sitio también se puede consultar, explorar y analizar los resultados de estas elecciones.

## Como contribuir

¡Las contribuciones a este proyecto son bienvenidas!
- Si deseas participar agregando o mejorando algún aspecto específico, puedes hacer un _fork_ del repositorio, implementar los cambios (véase a continuación la información sobre la instalación de las dependencias necesarias) y enviar un _pull request_. Si tienes la intención de hacerlo, te recomendamos que te pongas en contacto con nosotros primero para avisarnos de tus planes.
- También puedes contribuir al informar de algún error o al hacer sugerencias, ya sea mediante la [creación de un _issue_ en GitHub](https://github.com/JaliscoComoVamos/ComoVotamos/issues) o [enviándonos un mensaje directo](https://jaliscocomovotamos.netlify.app/contacto.html).


## ¡Reutiliza y adapta el código!

Te invitamos a usar este código como punto de partida para tu propio proyecto. Usa los siguientes pasos para comenzar.

### 1. Hacer un _fork_ de este repositorio para copiarlo a tu cuenta de GitHub

Haz clic en el botón "Fork" en la esquina superior derecha de esta página para crear una copia de este repositorio en tu cuenta de GitHub.

![Fork this repo](https://help.github.com/assets/images/help/repository/fork_button.jpg)

### 2. Clonar el repositorio en tu computadora

Puedes copiar los archivos de tu nuevo repositorio a tu computadora con los siguientes comandos de bash:

```bash
git clone https://github.com/TU-NOMBRE-DE-USUARIO/ComoVotamos.git
cd ComoVotamos
```

### 3. Instalar Ruby y Jekyll

Asegúrate de que tienes instalada la versión 2.4.5 de Ruby en tu computadora. También necesitarás instalar Jekyll. Visita los sitios oficiales de [Ruby](https://www.ruby-lang.org/es/downloads/) y [Jekyll](https://jekyllrb.com/docs/installation/) para más información.

Si estás usando una Mac, los siguientes comandos de la Terminal deben ser suficientes para hacer la configuración necesaria. Si notas algún error, por favor [avísanos](https://jaliscocomovotamos.netlify.app/contacto.html).

```bash
# Eliminar versiones anteriores de Ruby
sudo rm -rf ~/.rvm

# Instalar las herramientas de la línea de comando
xcode-select --install

# Instalar Homebrew 
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Instalar rbenv y ruby
brew install rbenv
rbenv init
rbenv install 2.7.1
rbenv global 2.7.1
rbenv local 2.7.1

# Instalar bundler y jekyll
sudo gem install jekyll bundler

# Actualizar la configuración de rbenv
rbenv rehash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

Finalmente, reincia la Terminal.


### 4. Instalar _gems_
```bash
bundle install
```

### 5. Construir y servir el sitio

Una vez que Ruby, Jekyll y las _gems_ necesarias estén instalados correctamente, usa el siguiente comando para compilar y obtener una vista previa de tu sitio en tu computadora.

```bash
jekyll serve -w
```

Si no funciona ese comando, también puedes usar:

```bash
bundle exec jekyll serve
```

Luego, abre tu navegador web y ve a [http://localhost:5000](http://localhost:5000).


### 6. Personalizar tu sitio

- En el archivo `index.html`, sustituir el `mapboxgl.accessToken` con el tuyo. Igual con el mapbox style (`style: 'mapbox://styles...'`). Si no tienes una cuenta de Mapbox, primero [crea una cuenta gratuita](https://www.mapbox.com/).
- Editar los archivos `_config.yml` y `_layouts/default.html`.
- Si deseas agregar otras áreas de búsqueda en el mapa, puede ser útil examinar y seguir la estructura del archivo `archivos_mapa/municipios_y_distritos_jalisco.geojson`.
- Reemplezar los favicons. Puedes usar la herramienta gratuita [Favicon Generator](https://realfavicongenerator.net/).


### 7. Publicar tu sitio 

Puedes usar el servicio de hosting que quieres. Estamos usando [Netlify](https://www.netlify.com/), que ofrece hosting gratuito para proyectos de código abierto. También puedes usar [GitHub Pages](https://help.github.com/articles/user-organization-and-project-pages/), que también es gratis.


## Dependencias web

El sitio web está construido con las siguientes herramientas:

- [Jekyll](http://jekyllrb.com/docs/installation/) - un generador para sitios web estáticos (código abierto)
- [Bootstrap](http://getbootstrap.com/) - conjunto de herramientas para diseño responsivo de sitios web (código abierto)
- [jQuery Address](https://github.com/asual/jquery-address) - biblioteca de JavaScript (código abierto)
- [Mapbox](https://www.mapbox.com/) - proveedor de mapas y herramientas cartogáficas en línea, usa datos abiertos de [OpenStreetMap](http://www.openstreetmap.org/)
    - Mapbox requiere que esté activado y funcionando [WebGL](https://get.webgl.org/) en el navegador del usuario.
- [Netlify](https://www.netlify.com/) - hosting gratuito para proyectos de código abierto


## Equipo

- Vicki Foss - desarrollo, contenido
- Fabiola Garibaldi - contenido
- Felipe Rodríguez - contenido


## Agradecimientos

<b>Jalisco Cómo Votamos</b> fue construido usando el código de la herramienta [My Reps](https://github.com/datamade/my-reps) como base primaria. Además, adaptamos [un script de Genevieve Hoffman](https://github.com/veev/DataArtFall2017/tree/master/section-3/turfjs-example) para crear el mapa responsivo, y agradecemos mucho su contribución al proyecto.</p>


## Copyright

Código original Copyright (c) 2016 DataMade. Código modificado Copyright (c) 2018-2020 Jalisco Cómo Vamos. Publicado bajo la [licencia MIT](https://github.com/JaliscoComoVamos/ComoVotamos/blob/master/LICENSE.txt).
