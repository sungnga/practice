### RESOURCES
- CSS clip-path maker: www.bennettfeely.com/clippy/
- Icons: www.linea.io
- Videos: www.coverr.co
- cubic-bezier curve: www.easings.net
- Test media queries on different devices: www.sizzy.co
- Check browser support for CSS properties: www.caniuse.com
- SVG icons: www.icomoon.io



# CSS TRICKS

- Emmet shortcut for creating multiple items at once: `.home{Home Card $}*6`
- Use 'margin auto' when you want take up the extra space, but the content only occupies the space it needs:`margin-right: auto;`
- Set an image to be a block or inline-block if you don't want to have a white space underneath when left as an inline element
- To include the margin and padding into the width & height of an element: `box-sizing: border-box`. This setting is set as a global default on html element
- To NOT include the margin & padding into the width & height of an element: `box-sizing: content-box`
- To set an item to take up the entire available space: `flex: 1`
- When using z-index, make sure to set the position on the parent element: `position: relative`
- When using pseudo element before, make sure to include empty content property
  ```javascript
  &__item::before {
      content: "";
  }
  ```
- Newer browsers - icon masks:
  ```css
  @supports (-webkit-mask-image: url()) or (mask-image: url()) {
      background-color: var(--color-primary);
      -webkit-mask-image: url(../img/chevron-thin-right.svg);
      -webkit-mask-size: cover;
      mask-image: url(../img/chevron-thin-right.svg);
      mask-size: cover;
      background-image: none;
  }
  ```
- Make a square image round:
  ```css
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  ```
- Create a color gradient on top of an image:
  - `background-image: linear-gradient(rgba($color-primary, .5), rgba($color-primary, .5)), url(../img/back.jpg);`
- **AUTO-FIT -> MEDIA QUERIES BREAKPOINT!**
  - `auto-fit` creates as many tracks as it can fit based on the width that we define
  - So we define the width with the `minmax()` function: the width of each of the tracks should always stay between 250px and one fractional unit
  - Based on this, CSS will add as many tracks as fit in the container
  - When the screen is too small to fit the 250px min width requirement, the grid columns will automatically shift to fit this minimum width requirement. INSTANT MEDIA QUERIES BREAKPOINT!!
  - `grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));`
- Styling the direct children of an element:
  ```scss
  & > * {
      padding: 40px;
      font-size: 3rem;;
  }
  ```




### THREE PILLARS OF WRITING GOOD HTML AND CSS
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


### 7-1 CSS ARCHITECTURE WITH SASS
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

### NODE SASS NPM PACKAGE
- Install: `npm install node-sass --save-dev`
- Install package.js file: `npm init`
- Install node_modules folder: `npm install`

### COMPILE SASS
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

### THE BUILD PROCESS IN CSS
- Compile, concat, and compress all of your Sass files into one single CSS file for production
- The final file is a style.css(or whatever name) file that is ready to deploy to a web server

**Setup:**
- Install concat: `npm install concat --save-dev`
- Install prefix: `npm install postcss-cli autoprefixer --save-dev`
- Install npm-run-call: `npm install npm-run-all --save-dev`
- Setup scripts in package.json file:
```javascript
"scripts": {
    "watch:sass": "node-sass sass/main.scss css/style.css -w",
    "compile:sass": "node-sass sass/main.scss css/style.comp.css",
    "concat:css": "concat -o css/style.concat.css css/icon-font.css css/style.comp.css",
    "prefix:css": "postcss --use autoprefixer -b \"last 10 versions\" css/style.concat.css -o css/style.prefix.css",
    "compress:css": "node-sass css/style.prefix.css css/style.css --output-style compressed",
    "build:css": "npm-run-all compile:sass concat:css prefix:css compress:css"
},
```
- Run the CSS build process: `npm run build:css`

