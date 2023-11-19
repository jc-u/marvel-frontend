<p align="center">
  <img src="/src/assets/images/logo.svg" width="500px"alt="logo"/>
</p>
<p align="center">
  <img src="/src/assets/images/ce1.png" width="500px"alt="logo"/>
</p>
<p align="center">
  <img src="/src/assets/images/ce2.png" width="500px"alt="logo"/>
</p>
<p align="center">
  <img src="/src/assets/images/ce3.png" width="500px"alt="logo"/>
</p>
<p align="center">
  <img src="/src/assets/images/ce4.png" width="500px"alt="logo"/>
</p>

---

[![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](/)
[![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://fr.reactjs.org/)
[![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com)
[![](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)

---

# Marvel

## Table des matières

1. [Introduction](#introduction)
2. [Technologies Utilisées](#technologies-utilisées)
3. [Installation](#installation)

## Introduction

Créez un site en React (avec un routeur) qui contiendra en haut : le logo MARVEL et un menu qui contiendra au minimum : personnages, comics et favoris.

Sur la page principale « personnages », vous devrez faire apparaître la liste des personnages MARVEL (100 par page), sous forme de fiche (photo, nom, description). En cliquant sur chaque fiche, il devra être possible d’accéder à une page regroupant les comics liés au personnage.

Sur la page « comics », vous devrez faire apparaître la liste des comics MARVEL, par ordre alphabétique, sous forme de fiche (photo, titre, description).

Vous intégrerez également un moteur de recherche, afin de rechercher par nom/titre. Une barre de recherche pour la page « comics », une autre pour la page « personnages ». Vous prendrez également soin d’ajouter un système de pagination à chaque page.

Pour les pages « personnages » et « comics », vous devrez créer un système permettant de mettre chaque fiche en favoris, en fonction des souhaits de l’utilisateur. Vous devrez conserver ces favoris dans la mémoire locale du navigateur (Cookies ou Local Storage) de l’utilisateur, dans un premier temps.

Vous hébergerez votre frontend sur Netlify et votre backend sur NorthFlank.

## Technologies Utilisées

- [React](https://fr.reactjs.org/) v18.2.0
- [React-dom](https://www.npmjs.com/package/react-dom) v18.2.0
- [FontAwesome](https://fontawesome.com/) v5.15.4
- [Vitejs](https://vitejs.dev/) vite 4
- [Axios](https://axios-http.com/)
- [Sass](https://sass-lang.com/) v3.6.5

### 1 | Back-end

1. Download or clone the back-end's repository :

```sh
git clone(https://github.com/jc-u/marvel-backend.git)
```

2. Run the following commands:

```bash
# Install dependencies
npm install
```

Your server should now be running at http://locahost:3000 or on Northflank : (https://site--marvel-backend--kvs4pj8nh4kv.code.run/)

## API Documentation

You can get an api key here : (https://lereacteur-marvel-api.netlify.app/)

### 2 | Front-end

Instructions pour installer le frontend localement.

```bash
# Cloner le dépôt
git clone (https://github.com/jc-u/marvel-frontend.git)

# Accéder au répertoire du projet
cd marvel-frontend

# Installer les dépendances
yarn
```

3. Launch dev server on port 3000 :

```sh
# yarn
yarn dev
```

4. Front-end is now rendered at URL `http://localhost:3000` and you can navigate on the site or on netlify : `https://resplendent-gecko-bb9270.netlify.app/`
