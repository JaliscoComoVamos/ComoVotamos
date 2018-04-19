# Jalisco Cómo Votamos

Repositorio para el sitio web [http://jaliscocomovamos.org/votamos](http://jaliscocomovamos.org/votamos)

## Agradecimientos

<b>Jalisco Cómo Votamos</b> fue construido usando el código de la herramienta [My Reps](https://github.com/datamade/my-reps) como base primaria. Además, adaptamos [un script de Genevieve Hoffman](https://github.com/veev/DataArtFall2017/tree/master/section-3/turfjs-example) para crear el mapa responsivo, y agradecemos mucho su contribución al proyecto.</p>

## Información
La siguiente información proviene del proyecto original sobre el que se basó <b>Jalisco Cómo Votamos</b>, y no corresponde necesariamente a este nuevo proyecto. Pronto este repositorio se actualizará como un proyecto independiente para que más personas puedan participar o expandir este proyecto a otras partes de México.

<br><br><br><br><br>

# My Reps

My Reps helps you locate and contact your federal, state, county and local elected representatives. Based on [my-reps-pbp](https://github.com/datamade/my-reps-pbp) by [DataMade](https://datamade.us/) and [Participatory Budgeting Project](http://participatorybudgeting.org/)


## Organizers: reuse our code!

We built this tool to be open source and easy to repurpose. Feel free to copy, reuse, and customize the My Reps codebase.

Here's how to do it:

#### 1. Fork this repository

Click the 'Fork' button in the upper right corner of this page to copy it to your GitHub account.

![Fork this repo](https://help.github.com/assets/images/help/repository/fork_button.jpg)

#### 2. Clone this project to your local computer

Next, you can clone it to your local computer (requires the command line):
``` bash
git clone git@github.com:your-name-here/my-reps.git
cd my-reps
```

You can use [GitHub Desktop](https://desktop.github.com/) instead if you are not familiar with the command line.

#### 3. Add your Google Maps API key

For the address search to work, you'll need to get a new Google Maps API key. You can get yours and enable it by following these instructions: https://developers.google.com/maps/documentation/javascript/get-api-key

When you get a key, set the `google_api_key` in `_config.yml`.

```
port:  5000
markdown: kramdown
name: "My Reps"

...

google_api_key: YOUR API KEY GOES HERE
```

#### 4. Modify the `index.html` and `/js/lookup_tool.js` files as needed



#### 5. Run it

This website is built using Jekyll. You will need to [install it first](http://jekyllrb.com/docs/installation/).

```console
jekyll serve -w
```

Then, open your web browser and navigate to http://localhost:5000

#### 6. Deploy it with GitHub pages

**GitHub pages** You can host your table on GitHub pages for free! Once you've made all your changes and committed them, push everything in the `master` branch to `gh-pages`, which automatically enables GitHub pages.
```bash
git push origin master:gh-pages
```

Then navigate to http://your-github-username.github.io/my-reps/

Read more on working with [GitHub pages projects](https://help.github.com/articles/user-organization-and-project-pages/#project-pages).



## Web dependencies

Data comes from the [Google Civic Information API](https://developers.google.com/civic-information/).

We used the following open source tools:

* [Jekyll](http://jekyllrb.com/docs/installation/) - Static website framework
* [Bootstrap](http://getbootstrap.com/) - Responsive HTML, CSS and Javascript framework
* [jQuery Address](https://github.com/asual/jquery-address) - javascript library creating RESTful URLs


## Team

* Derek Eder - developer, content
* Eric van Zanten - developer

## Errors and Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/datamade/my-reps/issues

## Note on Patches and Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Send a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2016 DataMade. Released under the [MIT License](https://github.com/datamade/my-reps/blob/master/LICENSE).
