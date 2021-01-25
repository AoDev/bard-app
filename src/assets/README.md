# Assets

Images and other files used in one way or another in the project.

## Overview

```
/favicon/favicon.ico          =   app favicon (simply copied)
/images/app-icon-source.svg   =   src for favicon generator (optional)
/images/index.js              =   Webpack entry point for images (using url-loader)
/images/logo-1024.png         =   src of Progressive Web App Manifest icons
```

## About the app (brand) logo

I wish there was a way to generate everything (favicon, manifest, ...) from a single "logo" file but in practice there are a few constraints that make the process more complicated.

## Favicon

The favicon **ico** format is still the best cross-browser solution.  
The file is part of the source code at `/images/favicon.ico`.

## PWA Manifest icons

Generated with `webpack-pwa-manifest`.  
Source file is `/images/logo-1024.png`

Configuration is in `webpack.config.base`; search for `WebpackPwaManifest`.

## UI icons

## Other images

Basically anything that is not an icon, like a beautiful illustration for example.

```
app-icon-source.svg
```

### How to update the favicon?

You need to update the file in the source code.  
You can choose whatever tool to generate a .ico file, but here is a way:

I use [akabekobeko/npm-icon-gen](https://github.com/akabekobeko/npm-icon-gen).

`npm install icon-gen -g`

There is a npm script ready in package.json that you might need to update.  
By default it takes `/images/app-icon-source.svg`. (so you replace it by your own)

Run `npm run icon-gen`.
It will generate an icon.ico file under `buildResources`.
Just replace the current .ico by the generated one.