### DEVELOPMENT MODE
- Set the browser flag to firefox to start live-server with firefox
- You can inspect the CSS grid layout with firefox devtool
```javascript
"scripts": {
  "watch:sass": "node-sass sass/main.scss css/style.css -w",
  "devserver": "live-server --browser=firefox",
  "start": "npm-run-all --parallel devserver watch:sass",
}
```
- Run: `npm run start`



# MEDIA QUERIES

- Mixin: @mixin mixinName {}
- Media query: @media () {}
- Content directive: @content
- If directive: @if
- Breakpoint argument: $breakpoint

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



# RESPONSIVE IMAGES

**When to use responsive images: the 3 use cases**
- Resolution switching - decrease image resolution on small screen
- Density switching - where the screen size doesn't matter, but the screen pixel density does
  - Pixel density is the amount of pixels found in an inch or centimeter
  - What matters is there are low-resolution screens and high-resolution screens
  - Low-resolution screens can be called "1x screen" because they use one pixel to display one pixel of our design
  - High-resolution screens are ones found in all modern smartphones or computers with retina display
  - They can be called "2x screen" because they actually use two physical pixels to display one pixel of our design
  - Density switching is to serve one image to a high-resolution screen and another one if the screen is low resolution
- Art direction is when you want to serve up a whole different image for a different screen size


### RESPONSIVE IMAGES IN HTML

**Density switching in HTML:**
- The browser will choose which image to display depending on the user's screen resolution
- 1x and 2x are density switcher
- 1x for low-resolution screens. 2x for high-resolution screens like retina display screen
```html
<img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x"
  alt="Full logo"
  class="footer__logo">
```

**Art direction in HTML**
- To tell the browser to use one image for one screen width and another image for another screen width
- Use the HTML element called `<picture>` to specify multiple image sources for specific screen width
- Also, set the `src` attribute as the default image source, in case older browsers don't support `srcset` attribute
```html
<div class="footer__logo-box">
    <picture class="footer__logo">
        <source srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x" 
            media="(max-width: 37.5em)">
        <img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x"
            alt="Full logo"
            src="img/logo-green-2x.png">
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

### RESPONSIVE IMAGES IN CSS
- Types of media queries: screen resolution, viewport width, the device resolution
- 192dpi(dots per inch) is the resolution of the Apple retina screen. It's a high resolution screen that's usually used as a reference

**Targeting the device resolution and writing media query conditions**
```javascript
// If the screen resolution is higher than 192dpi AND the screen width is larger than 600px, load the large image
// Use a comma separator(,) to apply an OR condition
// If the screen width is larger than 2000px, load the large image
// NOTE: Safari browser does not support 'min-resolution: 192dpi' property. Need to provide a webkit condition for this
@media (min-resolution: 192dpi) and (min-width: 37.5em),
    (-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em),
	  (min-width: 125em) {
	  background-image: linear-gradient(
			  to right bottom,
			  rgba($color-primary-light, 0.8),
			  rgba($color-primary-dark, 0.8)
		),
		url(../img/hero.jpg);
}
```



# FLEXBOX

- Flexbox is a new module in CSS3 that makes it easy to align elements to one another, in different directions and orders
- The main idea behind flexbox is to give the container the ability to expand and to shrink elements to best use all the available space
- Flexbox replaces float layouts, using less, and more readable and logical code
- Flexbox completely changes the way that we build one-dimensional layouts

### FLEXBOX PROPERTIES
- To create a flex container, set the display property to flex: `display: flex;`
- All the direct children of the flex container are called the flex items
- The direction these flex items are laid out is called the main axis (horizontal axis)
- The perpendicular direction is called the cross axis (vertical axis)

**CONTAINER:**
- flex-direction: **row** | row-reverse | column | column-reverse
- flex-wrap: **nowrap** | wrap | wrap-reverse
- justify-content: **flex-start** | flex-end | center | space-between | space-around | space-evenly
- align-items: **stretch** | flex-start | flex-end | center | baseline
- align-content: **stretch** | flex-start | flex-end | center | space-between | space-around

**ITEM:**
- align-self: **auto** | stretch | flex-start | flex-end | center | baseline
- order: **0** | integer
- flex-grow: **0** | integer
- flex-shrink: **0** | integer
- flex-basis: **auto** | length
- flex: flex-grow flex-shrink flex-basis  `flex: 0 0 66%`


### CSS CUSTOM VARIABLES
- CSS custom variables start with double dashes(--)
- Sass variables start with dollar symbol($): `$color-primary: #eb2f64`
- To use it: `var(--variable-name)`

