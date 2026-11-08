<div align="center">

# ZelixOS Website

The official website and documentation for ZelixOS, an Arch Linux based distribution.

[Visit the website](https://zelixos.com/) · [Download](https://zelixos.com/download/) · [Documentation](https://zelixos.com/docs/)

<img src="images/Zelix%20Desktop%20SS.png" alt="ZelixOS desktop" width="800">

</div>

## About

This repository contains the ZelixOS website, including download information, desktop screenshots, release articles, and guides for installing and using the system. The site is available in English and Turkish.

## Project structure

| Path | Contents |
| --- | --- |
| `index.html` | Home page |
| `about/`, `download/`, `gallery/` | Project information, downloads, and screenshots |
| `blog/` | Release articles and blog assets |
| `docs/` | Installation, desktop, and troubleshooting guides |
| `images/` | Website images |
| `style.css`, `site-language.js` | Shared styles and language support |

## Local development

The site uses HTML, CSS, and JavaScript and does not require a build step. To preview it locally, run a static server from the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` in your browser.

## Contributing

Issues and pull requests are welcome. Please keep changes consistent with the existing design and update both language versions where applicable.
