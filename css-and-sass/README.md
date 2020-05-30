### RESOURCES
- CSS clip-path maker: www.bennettfeely.com/clippy/
- Icons: www.linea.io
- Videos: www.coverr.co
- cubic-bezier curve: www.easings.net
- Test media queries on different devices: www.sizzy.co

### Three Pillars of Writing Good HTML and CSS
**Responsive design**
- Building one website that works beautifully across all screen sizes on all devices
- Fluid layout
- Media queries
- Responsive images
- Correct units
- Desktop-first vs mobile-first

**Maintainable and scalable code**
- Writing code that is 
  - clean
  - easy to understand
  - supports future growth
  - reusable for you and other developers who might take on your project in the future
- We need to care and think about our CSS architecture:
  - how to organize files
  - how to name classes
  - how to structure HTML

**Web performance**
- Means to make it faster and to make it smaller in size so that the user has to download less data
- Less HTTP requests
- Less code
- Compress code
- Use a CSS preprocessor
- Less images
- Compress images - less bandwidth for users

### Node Sass NPM package
- Install: `npm install node-sass --save-dev`
- Install package.js file: `npm init`
- Install node_modules folder: `npm install`

### Compile Sass
- Setup NPM script:
  - 1st arg: name of the npm package
  - 2nd arg: the path to the Sass code
  - 3rd arg: the path for the compiled output (CSS code)
  - 4th arg: a watch flag. Recompile when there's a change in Sass file
```javascript
"scripts": {
    "compile:sass": "node-sass sass/main.scss css/style.css -w"
}
```
- Run the script: `npm run compile:sass`

### 7-1 CSS Architecture with Sass
- Inside sass folder:
  - abstracts folder
    - _functions.scss
    - _mixins.scss
    - _variables.scss
  - base folder
    - _animations.scss
    - _base.scss (a base partial sass file)
    - _typography.scss
    - _utilities.scss
  - components folder
    - _button.scss
  - layout folder
    - _header.scss
  - pages folder
    - _home.scss
- A partial file starts with an underscore (_)
- Import the partials in the main/root Sass file


# MEDIA QUERIES

- @mixin mixinName {}
- @media () {}
- @content
- @if
- $breakpoint argument

### MEDIA QUERY MANAGER
- 1em = 16px
- ORDER OF MEDIA QUERIES FOR DESKTOP-FIRST: PLACE THE LARGE ONE FIRST
- WHY? BECAUSE THE LAST DECLARATION WILL BE APPLIED
- ORDER OF MEDIA QUERIES FOR MOBILE FIRST: DO THE OPPOSITE: SMALL TO LARGE

**Media sizes**
- 0 - 600px:      Phone
- 600 - 900px:    Tablet portrait
- 900 - 1200px:   Tablet landscape
- [1200 - 1800] is where our normal styles apply
- 1800+:          Big desktop

**$breakpoint argument choices:**
- phone
- tab-port
- tab-land
- big-desktop

**ORDER: Base + typography > general layout + grid > page layout > components**

```javascript
@mixin respond($breakpoint) {
    // 1em = 16px
    @if $breakpoint == phone {
        @media (max-width: 37.5em) {@content};   //600px 
    }
    @if $breakpoint == tab-port {
        @media (max-width: 56.25em) {@content};    //900px
    }
    @if $breakpoint == tab-land {
        @media (max-width: 75em) {@content};    //1200px
    }
    @if $breakpoint == big-desktop {
        @media (min-width: 112.5em) {@content};    //1800px
    }
}
```

### USING THE MEDIA QUERIES
```javascript
html {
    // ORDER OF MEDIA QUERIES FOR DESKTOP-FIRST: PLACE THE LARGE ONE FIRST
    // WHY? BECAUSE THE LAST DECLARATION WILL BE APPLIED
    // ORDER OF MEDIA QUERIES FOR MOBILE FIRST: DO THE OPPOSITE: SMALL TO LARGE
    // This defines what 1rem is
    // 1rem = 10px
    // 10px/16px = 62.5%
    // Browser default font-size = 16px
    font-size: 62.5%; //1rem = 10px, 10/16 = 62.5%

    @include respond(tab-land) {
        font-size: 56.25%; //1rem = 9px, 9/16 = 56.25%
    }

    @include respond(tab-port) {
        font-size: 50%; //1rem = 8px, 8/16 = 50%
    }

    @include respond(big-desktop) {
        font-size: 75%; //1rem = 12px, 12/16 = 75%
    }
}
```

### WRITE A MIXIN FOR MEDIA QUERIES
1. Define a mixin: `@mixin mixinName {}`
- Define the media query inside the mixin
- `@content` is a content directive. It allows us to pass a block of code into a mixin
```javascript
@mixin respond-phone {
  @media (max-width: 600px) { @content };
}
```
2. To use the mixin: `@include mixinName {}`
- Pass in your @content in here
```javascript
@include respond-phone {
  font-size: 50%;
}
```

### WRITE A MIXIN WITH ARGUMENT AND @IF DIRECTIVE
**$breakpoint argument choices:**
- phone
- tab-port
- tab-land
- big-desktop

- **Define the mixin:**
```javascript
@mixin respond($breakpoint) {
    @if $breakpoint == phone {
        @media (max-width: 600px) {@content};    
    }
}
```

- **To use the mixin:**
```javascript
@include respond(phone) {
  font-size: 50%;
}
``` 

### RESPONSIVE IMAGES IN HTML

**Density switching in HTML:**
- The browser will choose which image to display depending on the user's resolution screen
- 1x and 2x are density switchers
- 1x for low resolution screens. 2x for high resolution screens like retina screen
- `<img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x" alt="Full logo" class="footer__logo">`

**Art direction in HTML**
- To tell the browser to use one image for one screen width and another image for another screen width
- Use the HTML element called `<picture>` to specify multiple image sources for specific screen width
- Also, set the `src` attribute as the default image source, in case older browsers don't support `srcset` attribute
```html
<div class="footer__logo-box">
    <picture class="footer__logo">
        <source srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x" media="(max-width: 37.5em)">
        <img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x" alt="Full logo" src="img/logo-green-2x.png 2x">
    </picture>
</div>
```

**Resolution switching and density switching in HTML:**
- Together with the width descripter and the sizes attribute, the browser can then figure out which is the perfect image to use for the current viewport width and the current display resolution
- The `srcset` source attribute contains the same image of different sizes. We specify the width descripter and specify exactly the width, in pixels, that each image has
- The width descriptor is to inform the browser of the width of an image: `300w`
- For example, a 300px image has a width descripter of 300w
- Use `sizes` attribute to inform the browser about the approximate width of the image at different viewport width
- The `sizes` attribute is to specify the approximate view in viewport width units (vw) for different breakpoints
- Also, set the `src` attribute as the default image source, in case older browsers don't support `srcset` attribute
```html
<img srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w" 
    sizes="(max-width: 900px) 20vw, (max-width:600px) 30vw, 300px"
    alt="Photo 1"
    class="composition__photo composition__photo--p1"
    src="img/nat-1-large.jpg">
```