**Define CSS custom variables:**
```javascript
// Variables defined at root level are available to all its children
:root {
    --color-primary: #eb2f64;
    --color-primary-light: #FF3366;
}
```

**Using the CSS custom variables:**
```javascript
background-image: linear-gradient(to right bottom, var(--color-primary-light), var(--color-primary-dark));
```

**Steps to creating a page:**
1. Build the overall page layout
  - Define all main elements and its class names in index.html
  - In _layout.scss file, give basic styles to these main elements  
2. Style each components in _components.scss file

**Media queries steps for Trillo project**
- NOTE: THIS IS FOR DESKTOP-FIRST APPROACH
- Declare Sass variables for breakpoints in _base.scss file:
```javascript
$bp-largest: 75em;  //1200px    1200/16 = 75
$bp-large: 68.75em;  //1100px  1100/16 = 68.75
$bp-medium: 56.25em;  //1100px  900/16 = 56.25
$bp-small: 37.5em;  //600px
$bp-smallest: 31.25em;  //500px
```
- At 1200px, remove the primary pink background and the container takes up 100% width
```javascript
.container {
  @media only screen and (max-width: $bp-largest) {
    margin: 0;
    max-width: 100%;
    width: 100%;
  }
}
```
- At 1100px, decrease font-size to 8px
```javascript
html {
  @media only screen and (max-width: $bp-large) {
    font-size: 50%;  //16px/8px = 50%
  }
}
```
- At 900px, move the sidebar navigation to the top, center the nav items, and reduce margin/padding in the main content
```javascript
.content {
    display: flex;
    
    // Stack items on top of each other
    @media only screen and (max-width: $bp-medium) {
        flex-direction: column;
    }
}

.side-nav {
    // Stack items next to each other
    @media only screen and (max-width: $bp-medium) {
        display: flex;
        margin: 0;
    }
    // Each item takes up its entire width (4 items, so 25% of the space)
    &__item {
        @media only screen and (max-width: $bp-medium) {
            flex: 1;
        }
    }
    // Center the items and add padding
    &__link,
    &__link:visited {
        @media only screen and (max-width: $bp-medium) {
            justify-content: center;
            padding: 2rem;
        }
    }
}
```
- At 600px, the content becomes one column and takes up 100% width, stack the nav icon
```javascript
.detail {
    // Items stack on top of each other
    @media only screen and (max-width: $bp-small) {
        flex-direction: column;
    }
}
```



# CSS GRID

- CSS Grid Layout is a brand new module that brings a two-dimensional grid system to CSS for the first time
- CSS Grid replaces float layouts, using less, and more readable and logical CSS and HTML
- CSS Grid works perfectly together with Flexbox, which is best to handle one-dimensional components and layouts
- CSS Grid completely changes the way that we envision and build two-dimensional layouts

### CSS GRID TERMINOLOGY
- A CSS grid container is created when you set the display property of an element to grid: `display: grid;`
- Then all the direct children of the Grid container are the Grid items
- The Row axis is in X-direction
- The Column axis is in Y-direction
- Unlike axis in Flexbox which change direction, these axis are always the same
- The vertical and horizontal lines that divide up the grid and separate the columns and the rows are called the Grid lines. And they're automatically numbered for the rows and the columns
- The actual space between the rows and columns is called the gutter. The row gutter can be different from the column gutter
- Grid track/row and grid track/column: The space between two grid lines is called a track, no matter if it's vertical or horizontal
- Grid area: The area btween two vertical and two horizontal grid lines
- Grid cell: The area btween two adjacent grid lines and two adjacent column lines

### WORKIGN WITH CSS GRID
- To create a CSS grid container, set the display property of an element to grid: `display: grid;`

**Define the rows and columns:**
```javascript
grid-template-rows: 150px 150px; //2 rows of 150px height
grid-template-rows: repeat(2, 150px); // 2 rows of 150px height each
grid-template-rows: repeat(2, 1fr); // 2 rows each with equal height

grid-template-columns: 150px 150px 150px;
grid-template-columns: repeat(2, 150px) 1fr; //2 columns each with 150px width, 1 column fill the rest of the available space
grid-template-columns: 1fr 3fr 1fr; //3 columns with the middle column is 3X as wide
// The first column is 50% wide
// Third column is 2X as wide as the second column
// Note that the 50% column does not take the gutter into consideration
grid-template-columns: 50% 1fr 2fr;
grid-template-columns: repeat(3, 1fr); //3 columns with equal width
```

**Create the gutter:**
```javascript
// Longhand 
grid-row-gap: 30px;
grid-column-gap: 30px;

// Shorthand when gutter row and column is the same
grid-gap: 30px;

// Shorthand for different row and column gutters
// 1st value is row, 2nd value is column
grid-gap: 30px 50px;
```

**3 ways to define span:**
- Start at column 2 / end at column 3: `grid-column: 2 / 3;`
- Start at column 2 / span 2 columns: `grid-column: 2 / span 2;`
- Start at column 1 / span all the way to the end: `grid-column: 1 / -1;`
- span methods work for `grid-row` as well

**Positioning grid items:**
- Method 1: longhand
```javascript
grid-row-start: 2; 
grid-row-end: 3;
grid-column-start: 2;
grid-column-end: 3;
```
- Method 2: shorthand
```javascript
grid-row: 2 / 3;  //shorthand for row-start / row-end
column: 2 / 3;    //shorthand for column-start / column-end
```
- Method 3: even shorter-hand
  - Start-row / start-col / end-row / end-col: `grid-area: 1 / 3 / 3 / 4;`

- Multiple items can occupy the same cell
- Use `z-index` property to display the order of the items

### BUILDING THE OVERALL PAGE LAYOUT
```javascript
.container {
    display: grid;

    // Defining the row track:
    // When starting a project, think about how your content will grow
    grid-template-rows: 80vh min-content 40vw repeat(3, min-content); //a 6-row track

    // Define the column track:
    // Start with the 8-column layout. 12-column layout is very common practice
    // For each column, we want a minimum of min-content and max of 140px
    // It will not shrink smaller than min-content and will not grow larger than 140px wide
    // Next, add a 8rem sidebar column on the far left
    // Then add 2 more columns IN BETWEEN the 8-column grid that take up the remain space (1fr)
    // grid-template-columns: 8rem 1fr repeat(8, minmax(min-content, 14rem)) 1fr; //14rem = 140px
    // Name the grid lines
    // Naming the columns and not the rows because the focus is on the columns, not the rows
    // For the 2 columns that wrap around the 8-column grid, we want to have a minimum of 60px wide
    grid-template-columns: [sidebar-start] 8rem [sidebar-end full-start] minmax(6rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end]) [center-end] minmax(6rem, 1fr) [full-end];

    // Styling the direct children of container class
    & > * {
        padding: 40px;
        font-size: 3rem;;
    }
}
```

### AUTO-FIT -> MEDIA QUERIES BREAKPOINT!
- `auto-fit` creates as many tracks as it can fit based on the width that we define
- So we define the width with the `minmax()` function: the width of each of the tracks should always stay between 250px and one fractional unit
- Based on this, CSS will add as many tracks as fit in the container
- When the screen is too small to fit the 250px min width requirement, the grid columns will automatically shift to fit this minimum width requirement. INSTANT MEDIA QUERIES BREAKPOINT!!
`grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));`