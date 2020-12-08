# TOPICS AND NOTES

## S3: INTRO TO HTML
#### TOPICS:
- Paragraph Elements, p tags
- HTML Headings
- HTML Lists
- HTML Anchor Tags
- HTML Images
- HTML Boilerplate
- Using MDN as a Resource
- The Chrome Inspector


## S4: HTML ELEMENTS AND SEMANTICS
#### TOPICS:
- Understanding what HTML5 Actually is
- Block vs. Inline Elements
- `<span>` and `<div>` Elements
- Semantic Elements
- `<hr>` Elements
- `<br>` Elements
- `sup` Elements
- `sub` Elements
- VSCode Emmet shortcuts

**Block vs. inline elements:**
- Block level elements take up a whole "block" of space
- Inline elements fit in alongside other elements


## S5: HTML FORMS AND TABLES
#### TOPICS:
- Table Basics: `<table>`, `<tr>`, `<td>`, and `<th>`
- Form Element Basics
- Button Elements
- Labels
- Common Input Types
- Table Sections: `<thead>`, `<tfoot>`, `<tbody>`
- Range & Text Areas
- Form Validations
- Table Colspan & Rowspan

**`<form>`**
- The form element "represents a document section containing interactive controls for submitting information"
- The action attribute specifies WHERE the form data should be sent
- The method attribute specifies which HTTP method should be used
 
**form `<input>` element**
- The input element is used to create a variety of different form controls
- We have 20+ possible types of inputs, ranging from date pickers to checkboxes
- The type attribute is where the magic happens. Changing type dramatically alters the input's behavior and appearance
- Attributes for `<input>` element:
  - type
  - placeholder
  - id
  - name
  - value

**`<label>` element**
- represents a caption for an item in a user interface
- Always include labels for an input element
- To associate the `<label>` with an `<input>` element, you need to give the `<input>` an id attribute. The `<label>` then needs a for an attribute whose value is the same as the input's id
  ```html
  <div class="preference">
      <label for="cheese">Do you like cheese?</label>
      <input type="checkbox" name="cheese" id="cheese">
  </div>
  ```
- Alternatively, you can nest the `<input>` directly inside the `<label>`, in which case the for and id attributes are not needed because the association is implicit:
  ```html
  <label>Do you like peas?
    <input type="checkbox" name="peas">
  </label>
  ```

**form `<button>` element**
- By default, you have a `<button>` element inside a `<form>` element, it will act as a submit button. It will submit the form
- However, if you add a type attribute of button to the `<button>` element, it'll then act as a regular button
  - `<button type="button">Please do not submit the form</button>`

**The name attribute**
- Name of the element. For example used by the server to identify the fields in form submits
- Name attribute should be used in every form `<input>` element. It will be used when you send data to the server
- The value for the name attribute of an input is what the user provides
  - `<input name="username" type="text">`
  - User enters "james007" into the input field
  - The result of name attribute is: username=james007


## S6: CSS BASICS
#### TOPICS:
- Conceptual Overview of CSS
- Basic CSS Syntax
- Including Styles Correctly
- Color Systems: RGB, Hex, etc.
- Font-family Property
- Common Text Properties

**Basic CSS syntax:**
- Must have a semicolon `;` at the end of every property declaration
  ```css
  selector {
    property: value;
  }
  ```

**Color System:**
- color name: `color: red;`
- RGB: `background-color: rgb(89, 141, 0);`
- HEX: `color: #0f5679;`
- HSL

**CSS text properties:**
- text-align
- font-weight
- text-decoration
- line-height
- letter-spacing
- font-size
- font-family: `font-family: Verdana, sans-serif`
  - The 1st font is the first font choice
  - The 2nd font specified is a font to fall back on

**font-size:**
- Relative
  - em
  - rem
  - vh
  - wh
  - %
- Absolute
  - px
  - pt
  - cm
  - in
  - mm


## S7: CSS SELECTORS
#### TOPICS:
- Element selector
- Class selector
- ID selector
- Descendent selector
- CSS specificity
- Adjacent selector
- Direct descendent selector
- Attribute selector
- Pseudo elements
- Pseudo classes

**Element Selector:**
- Select all element of a certain type
- For example, select all images
  ```css
  img {
    width: 100px;
    height: 200px;
  }
  ```

**Selector List:**
- Use a comma to combine multiple selectors in a list
- For example, select all h1's and h2's
  ```css
  h1, h2 {
    color: magenta;
  }
  ```

**ID Selector:**
- Important to remember that only one thing on a page should have a given id
- Id selector is used for unique identifier
- Use a pound symbol `#` in front of the id name
- Try to keep using id to a minimal on a page. There are other approaches
  ```css
  #signup {
    color: #f1faee;
  }
  ```

**Class Selector:**
- Similar idea to an id selector, but a class selector can be applied to multiple elements
- Use a period `.` in front of the class name
- For example, select elements with class of 'complete'
  ```css
  .complete {
    color: green;
  }
  ```

**Descendant Selector:**
- A space is used to select the descendant element of an element
- Select all `<a>` tags that are nested inside an `<li>` tag
  ```css
  li a {
    color: teal;
  }
  ```

**Adjacent Selector, also known as Adjacent Combinator:**
- Uses a plus sign `+` to select elements that are immediately after another element
- They're on the same level. Not nested or child/parent of each other
- Select only the paragraphs that are immediately preceded by an `<h1>`
  ```css
  h1 + p {
     color: red;
  }
  ```

**Direct-Descendant Selector, also known as Direct Child Combinator:**
- Uses the greater than sign `>` to select the direct child of an element. In other words, the element that is one level down
- Select only the `<li>`'s that are direct children of the `<div>` element
  ```css
  div > li {
    color: white:
  }
  ```

**Attribute Selector:**
- Select elements based upon some particular attribute
- Use square bracket after the element type and specify the attribute inside the square bracket
- Select all input elements where the type attribute is set to "text"
  ```css
  input[type="text"] {
    width: 300px;
    color: yellow;
  }
  ```

**Pseudo Classes:**
- They are modifiers. Keyword added to a selector that specifies a special **state** of the selected element(s)
- Starts with a colon `:` to signify that it's a pseudo class
  - :active
  - :checked
  - :first
  - :hover
  - :not()
  - :nth-child()
  - :nth-of-type() - Select based on position in a group of siblings
- The LVHA-order: `:link` - `:visited` - `:hover` - `:active`
- For example, select any `<button>` element inside the post class when "hovered". Select every other element with a class of post
  ```css
  .post button:hover {
    color: orange;
  }

  .post:nth-of-type(2n) {
    background-color: #dfe8dc;
  }
  ```

**Pseudo Elements:**
- Keyword added to a selector that lets you style a particular **part** of selected element(s)
  - ::after
  - ::before
  - ::first-letter
  - ::first-line
  - ::selection
- For example, change background color of selection when selecting any part of the `<p>` element
  ```css
  p::selection {
    background-color: #fcdf49;
  }
  ```

**The Cascade:**
- The order your styles are declared in and linked to matters!
- The latter wins
- In this example, the color purple wins
  ```css
  h1 {
    color: red;
  }
  h1 {
    color: purple;
  }
  ```

**Specificity:**
- What happens when conflicting styles target the same elements?
- Specificity is how the browser decides which rules to apply when multiple rules could apply to the same element
- It is a measure of how specific a given selector is. The more specific selector "wins"
- Order of specificity: !important > inline styles > id > class > element
- Only use `!important` if it's a must must
- Not recommended using inline styles

**CSS Inheritance:**
- A child element can inherit styles from the closest parent element
- Not all elements inherit styles from its parent. However, if you want it to inherit the styles from its nearest parent, set the value of a particular property to `inherit`
- Not all properties are inherited, such as border property
  ```css
  button {
    color: inherit; 
  }
  ```


## S8: CSS BOX MODEL AND UNITS
#### TOPICS:
- Width & height
- Border
- Padding
- Margin
- Display property
- Units - percentages, EMS, & REMS
- Border radius

**The CSS Box Model:**
- Properties of the Box Model
  - width - horizontal measure of the box
  - height - vertical measure of the box
  - border - the border around the box
  - padding - the space between the content and the border
  - margin - the space between the outside border and other elements

**The border properties:**
- border-width - controls the thickness of the border
- border-color - controls the color of the border
- border-style - controls the line style - dashed, solid, dotted, etc.
- Use `box-sizing: border-box` to set the border properties to fit inside the border box
  - If an element has a width of 100px and a border-width of 5px, the content inside the border property is 90px
- The border property is the border shorthand property to set the border-width, border-color, and border-style all at once
  ```css
  border: 2px dashed green;
  ```
- border-radius - rounds the corners of an element's outer border edge

**The display property:**
- inline
  - Width & Height are ignored.
  - Margin & Padding push elements away horizontally but not vertically
- block
  - Block elements break the flow of a document
  - Width, Height, Margin, & Padding are respected
- inline-block
  - Behaved like an inline element except Width, Height, Margin, & Padding are respected

**CSS Units:**
- Absolute units
  - px - by far the most commonly used absolute unit
  - 1px does not necessarily equal the width of exactly one pixel!
  - Not recommended for responsive websites
- Relative unit: percentages
  - Percentages are always relative to some other value
  - Sometimes, it's a value from the parent and other times, it's a value from the element itself. It depends what that property is. For example:
    - `width: 50%;` - half the width of the parent
    - `line-height: 50%;` - half the font-size of the element itself
- Relative unit: ems
  - With font-size, 1em equals the font-size of the parent. 2em is twice the font-size of the parent, etc
  - With other properties, 1rem is equal to the computed font-size of the element itself
- Relative unit: rems
  - Relative to the **root html element**'s font-size. Often easier to work with than ems
  - If the root font-size is 20px, 1rem is always 20px, 2rem is always 40px, etc


## S9: MORE CSS PROPERTIES
#### TOPICS:
- Transitions
- Position property
- Opacity and alpha channel
- Google fonts
- The full story on the background property
- Transforms

**Opacity and the alpha channel:**
- `background-color: rgba(0, 209, 112, 0.5);`
- rgba has a 4th channel, the alpha channel
- The alpha channel governs the transparency of a color
- Its value is from 0 to 1. 0 being completely transparent and 1 is not at all transparent
- Other elements won't be impacted, only the specified property declaration set to rgba
- Opacity property
  - `opacity: 0.3;`
  - Opacity is different from the alpha channel
  - Opacity is a property that we set on an element
  - It governs the entire element's transparency, including its content and any descendants
  - Opacity goes from 0 to 1. 0 being completely transparent and 1 is not at all transparent

**The position property:**
- The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements
 ```css
  position: static;

  position: relative;
  top: 40px; left: 40px;

  position: absolute;
  top: 40px; left: 40px;

  position: -webkit-sticky;
  position: sticky;
  top: 20px;
 ```
- The position property is specified as a single keyword chosen from the list of values below:
  - static
  - relative
  - absolute
  - fixed
  - sticky
- The default position is static

**CSS transition:**
- Transition allows us to animate the transition of one property value to another property value
- Elements of transition property
  - transition: property name | duration | timing function | delay
- transition-timing-function property:
  - linear
  - ease-in, ease-out
  - steps
  - cubic-bezier

**CSS transform:**
  - transform: rotate(45deg);
  - transform: scale(2, 1);
  - transform: translate(-200px, 30px);
  - transform: skew(30deg)
  - transform: translateX(10px) rotate(10deg) translateY(5px);

**The background property:**
- background-image
- background-size
- background-repeat
- background-position
- The background property is background shorthand to set everything at once. The order does not matter, except the position/size properties

**Google fonts:**
- Website: https://fonts.google.com/
- We can include a font as part of our document. Include it in the `<head>` element of an html doc
  ```html
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;1,400&display=swap" rel="stylesheet">
  </head>
  ```
- Use the font in CSS stylesheet: `font-family: Montserrat, sans-serif;`


## S10: RESPONSIVE CSS AND FLEXBOX
#### TOPICS
- Media queries
- Flex shorthand
- Flex-basis, grow, and shrink
- Align-items
- Flex-wrap
- Align-content and align-self

**Working with flexbox:**
- Flexbox determines how the content flows in the container
- Can nest flex containers
- Turn on flexbox: `display: flex;`
- Main axis - by default, goes from left to right
- Cross axis - by default, goes from top to bottom
- Flex direction
  - flex-direction: row(default) | row-reverse | column | column-reverse
- Justify content
  - It determines how the content is distributed across the main axis
  - The way it behaves depends on flex-direction (row vs. column main axis)
  - justify-content:  flex-start(default) | flex-end | center | space-between | space-around | space-evenly
    - flex-start - content starts on the left
    - flex-end - content moves to the end of the main axis
    - space-between - distribute space between the elements, but not outside edges
    - space-around - similar to space-between, but distributes space around the edges as well
    - space-evenly - distributes space evenly between elements and around the edges
- Flex wrap
  - It determines whether the elements is wrapped along the main axis onto a new line (if it's horizontal) or a new column (if it's a vertical main axis)
  - flex-wrap: wrap | wrap-reverse | nowrap
- Align items
  - It determines how the content is aligned along the cross axis
  - align-items: flex-start(default) | flex-end | center | baseline
    - baseline value aligns the elements along its text baseline 
- Align content
  - Uses to distribute space along the cross axis
  - Space between rows or columns, depending on the orientation of the cross axis
  - It does nothing if you don't have flex-wrap
  - align-content: flex-start | flex-end | center | space-between | space-around
- Align self
  - Is similar to align-items, except a property we add to individual items in the flex container
  - It's not applied to the flex container itself, but to the flex element
  - align-self: flex-start | flex-end | center
- Flex sizing properties
  - flex-basis - defines the initial size of an element before additional space is distributed
    - `flex-basis: 400px;`
  - flex-grow - controls the amount of available space an element should take up. Accepts a unit-less number value
    - `flex-grow: 1;`
  - flex-shrink - if items are larger than the container, they shrink according to flex-shrink
    - `flex-shrink: 2;`
- Flex shorthand
  - The flex property sets how a flex item will grow or shrink to fit the space available in its flex container
  - It's a shorthand for flex-grow, flex-shrink, and flex-basis (in this order)
  - flex: flex-grow | flex-shrink | flex-basis

**Responsive design:**
- Media queries
  - Allows us to modify our styles depending on particular parameters like screen width or device type
  - Starts with `@media`
  - The `width ` feature is specified as a `<length>` value representing the viewport width. It is a range feature, meaning that you can also use the prefixed `min-width` and `max-width` variants to query minimum and maximum values, respectively
  - `@media (min-width: 800px) {...}` this says, a minimum of 800px and upward
  - `@media (max-width: 800px) {...}` this says, up to a maximum width of 800px
  - Most common use is `min-width`


## S12: CSS FRAMEWORKS: BOOTSTRAP
#### TOPICS:
- Working with CSS frameworks
- Including 3rd party CSS and CDNS
- Bootstrap grid
- Responsive Bootstrap grid
- Bootstrap navbars
- Icons
- Typography and utilities
- Bootstrap forms
- Bootstrap buttons

**Including Bootstrap and containers:**
- Include Bootstrap CDN in html doc file
  - Put this in the head element
  - Put this BEFORE your own custom CSS stylesheets. This way, your styles won't be overwritten by Bootstrap
  ```html
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="app.css">
  </head>
  ```
- Include Bootstrap JS scripts in html doc file
  - Put this at the very bottom of the body element
  ```html
  <body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
  ```
- **Containers:**
  - Containers are the most basic layout element in Bootstrap and are required when using Bootstrap default grid system
  - Containers are used to contain, pad, and sometimes center the content within them
  - Bootstrap comes with 3 different containers:
    - `.container`, which sets a `max-width` at each responsive breakpoint
    - `.container-fluid`, which is `width: 100%` at all breakpoints
    - `.container-{breakpoint}`, which is `width: 100%` until the specified breakpoint
  - Container breakpoint: container's `max-width`
    - .container
    - .container-sm
    - .container-md
    - .container-lg
    - .container-xl
    - .container-fluid
    ```html
    <div class="container">
      <!-- Content here -->
    </div>
    ```

**Bootstrap typography and utilities classes:**
- display
- blockquote
- blockquote-footer
- Alignment: text-center | text-left | text-right
- Text color: text-primary | text-white | text-black-50 etc
- Background color: bg-danger | bg-primary etc

**Badges, alerts, and button groups:**
- Badge: badge badge-pill
- Button group groups multiple buttons together: btn-group
- Alert: alert alert-danger | alert-heading | alert-dismissible

**Bootstrap grid:**
- Bootstrap grid only works inside a Bootstrap class of container
- Also, must use class of row
- Every row in Bootstrap has 12 units of space
- Use the column class to divide up the row however you want
  - col | col-6 | 
  ```html
  <div class="container">
    <div class="row">
      <div class="col">
        1 of 3
      </div>
      <div class="col-8">
        2 of 3
      </div>
      <div class="col">
        3 of 3
      </div>
    </div>
  </div>
  ```

**Responsive Bootstrap grids:**
- We can create responsive layouts and shift content around based upon the screen size
- Bootstrap has built-in grid breakpoints that's used as predefined screen size
  - Extra small - less than 576px - `.col-`
  - Small - greater or equal to 576px - `.col-sm-`
  - Medium - greater or equal to 768px - `.col-med-`
  - Large - greater or equal to 992px - `.col-lg-`
  - Extra large - greater or equal to 1200px - `.col-xl-`
- Can specify multiple breakpoints to define the content layout for each breakpoint
  ```html
  <div class="container">
    <div class="row">
      <div class="col-xl-4 col-md-6">
        <img class="img-fluid" src="..." alt="..." />
      </div>
    </div>
  </div>
  ```
- Responsive images: 
  - Make the image scale based upon the size of its containing element
  - image-fluid

**Useful grid utilities:**
- Alignment
  - align-items-start | align-items-end | align-items-center
  - align-self-start | align-self-end | align-self-center
  - justify-content-*
- Can use these grid utilities at different screen sizes
  - For example, justify-content-md-between

**Forms:**
- form-row
- form-group - add some structure to forms
- form-control - add this class to the input element
- form-check
- custom-control custom-checkbox

**Navbar:**
- This feature uses a lot of classes. Refer to the documentation
- navbar navbar-light | navbar-dark (the light/dark is for the navbar text) 
- navbar-toggler - toggles the hamburger menu
- collapse navbar-collapse
- Placement
  - navbar fixed-top | stick-top

**Bootstrap icons:**
- A free set of icons
- Uses svg
- Another great icon source is font awesome

**Other Bootstrap utilities:**
- Border: border | border-top | border-bottom | border-right | border-left
- Turn border off: border-0 | border-top-0 | etc
- Border-radius: rounded | rounded-0 | rounded-circle | rounded-pill | rounded-lg | rounded-sm | etc
- Shadow: shadow | shadow-none | shadow-sm | shadow-lg
- **Spacing**
  - The format: 
    - {property}{sides}-{size} for xs
    - {property}{sides}-{breakpoint}-{size}
  - Where property is one of:
    - `m` - for classes that set margin
    - `p` - for classes that set padding
  - Where sides is one of:
    - `t` - set margin-top or padding-top
    - `b` - set margin or padding bottom
    - `l` - left
    - `r` - right
    - `x` - set both left and right
    - `y` - set both top and bottom
    - blank - for classes that set a margin or padding on all 4 sides of the element
  - Where size is one of:
    - `0` - for classes that eliminate the padding/margin by setting it to 0
    - `1` - spacer * .25
    - `2` - spacer * .5
    - `3`
    - `4`
    - `5`
    - `auto` - for classes that set the margin to auto
- Display: d-none | d-block d-sm-none | etc
- Sizing: width and height

**Other useful Bootstrap components:**
- Card
- Carousel
- Dropdown menu
- Spinner
- Modal


## S14: JAVASCRIPT BASICS
#### TOPICS:
- JS numbers
- Variables and let
- Const
- Booleans
- Variable naming

**Primitive types:**
- The basic building blocks
  - Number
  - String
  - Boolean
  - Null
  - Undefined

**Numbers in Javascript:**
- JS has one number type
- Positive numbers
- Negative numbers
- Whole numbers (integers)
- Decimal numbers
- NaN - not a number
  - Nan is a numeric value that represents something that is...not a number
  - `0/0 //NaN`
  - `1 + NaN //NaN`

**Variables:**
- Variables are like labels for values
- Variables can change types
  - `let numPuppies = 23;  //number type`
  - `numPuppies = false;  //change to boolean type`
- We can store a value and give it a name so that we can:
  - Refer back to it later
  - Use that value to do...stuff
  - Or change it later on

**Updating variables:**
- `let score = 0;  //0`
- `score = 5;  //5`
- `score = score + 5;  //10`
- Shorthand: `score += 5;  //15`
- Shorthand: `score -= 10;  //5`
- Decrement by one: `score--;  //4`

**Let, const, and var variables:**
- let allows you to update the value later
- const works just like let, except you CANNOT change the value
- var is the old variable keyword. Before let and const, var was the only way of declaring variables. These days, there isn't really a reason to use it

**Booleans:**
- True or false, all in lowercase. `true` `false`
- Booleans are very simple. You have two possible options: true or false

**Variable naming and conventions:**
- Cannot start with a digit. `let 1digit = 9;`
- Uncommon to start with an underscore `_`
- Common practice when naming variables is use camelCase. Lowercase for the first word and uppercase for each word after
- No spaces between words and not common practice to separate words with underscore
- Come up with variable names that are meaningful, that explains what it is
- Avoid one-letter name


## S15: JAVASCRIPT STRINGS
#### TOPICS:
- String basics
- Indices and length
- Undefined and null
- String methods
- String template literals
- Random numbers and math object

**Strings:**
- "Strings of characters"
- Strings are another primitive type in Javascript. They represent text, and must be wrapped in quotes
- It's fine to use either single or double quotes, just be consistent in your codebase

**Indices and length property:**
- Strings are indexed. Each characters has a corresponding index (a positional number)
- Index position starts at 0
- Use square bracket notion `[]` after the string to access the value at a particular index
  - `let animal = "Elephant"; animal[0];  //E `
- Strings has a built-in length property 
  - The length property tells the total number of characters in a given string
  - `animal.length;  //7`
- Can concatenate strings together
- We cannot change a string. We can update a string by giving it a new value, but this is a completely new string. It is different in memory

**String methods:**
- Methods are built-in actions we can perform with individual strings
- They help us to do things like:
  - Searching within a string
  - Replacing part of a string
  - Changing the casing of a string
- The syntax: thing.method()
- Some methods accept arguments and some don't
- When adding the parenthesis at the end of a method, we're executing the method
- When calling a method on a string, a new copy of the string is created. The original string has not been modified
- We can chain multiple methods together on a string
  - `greeting.trim().toUpperCase();`

**String methods with arguments:**
- The syntax: thing.method(arg)
- Some methods accepts arguments that modify their behavior. Think of them as input that we can pass in. We pass these arguments inside of the parentheses
- Common methods that accept arguments:
  - `.indexOf('cat')` - returns the index of the first instance that it finds
  - `.slice(2, 5)` - the begin and end index
  - `.replace('the', 'an')` - 1st arg is what to replace, 2nd arg is what to place it with
  - `.repeat(3)` - number of times to repeat


**String template literal:**
- Template literals are strings that allow embedded expressions, which will be evaluated and then turned into a resulting string
- The syntax: back-tick ${expressions} back-tick
- Template literal uses back-tick, not single quote
- Anything that's inside the template literal `${}` are will be evaluated. This allows us to embed variables, math operations, methods, etc, inside a string template literal

**Undefined and null:**
- Both null and undefined are primitive values
- Null
  - It's a single value
  - "The intentional absence or lack of any value"
  - It's a concept of nothing
  - Must be assigned
- Undefined
  - It's a single value 
  - Variables that do not have an assigned value are undefined

**The Math object:**
- The Math object contains properties and methods for mathematical constants and functions
  ```js
  Math.PI //3.141592...
  Math.round(4.9) //5
  Math.abs(-567) //567
  Math.pow(2,5) //32
  Math.floor(3.9999) //3 - removes the decimal
  Math.random()
  ```
- Random numbers
  - `Math.random()` gives us a random decimal between 0 and 1 (non-inclusive, meaning, not include 1)
- Create random numbers between 1 and 10:
  ```js
  const step1 = Math.random(); //0.56835785532473
  const step2 = step1 * 10; //5.6835785532473
  const step3 = Math.floor(step2); //5
  const step4 = step3 + 1; //6 shifts the number by 1

  Math.floor(Math.random() * 10) + 1; //combined steps
  ```


## S16: JAVASCRIPT MAKING DECISIONS
#### TOPICS:
- Comparison operations
- Conditionals: if, else-if, and else
- Truth-y and false-y values
- Logical AND
- Logical OR
- Logical NOT

**Comparison operators:**
- It returns a boolean value: true or false
  ```js
  > //greater than
  < //less than
  >= //greater than or equal to
  <= //less than or equal to
  == //equality
  != //not equal
  === //strict equality
  !== //strict non-equality
  ```
- Can also compare special characters. It uses unicode character values

**Equality: triple vs. double equals:**
- == (double equals)
  - Checks for equality of value, but not equality of type
  - It coerces(transforms) both values to the same type and then compares them
  - This can lead to some unexpected results
- === (triple equals)
  - Called the strict equality operators
  - Checks for equality of value and type
  - Will not coerce the values
  - Use strict equality when making comparison

**The if statements:**
- The if statement only runs code if given condition is true
- The condition evaluates to either true or false
- The syntax:
  ```js
  if (condition) {
    // This code run will run if the condition is true
  }
  ```

**Else-if:**
- If the first if statement is false, then the else-if statement will run
- The syntax:
  ```js
  if (firstCondition) {
    // Run this code if firstCondition is true
  } else if (secondCondition) {
    // Run this code if secondCondition is true
  }
  ```

**Else:**
- If nothing else was true, do this...
- The syntax:
  ```js
  if (firstCondition) {
    //Run this code
  } else if (secondCondition) {
    //Run this code
  } else {
    //If nothing else, run this code
  }
  
  ```

**Truthy and falsy values:**
- All JS values have an inherent truthyness or falsyness about them
- Falsy values:
  - false
  - 0
  - "" (empty string)
  - null
  - undefined
  - NaN
- Everything else is truthy!

**Logical operators:**
- Combining expressions
- Logical AND: `&&`
  - Both sides must be true, for the entire things to be true
  ```js
  1 <= 4 && 'a' === 'a' //true
  9 > 10 && 9 >= 9 //false
  'abc'.length === 3 && 1 + 1 === 4 //false
  ```
- Logical OR: `||`
  - If one side is true, the entire thing is true
  ```js
  1 !== 1 || 10 === 10 //true
  10/2 === 5 || null //true
  0 || undefined //false
  ```
- Logical NOT: `!`
  - !expression returns true if the expression is false
  ```js
  !null  //true
  !(0 === 0) //false
  !(3 <= 4>) //false
  ```


## S17: JAVASCRIPT ARRAYS
#### TOPICS:
- Array basics - creating and updating
- Push and pop
- Shift and unshift
- Concat, indexOf
- Slice and splice
- Multi-dimensional arrays

**Arrays:**
- A type of data structure that allows us to store collections of data
- It's an ordered collections of values
- **Creating arrays**
  ```js
  // To make an empty array
  let students = [];

  // An array of strings
  let colors = ['red', 'orange', 'yellow'];

  // An array of numbers
  let lottoNums = [19,22,34,12,54];

  // a mix array
  let stuff = [true, 98, 'car', null];
  ```
- Arrays are indexed
  - Each element has a corresponding index (counting starts at 0)
- Arrays have length property to get the total number of elements in that array
- Use the square bracket `array[0]` notation and specify the index to access the value of an element. If there's no value at that index, it will return undefined
- **Modifying arrays**
  - Assign a new value at a particular index
    ```js
    let colors = ['rad', 'orange'];

    colors[0] = 'red';
    colors[1] = 88;
    colors[2] = 'green';
    //['red', 88, 'green']
    ```

**Array methods:**
- push - add to the end
- pop - remove from end
- shift - remove from start
- unshift - add to start
- These 4 methods will modify the original array

**Other simple array methods:**
- concat - merge arrays
  - It will create a new array that combines the two arrays, but doesn't modify the original arrays
  - `array1.concat(array2)`
- includes - look for a value
  - It checks to see if the array contains a particular value
  - It will return a boolean value, true or false
  - `array.includes(value)`
- indexOf - just like string.indexOf
  - Returns the first index at which a given element can be found in the array, or -1 if it is not present
  - `array.indexOf(element)`
- join - creates a string from an array
- reverse - reverses an array
  - `array.reverse()`
  - This method doesn't take any arguments 
  - This is a destructive method, it will change the original array
- slice - copies a portion of an array
  - `array.slice(startIndex, endIndex)`
  - It will return a copy of a portion of an array
  - If no arguments passed in, it will return a new copy of the array with all the elements in it
  - If only one argument is passed in, it will return elements starting from that specified index to the end of the array
  - The 2nd argument is the stopping point. Note that it DOES NOT INCLUDE the end element. It does, however, include the starting element
  - Use negative number to return the last x number of elements of the array. For example, array.slice(-3) will return the last three elements of the array
- splice - removes/replaces elements
  - `array.splice(start, deleteCount, optionalInsertItem)`
  - Changes the contents of an array by removing or replacing existing elements and/or adding new elements
  - This is a destructive method. Will mutate the original array
    ```js
    const months = ['jan', 'mar', 'apr', 'jun']

    // Inserts at index 1
    months.splice(1, 0, 'feb') //['jan', 'feb', 'mar', 'apr', 'jun']

    // Deletes at index 0
    // Returns an array of elements being deleted
    months.splice(0, 2) //['jan', 'feb']

    // Replaces 1 element at index 2
    months.splice(2, 1, 'may') //['mar', 'apr', 'may']
    ```
- sort - sorts an array
  - This method is not useful if we don't pass in any arguments to it

**Arrays and const**
- When assigning an array to a const variable, the values inside the array can change, as long as the reference remains the same
- Each array object has an address in memory
- When assigning an array to a variable, the variable is referencing/pointing to that memory address
- Will get an error if the const variable is reassigned to a different array, if it's referencing/pointing to a different memory address in memory
  ```js
  const nums = [1, 2, 3, 4];

  nums = 1 //No!
  nums = [1, 2, 3, 4] //No! This is pointing to a different array in memory even though it has the same content
  nums.push(5) //Yes! Adding another element at the end of nums array
  ```

**Multi-dimensional arrays:**
- Nested arrays: arrays can be stored inside other arrays
- To access an element of an array inside another array, use square bracket chaining notation `array[][]`


## S18: JAVASCRIPT OBJECT LITERALS
#### TOPICS:
- Creating and working with object literals
- Nesting arrays and objects

**JS objects:**
- It's another data structure that stores data as objects
- Objects are collections of **properties**
- Property = key + value
- Properties are a key-value pair
- The order of properties does not matter
- Rather than accessing data using an index, we use custom keys
- The syntax:
  ```js
  const object = {
    key1: value1,
    key2: value2,
    key3: value3
  }
  ```

**Creating object literals:**
- The object literal is referring the key-value pair object data structure using the curly braces: `object = {key: value}`
- Objects are reference-type
- The variable name is pointing to a memory address that has that particular object
- Separate multiple properties by commas `,`
- The value can be any of the primitive types, arrays, or objects
- An object can have different types of values
- The order of the properties does not matter

**Accessing data out of objects:**
- Every key turns into a string, regardless of its type
- Use the dot notation `.` to access a value out of an object. This is most common
- Another way is to use the square bracket notation `[]`
- The syntax:
  ```js
  // Using the dot notation
  object.key

  // Using bracket notation
  // Doesn't work if the key is not wrapped in quotation
  object["key"]
  ```

**Modifying objects:**
- If the object is assigned to a const variable, the content inside the object can change, as long as the reference remains the same
- To modify/update the object, first access the property using the object.key notation and then assign its value to a new value
  - The syntax: `object.key = newValue`
- Use the same syntax to add a new property to an object 
  - The syntax: `object.newKey = newValue`

**Nesting arrays and objects:**
- An array can contain a list of objects and an object can contain a list of arrays or objects. Inside each of these arrays and objects can nest other arrays and objects
- It is very common to mix and match arrays and objects together


## S19 - REPEATING CODE WITH LOOPS
#### TOPICS:
- For loops
- While loops
- The break keyword
- For...of loop
- Iterating arrays
- Nested loops
- Iterating objects

**Loops:**
- Loops allow us to repeat code, repeat some functionality
  - Print 'hello' 10 times
  - Sum all numbers in an array
- There are multiple types:
  - for loop
  - while loop
  - for...of loop
  - for...in loop

**For loop:**
- The for loop syntax:
  ```js
  // Start out at initialExpression
  // Check if the condition is true
  // If it is, execute the code block
  // Increment/decrement/etc the expression
  // The loop starts again -> check if condition is true -> run the code block if it is -> increment
  for ([initialExpression]; [condition]; [incrementExpression]) {
    // Run this code after each loop, while the condition is true
  }
  ```
- Example:
  ```js
  for (let i = 1; i <= 10; i++) {
    console.log(i)
  }
  // 1 2 3 4 5 6 7 8 9 10
  ```

**Looping over arrays:**
- Looping over an array is called iterating over an array
- To loop over an array, start at index 0 and continue looping to until last index (length-1)
- Example:
  ```js
  const animals = ['lions', 'tigers', 'bears'];

  for (let i = 0; i < animal.length; i++) {
    console.log(i, animals[i]);
  }
  //0 'lions'
  //1 'tigers'
  //2 'bears'
  ```

**While loops:**
- While loops continue running as long as the test condition is true
- While loop is useful when we don't know when something ends, when we don't know the number of iterations
- The syntax:
  ```js
  ([initialExpression];
  while([condition]) {
    // Run this code while the condition is true
    [incrementExpression];
  }
  ```

**The break keyword:**
- The break keyword will break out of a loop or a conditional when the condition is met

**The for...of loop:**
- A nice and easy way of iterating over arrays (or other iterable objects)
- The syntax:
  ```js
  for (variable of iterable) {
    statement
  }
  ```
- Example:
  ```js
  const fruits = ['apple', 'mango', 'pineapple', 'logan', 'papaya']

  for (let fruit of fruits) {
    console.log(fruit)
  }
  ```

**Iterating over objects:**
- The object literals are not considered iterables. They're objects, but they're not iterable objects
- We can create a new array by iterating over object literals using the `Object` keyword followed by one of the following methods
  - .keys(object) method that returns an array of that object keys
  - .values(object) method that returns an array of that object values
  - .entries(object) method that returns an array of arrays of key and value of that object
- Iterating over objects is not as common as iterating over arrays


## S20: JAVASCRIPT FUNCTIONS 101
#### TOPICS:
- Defining functions
- Working with arguments
- Function return values

**Functions:**
- Reusable procedures
- Functions allow us to write reusable, modular code
- We define a "chunk" of code that we can define then execute at a later point
- We can pass in some input that will impact the output that we get

**Creating a function:**
- It's a 2-step process: 
  - Define/register the function
  - Then execute/run the function. Can run as many times as we want
- Syntax for defining a function:
  ```js
  function funcName() {
    //do something
  }
  ```
- Syntax for executing a function:
  ```js
  funcName(); //run once

  funcName(); //run again!
  ```
- Only when executing the function will the code inside that function runs
- By convention, first define the function and then execute the function

**Arguments:**
- Inputs to a function
- The input impacts the output we get back
- Can pass in multiple arguments, separated by commas
- Define the argument when defining the function. This is called a parameter. Can give the parameter a name
- The parameter name should be meaningful. This param name is going to hold the value of an argument that is passed to the function
- If the expected argument is not provided or not passed in, it's going to have a value of undefined
- Example:
  ```js
  // Defining the function with parameter
  function greet(person) {
    console.log(`Hi ${person}!`)
  }

  // Calling the function with argument passed in
  greet(James); //"Hi James!"
  greet(Nancy); //"Hi Nancy!"
  ```

**Functions with multiple arguments:**
- A function can be defined to expect multiple arguments to be passed in. - Separate multiple parameters by commas
- The order of the params defined in a function and the arguments passed to the function is very important. The order of the parameter and argument must match
- Each argument can be of different type. Can be a string, integer, boolean, array, object, etc
- If no arguments is provided, it's value will set to undefined
- Example:
  ```js
  function profile(name, age) {
    console.log(`${name} is ${age} years old.`)
  }

  profile(James, 22); // James is 22 years old.
  profile(Nancy, 51); // Nancy is 51 years old.
  ```

**The return keyword:**
- The return keyword returns the output value of a function and we can capture that value in a variable
- Built-in methods return values when we call them. We can store those values
- The return statement ends function execution AND specifies the value to be returned by that function. Anything after the return keyword will not run
- The return keyword returns a single value
- Example:
  ```js
  function sumArray(array) {
    let total = 0;     
    for (let i = 0; i < array.length; i++) {
      total += array[i]
    }
    return total;
  }
  ```


## S21: MORE ON FUNCTIONS
#### TOPICS:
- Function scope
- Block scope
- Lexical scope
- Function expressions
- Higher order functions
- Returning functions
- The keyword "this"
- Adding methods to objects

**Scope:**
- Variable "visibility"
- The location where a variable is defined dictates where we have access to that variable

**Block scope:**
- Let and const keywords to making variables are block scope. This means you can only access the variable inside the block defined by the curly braces `{}`
- The var keyword is not scoped to block. The result is hard to predict and can run into issues with scoping
- This is true for conditionals, loops, functions
  ```js
  for (let i = 0; i < 5; i++) {
    let msg = "Inside a block"
    console.log(msg) //Will print the message 5 times
  }

  console.log(msg) //Can't access msg here
  ```

**Function scope:**
- If you define a variable in a function, it is scope to that function
  ```js
  function helpMe() {
    let msg = "I'm on fire!" //msg is scoped to the helpMe function

    msg: //"I'm on fire!"
  }

  msg; //NOT DEFINED!
  ```

**Lexical scope:**
- An inner function that is nested inside another function has access to the scope, the variable, defined in the scope of the outer function and outer outer function
- However, this is not true the other way around. Outer functions don't have access to variables defined in the inner function

**Function expressions**
- Function statement defines a function using the function keyword
  ```js
  function add(x, y) {
    return x + y;
  }
  ```
- Function expression defines an anonymous function and stores it in a variable
- Javascript treats functions just like a value, they can be passed around
  ```js
  const add = function (x, y) {
    return x + y;
  }
  ```

**Higher order functions:**
- Functions that operate on/with other functions
- They can:
  - Accept other functions as arguments
  - Return a function
- A function is just a value that can be stored in a variable, which means, it can be passed around
- **Functions as arguments:**
  ```js
  function callTwice(func) {
    func(); //executing the function
    func(); //executing the function again
  }

  function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
  }

  callTwice(rollDie); //pass a function as an arg!
  ```
- **Returning functions:**
  - Just like any return value, if we want to use it, we need to capture it and save it
  - So, save the return function in a variable
  - Then to execute the function, just call the variable with the parentheses
  ```js
  function makeBetweenFunc(min, max) {
    // Making a factory function
    return function(num) {
      return num >= min && num <= max;
    }
  }

  const isChild = makeBetweenFunc(0, 18)
  isChild(7) //true
  isChild(20) //false

  const isAdult = makeBetweenFunc(19, 65)
  isAdult(30) //true
  ```

**Methods:**
- We can add functions as properties on objects
- We call them **methods**
- Every method is a function. But on every function is a method
- Syntax for calling a method: `object.method(arg)`
  ```js
  const math = {
    PI: 3.14159,
    multiply: function(x,y) {
      return x * y;
    },
    divide: function(x,y) {
      return x / y;
    }

    // SHORTHAND
    multiply(x,y) {
      return x * y;
    },
    divide(x,y) {
      return x / y;
    }
  }
  ```

**'this' in methods:**
- Use the keyword 'this' to access other properties on the same object
- The most common way of using the this keyword is inside a method
  ```js
  const person = {
    first: 'Robert',
    last: 'Johnson',
    fullName() {
      return `${this.first} ${this.last}`
    }
  }

  person.fullName(); //"Robert Johnson"
  person.last = "Plant";
  person.fullName(); //"Robert Plant"

  const fullName2 = person.fullName;
  fullName2(); //"undefined undefined" The this keyword refers to the global window object, not person object
  ```
- The value of 'this' depends on the invocation context of the function it is used in. It depends on how we call the function
  - The keyword this refers to the object that is on the left of the dot. `object.method()`
  - In the example `person.fullName();`, the keyword this refers to the person object
  - When invoking a method and nothing is specified on the left of the dot, the object the this keyword refers to is the window object


## S22: CALLBACKS AND ARRAY METHODS
- There are a set of built-in array methods that we have access to for every array in JS. These methods require that we pass in a function, they accept a callback function as an argument

#### TOPICS:
- ForEach
- Map
- Arrow functions
- Filters
- Some and every
- Reduce


**The forEach method:**
- Accepts a callback function
- Calls the function once per element in the array
- The for...of loop does the same thing as this method
  ```js
  const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  nums.forEach(function (n) {
    console.log(n * n)
    //prints: 81, 64, 49, 36, 25, 16, etc
  })

  for (let n of nums) {
    console.log(n * n)
  }

  nums.forEach(function (el) {
    if (el % 2 === 0) {
      console.log(el)
      //prints: 8, 6, 4, 2
    }
  })
  ```

**The map method:**
- Creates a new array with the results of calling a callback on every element in the array
- The callback function will return a value and map adds this value to a new array that it generates
- Map returns this new array and we can save this array in a variable
- It is useful when we want to transform the starting array and create a new array based upon that starting array
  ```js
  const texts = ['cat', 'dog', 'wolf', 'rabbit'];
  const caps = texts.map(function (t) {
    return t.toUpperCase();
  })

  text; //["cat", "dog", "wolf", "rabbit"]
  caps; //["CAT", "DOG", "WOLF", "RABBIT"]
  ```

**Arrow functions:**
- It's a newer syntax for defining function expressions
- "Syntactically compact alternative" to a regular function expression
  ```js
  const square = (x) => {
    return x * x;
  }

  const sum = (x, y) => {
    return x + y;
  }
  ```
- A **function expression** cannot exist on its own. It's a value that we can save it to a variable, we can pass it as an argument, we can return it
  ```js
  con add = function(x, y) {
    return x + y;
  }
  ```
- We can't declare a function expression on its own. We have to use a function statement and give it a name
  ```js
  function add(x, y) {
    return x + y;
  }
  ```
- **Arrow function** is the same way. We can't do this:
  ```js
  (x, y) => {
    return x + y;
  }
  ```
- Arrow function assigned to a variable:
  ```js
  const add = (x, y) => {
    return x + y;
  }

  // To execute the function
  add(2, 4);

  // Parens are optional if there's only one parameter
  const square = x => {
    return x * x;
  }

  // Use empty parens for functions with no parameters
  const singSong = () => {
    return "lalalala";
  }
  ```

**Arrow function implicit returns:**
- All these functions do the same thing:
  ```js
  const isEven = function (num) { //regular function expression
    return num % 2 === 0;
  }
  const isEven = (num) => { //arrow function with parens param
    return num % 2 === 0;
  }
  const isEven = num => { //no parens around param
    return num % 2 === 0;
  }
  const isEven = num => ( //implicit return
    num % 2 === 0;
  );
  const isEven = num => num % 2 === 0; //one-liner implicit return
  ```

**The filter method:**
- Creates a new array with all elements that pass the test implemented by the provided function
  ```js
  const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const odds = nums.filter(n => {
    return n % 2 === 1; //our callback returns true or false
    //if it returns true, n is added to the filtered array
  })
  //[9, 7, 5, 3, 1]

  const smallNums = nums.filters(n => n < 5);
  //[4, 3, 2, 1]
  ```

**The some method:**
- Similar to every, but returns true if ANY of the array elements pass the test function
  ```js
  const words = ['dog', 'jello', 'log', 'cupcake', 'bag', 'wag'];

  // Are there any words longer than 4 characters?
  words.some(word => {
    return word.length > 4;
  }) //true

  // Do any words start with 'Z'?
  words.some(word => word[0] === 'Z'); //false

  // Do any words contain 'cake'?
  words.some(w => w.includes('cake')); //true
  ```

**The every method:**
- Test whether ALL elements in the array pass the provided function
- It returns a boolean value, true or false
  ```js
  const words = ['dog', 'jello', 'log', 'cupcake', 'bag', 'wag'];

  words.every(word => {
    return word.length === 3;
  }) //true

  words.every(word => word[0] === 'd'); //false

  words.every(w => {
    let last_letter = w[w.length - 1];
    return last_letter === 'g'
  }) //true
  ```

**The reduce method:**
- Execute a reducer function on each element of the array, **resulting in a single value**
- Example: summing an array
  ```js
  const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const sum = nums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, initialValue);
  // The reducer method accepts an optional initial value as 2nd arg
  ```

**Arrow function and 'this':**
- The keyword this behaves differently inside an arrow function vs. inside a regular function
- The this keyword inside a non-arrow function has nothing to do with the scope where the function is created. It has to do with how the function is executed
- Keyword this inside a traditional function:
  ```js
  const person = {
    firstName: 'Shawn',
    lastName: 'Kemp',
    fullName: function () {
      return `${this.firstName} ${this.lastName}`
    }
  }

  person.fullName(); //"Shawn Kemp"
  ```
- The this keyword inside an arrow function refers to the scope that the function was created in
- Keyword this inside an arrow function:
  ```js
  const person = {
    firstName: 'Shawn',
    lastName: 'Kemp',
    fullName: () => {
      return `${this.firstName} ${this.lastName}`
    }
  }

  person.fullName(); //"undefined undefined"
  //this keyword refers to the window object
  ```
- It's not common to use an arrow function to define a method in an object


## S23: NEWER JAVASCRIPT FEATURES
#### TOPICS:
- Spread with arrays
- Spread with objects
- Destructuring
- Default params
- Spread in function calls
- Rest params

**Default params:**
- Add the equal sign and the default value directly in the parameter list
- When calling the function, if an argument is not provided, it will default to the assigned default value in the function definition 
  ```js
  function multiply(a, b = 1) {
    return a * b;
  }

  multiply(4); //4  When 2nd arg is not provided
  multiply(4, 5); //20
  ```

**Spread:**
- Spread syntax allows an iterable such as
  - an array to be expanded in places where zero or more arguments (for function calls)
  - or elements (for array literals) are expected,
  - or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected
- The idea is we're taking iterables and spreading them out. Where we spread the iterables into may vary

**Spread with function calls:**
- Expands an iterable (array, string, etc.) into a list of arguments
- Each element/item becomes each individual arguments
  ```js
  const nums = [9, 3, 2, 8];

  Math.max(nums); //NaN

  // Use spread
  Math.max(...nums); //67
  // Same as calling: Math.max(9,3,2,8);

  console.log(...'hello') //h e l l o
  ```

**Spread with array literals:**
- Expands an iterable or multiple iterables of different types into a new array
- Use square braces `[]` to spread into array literal
- The order of the spreads impacts the order of items in the new array
  ```js
  const fruits = ['apple', 'orange']
  const veggies = ['carrot', 'mushroom']

  const copy = [...fruits] //make a copy of an array
  const mix = [...fruits, ...veggies]
  //['apple', 'orange', 'carrot', 'mushroom']
  const mix = [1, 2, 3, ...fruits, ...veggies, 'cooking']
  //[1, 2, 4, 'apple', 'orange', 'carrot', 'mushroom', 'cooking']
  [...'hello'] //["h", "e", "l", "l", "o"]
  ```

**Spread with object literals:**
- Copies properties from one object into another object literal
- Use curly braces `{}` to spread into object literal
- The order of the spread matters. If there's a property conflict, the last property in the list will win
  ```js
  const feline = { legs: 4, family: 'Felidae' }
  const canine = { family: 'Caninae', furry: true }

  const copyFeline = { ...feline }
  //{legs: 4, family: "Felidae"}

  const dog = { ...canine, isPet: true }
  //{family: "Caninae", furry: true, isPet: true}

  const lion = { ...feline, genus: 'Panthera' }
  //{legs: 4, family: "Felidae", genus: "Panthera"}

  const catDog = { ...feline, ...canine }
  //{legs: 4, family: "Caninae", furry: true}
  ```

**Rest params**
- It looks like spread, but it's not! 
- It does the opposite of spread. It collects all the params into an array
- **The arguments object:**
  - Available inside every function
  - It's an array-like object
    - Has a length property and it's indexed just like an array
    - Does not have array methods like push/pop
  - Contains all the arguments passed to the function
  - Not available inside of arrow functions
  ```js
  function sumAll() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }

  sumAll(8, 4, 3, 2); //17
  ```
- **The rest params:**
  - Collects all remaining arguments into an actual array
  - Use the 3 dots followed by the custom name of param
  - Can call array methods on it
    ```js
    function sum(...nums) {
      console.log(nums)
    }

    sum(34, 65, 77);
    //[34, 65, 77]
    ```
  - With rest params, we can call out specific params and collect all remaining arguments. Cannot do this with arguments object
    ```js
    function raceResults(gold, silver, ...everyoneElse) {
      console.log(gold)
      console.log(silver)
      console.log(everyoneElse)
    }

    raceResults('Tammy', 'Tod', 'Tina', 'Travis', 'Tim')
    //Tammy
    //Tod
    //Tina,Travis,Tim
    ```

**Destructuring:**
- A short, clean syntax to 'unpack':
  - Values from arrays
  - Properties from objects
- Into distinct variables
- The original array or object doesn't change
- **Destructuring arrays:**
  - Assigns the array elements into distinct variables
  - The syntax: `const [] = array;`
  - Note that order matters because it's based on position
    ```js
    const raceResults = [ 'Eliud', 'Feyisa', 'Galen' ];

    // Destructuring an array
    const [ gold, silver, bronze ] = raceResults;
    gold; //"Eliud"
    silver; //"Feyisa"
    bronze; //"Galan"

    const [ fastest, ...everyoneElse] = raceResults;
    fastest; //"Eliud"
    everyoneElse; //["Feyisa", "Galen"]
    ```
- **Destructuring objects:**
  - Extracts a property value into its own variable
  - The syntax: `const {} = object;`
  - The order does not matter, however, the variable name must match the property name
  - Can re-assign the variable name to a new name using colon sign: `const { currentName: newName } = object;`
  - Can also assign a default value using equal sign
    ```js
    const runner = {
      first: 'Eliud',
      last: 'Kipchoge',
      country: 'Kenya',
      title: 'Elder of the Order of the Golden Heart'
    }
    // Destructuring an object
    const { first, last, country, died = 'N/A' } = runner;

    first; //"Eliud"
    last; //"Kipchoge"
    country; //"Kenya"
    ```
- **Destructuring params:**
  - When we're defining a function, we can destructure the values that are being passed in
  - It's most frequent use with objects
  - Can also assign a default value to the destructure param
    ```js
    function fullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`
    }
    ```
  - When a function is expecting an object as an argument, we can destructure just the properties that we want to use from the object in the function param
    - Use the curly braces `{}` and list out the properties
    ```js
    function fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`
    }
    ```


## S24: INTRO TO THE DOM
#### TOPICS:
- getElementById
- querySelector
- innerHTML and text
- Changing styles
- classList
- Creating/removing elements
- Manipulating attributes
- Traversing the DOM

#### Properties and Methods (the important ones):
- classList
- getAttribute()
- setAttribute()
- appendChild()
- append()
- prepend()
- removeChild()
- remove()
- createElement
- innerText
- textContent
- innerHTML
- value
- parentElement
- children
- nextSibling
- previousSibling
- style

**The DOM:**
- The DOM is a Javascript representation of a webpage
- It's your JS "window" into the contents of a webpage
- It's just a bunch of JS objects that you can interact with via JS

**The document object:**
- The document object is our entry point into the world of the DOM. It contains representations of all the content of a page, plus tons of useful methods and properties
- The browser automatically creates this document object based on the content of the page
- In the browser console, type in `console.dir(document)` to see the document object
- We use the JS document object to manipulate the web page

**Selecting methods:**
- **getElementById()**
  - This is selecting the Javascript DOM object representation of the element of matching id
  - We're not selecting the HTML or the CSS styles, we're selecting the DOM object which Javascript created
  - The returned element is an object
  - If no element is found with that id, it will return null
  - `const banner = document.getElementById('banner')`
  - `console.dir(banner) //div#banner`
- **getElementsByTagName()**
  - Get multiple elements by its tag name
  - It returns an array-like HTMLCollection of Elements. These Elements are objects
  - The HTMLCollection array is iterable, is indexed, has a length property, and can use for...of loop on it. But it does not have regular array methods
  - `const allImages = document.getElementsByTagName('img');`
- **getElementsByClassName()**
  - Get elements by class name
  - It returns an HTMLCollection of Elements
  - If it can't find elements by that class name, it will return an empty HTMLCollection array
  - `const squareImages = document.getElementsByClassName('square');`
- **querySelector**
  - A newer, all-in-one method to select a single element
  - It will return the first matching element found
    ```js
    // Finds first h1 element
    document.querySelector('h1');

    // Finds first element with ID of red
    document.querySelector('#red');

    // Finds first element with class of
    document.querySelector('.big');
    ```
- **querySelectorAll**
  - Same idea as querySelector, but returns **a collection** of matching elements, instead of the first match
  - It returns a NodeList array
  - `document.querySelectorAll('p a'); //Select all anchor tags inside p tag`

**innerHTML, textContent, and innerText:**
- These are properties inside an Element object. So we can call these properties on an object/Element
- Use these properties to retrieve and update the content of an element
- The difference between innerText and textContent is innerText will not display text that is set to hidden
  ```js
  // Retrieve the text value inside the first p tag found
  document.querySelector('p').innerText
  ```
- The innerHTML property gets or sets the entirety of the markup, including all the tag names, contained within some element
- The innerHTML syntax:
  ```js
  const content = element.innerHTML

  element.innerHTML = htmlString;
  ```

**Working with attributes:**
- Some elements have more attributes than others
- Class, id, and type are considered attribute
- `document.querySelector('a').title`
- **getAttribute() method**
- **setAttribute() method**


## S25: THE DOM EVENTS
#### TOPICS:
- Introducing events
- addEventListener
- Forms events
- Keyboard events
- Input and change events
- Event bubbling
- Event delegation

**Events:**
- Listen for and respond to user inputs and actions 
- Javascript listens for events such as clicks, drags, drops, hovers, scrolls, form submission, key presses, focus/blur, etc.

**addEventListener:**
- It's a generic event listener method we can use to specify the event type and a callback to run when the event occurs
- The 1st argument is the event type the element is listening for. It's in a string
- The 2nd argument is the callback function we want to run when the event occurs
  ```js
  // Selecting the element
  const button = document.querySelector('h1');

  // Add event listener to the element
  button.addEventListener('click', () => {
    alert('You clicked me!!')
  })
  ```

**The event object:**
- The event object is automatically passed in to every event handler or event callback function
- We can capture this event object in the callback parameter by giving it a name
- It contains properties and information about that particular event. We rely on this event object to get certain data on the event 
  ```js
  document.querySelector('button').addEventListener('click', (event) => {
    console.log(event)
    //do something
  })
  ```

**Form events and preventDefault:**
- By default, when a form is submitted, the browser will submit the data and redirect the page to somewhere else. We can use Javascript to prevent this default behavior using the preventDefault method on the event object
- We can then use the submitted data to do something on the same page
  ```js
  document.querySelector('#tweetForm').addEventListener('submit', function (e) {
    e.preventDefault();
  })
  ```
- The user input value is stored in the object event elements value property
  - `formElement.elements.inputName.value`
  - `tweetForm.elements.username.value`

**Input and change events:**
- The change event gets fired when the user blurs out of the input field 
- The input event fires when there's a value change in the input field
  ```js
  const input = document.querySelector('input');
  const h1 = document.querySelector('h1');

  input.addEventListener('input', (e) => {
    // Update the h1 text to the input value
    h1.innerText = input.value;
  })
  ```


## S27: ASYNC JAVASCRIPT
#### TOPICS:
- Working with promises
- Async functions
- The callback stack
- Callback hell
- Understanding WebAPI's
- Creating our own promises

**Call stack:**
- The mechanism the JS interpreter uses to keep track of its place in a script that calls multiple functions
- How JS "knows" what function is currently being run and what functions are called from within what function, etc
- A stack is a basic data structure in computer science. It is known as a last in first out (LIFO) data structure
- **How it works**
  - When a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function
  - Any functions that are called by that function are added to the call stack further up, and fun where their calls are reached
  - When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing
  ```js
  const multiply = (x, y) => x * y;

  const square = (x) =>  multiply(x, x);

  const isRightTriangle = (a, b, c) => {
    return square(a) + square(b) === square(c);
  };

  isRightTriangle(3, 4, 5); //true
  ```

**WebAPIs and single threaded:**
- JS is single threaded. This means that at any given point in time, that single JS thread is running at most one line of JS code
- Certain lines of code may take longer to complete than others. For example, it takes time when making requests to the server to fetch data
- Browsers come with Web APIs that are able to handle certain tasks in the background (like making requests or setTimeout)
- The JS call stack recognizes these Web API functions and passes them off to the browser to take care of
- Once the browser finishes those tasks, they return and are pushed onto the stack as a callback

**Working with promises:**
- A Promise is an object representing the eventual completion or failure of an asynchronous operation
- A promise has three states: a pending, a resolved, or a rejected
- A promise is a returned object to which you can attach callbacks to it that will run, depending on whether the promise is resolved or rejected
  - Use the .then() method and pass in the callback as an argument for a promise that is resolved
  - Use the .catch() method and pass in a callback as an argument for a promise that is rejected
- A promise can be resolved or rejected with a value passed to it. We can capture the value (often called data for resolved and error for rejected) in the callback parameter 

**Creating our own promises:**
- To make a promise: `new Promise()`
- It takes a callback function
- The callback takes two parameters: 
  - resolve - it represents the resolution of the promise
  - reject - it represents the rejection of the promise
  - resolve and reject are functions we can execute inside the promise
- If resolve or reject isn't called, the promise will be pending
- The syntax:
  ```js
  new Promise((resolve, reject) => {

  })
  ```
- An example:
  ```js
  const fakeRequest = (url) => {
    // Use the return keyword to return a promise
    return new Promise((resolve, request) => {
      const rand = Math.random();
      setTimeout(() => {
        if (rand < 0.7) {
          resolve('Your data here');
        }
        reject('Request error!');
      }, 1000)
    })
  }

  fakeRequest('/dogs/1')
    .then((data) => {
      console.log('Done with request!');
      console.log('data is: ', data)
    })
    .catch((err) => {
      console.log('Oh no!', err);
    })
  ```

**Async functions:**
- A newer and cleaner syntax for working with async code. It's a syntactic sugar for promises
- Two keywords for async functions and they work together: async and await
- **The async keyword**
  - To declare a function as an async function is by adding the async keyword in front it. Can declare an async function with arrow function
  - Async functions always return a promise. It does this automatically behind the scene without us writing a promise
  - If the function returns a value, the promise will be resolved with that value
  - If the function throws an exception, the promise will be rejected
  - Since it returns a promise, we can chain on the then/catch methods to handle the resolved data or rejected error in a callback function
  ```js
  const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'corgi') return 'Welcome!'
    throw 'Invalid Password'
  }

  login('dkieei', 'corgi')
    .then(msg => {
      console.log('Logged in!')
      console.log(msg)
    })
    .catch(err => {
      console.log('Error!')
      console.log(err)
    })
  ```
- **The await keyword**
  - We can only use the await keyword inside of functions declared with async
  - await will pause the execution of the function, waiting for a promise to be resolved before continuing on
- If an async function returns a promise with a value, we can capture that value in a variable
  - `let data = await fakeRequest('/page1');`
- Use try/catch block to handle errors in async functions
  ```js
  async function makeTwoRequests() {
    try {
      // Capture the value from the returned promise in a variable
      let data1 = await fakeRequest('/page1');
      console.log(data1);
      let data1 = await fakeRequest('/page2');
      console.log(data2);
    } catch (err) {
      console.log('Caught an error!');
      console.log('error is: ', err);
    }
  }
  ```


## S28: AJAX AND API'S
#### TOPICS:
- Working with API's
- Intro to JSON
- Working with Axios
- Postman
- The fetch API

**Ways to make requests:**
- XMLHTTP
- fetch 
- axios

**AJAX**
- Asynchronous
- Javascript
- And
- XML -> JSON

**API** - application programming interface
- A broad term that refers to one software interface with another piece of software
- It does not have to do with the web. What most developers refer to is web API's
- Web API's are web interfaces that are web-based, HTTP-based
- Companies expose certain endpoints and these endpoints (URLs) respond with information for other pieces of software/application to consume. These endpoints are like portals to applications, database, information, etc
- Most of the time, the API response is in JSON format
- Every API is different. Refer to the company's api doc on how to use it

**JSON**
- Java 
- Script
- Object
- Notation
- JSON is just a format for sending data
- It's a way of formatting data that is consistent and predictable
- JSON can work with other programming languages, not just JS. Each programming language has their way of parsing JSON data into their native language
- It's very similar to Javascript and it's based upon on JS object and syntax. But there are keep differences
  - All keys must be wrapped in double quotations
  - Values that JSON accepts include: object, array, string, number, "true", "false", "null"
- `JSON.parse()` is a method to parse JSON string into Javascript object
- `JSON.stringify()` is a method that turns Javascript object into JSON string format. By default, all instances of `undefined` are replaced with `null`

**Query strings and headers:**
- A query string is a way of providing additional information to a request
- Query string is key-value pair information we can pass in to the URL as part of the endpoint
- Some API's require that we specify the header

**The fetch API:**
- The newer way of making HTTP requests using Javascript
- Supports promises
- Not supported in Internet Explorer
- The syntax: `fetch('url')` 
  - It will return a Promise with a Response object
  - However, this Response object does not have the body data yet. The data comes on a different stream
  - We need to call the .json() method on the Response object. This will return a promise and it is an asynchronous operation. It will wait for the data to arrive and then parse it in json string
  - We can then chain on a 2nd .then() method to capture the data returned from the promise
  ```js
  fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
      console.log('Response, waiting to parse...', res)
      return res.json()
    })
    .then(data => {
      console.log('Data parsed...')
      console.log(data.ticker.price)
    })
    .catch(err => {
      console.log('Oh no! Error!', err)
    })

    // Async function with fetch api
    const fetchBitcoinPrice = async () => {
      try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data.ticker.price);
      } catch (err) {
        console.log('Something went wrong!', err)
      }
    }
  ```

**Making requests with Axios:**
- A library for making HTTP requests. It's build on top of fetch
- Axios works both with client-side JS and Node.js on the server-side
- For client-side, include the jsDelivr CDN script before the app.js script in index.html file. Inside the `<head>` tag works
  - `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
- The syntax: `axios.get('url')`
  - It returns a Promise with the Response object
  - Unlike fetch, the promise is resolved only when everything is finished
  - If the promise is resolved, the data is already included and parsed
  ```js
  axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
      console.log(res.data.ticker.price);
    })
    .catch(err => {
      console.log('Error!', err)
    })

  // Async function with fetch api
  const fetchBitcoinPrice = async () => {
    try {
      const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
      console.log(res.data.ticker.price);
    } catch (err) {
      console.log('Error!', err)
    }
  }
  ```

**Setting headers with Axios:**
- Some API's require that you specify the headers. Refer to their doc
- The headers itself is an object
- We can specify the headers as a 2nd argument to the axios.get() method
- The syntax: `const res = await axios.get('url', headers)`
  ```js
  const getDadJoke = async () => {
    try {
      const config = { headers: { Accept: 'application/json' } }
      const res = await axios.get('https://icanhasdadjoke.com/', config)
      console.log(res.data.joke)
    } catch (e) {
      return 'No jokes available! Sorry'
    }
  }
  ```


## S30: INTRO TO NODE.JS
#### TOPICS:
- Installation
- The Node REPL
- Running Node files
- Process
- argv
- File system module

**What is Node?**
- A Javascript runtime
- Until recently, we could only run Javascript code in a web browser, Node is a Javascript runtime that executes code outside of the browser
- We can use the same Javascript syntax to write a server-side code, instead of relying on other languages like Python or Ruby
- Some of Node use cases
  - Web servers
  - Command line tools
  - Native apps
  - Video games
  - Drone software
- Node comes with many built-in modules that don't exist in the browser. These modules help us do things like interact with the operating system and files/folders
- To enter Node REPL, run in the command line: `node`

**Running Node files:**
- To execute a JS file in the terminal, run in the terminal: `node fileName.js`
- Make sure you're in the current directory or reference the correct path to the file

**Process and argv**
- Process is a global object that contains useful methods and properties
- The `process.argv` property returns an array containing the command line arguments passed when the Node.js process was launched
  - 1st element is the executable path
  - 2nd element is the path to the file you're running
  - The remaining elements are additional arguments you pass in

**File system module:**
- FS module has to do with the file system. For example, make a file, copy a file, or delete a file or folder
- Need to import/require in the fs module: `const fs = require('fs');`
- fs is an object with a whole bunch of methods we can call on


## S31: NODE MODULES AND NPM
#### TOPICS:
- Module.exports
- Requiring modules
- Using NPM
- Installing packages
- Creating package.js files

**Working with module.exports:**
- `module.exports` by default, is an empty object
- `module.exports` is an object that we can add other properties on to. Other files can then require in the module and have access to the properties that were exported
- In a file, we can specify exactly what properties we want to export
- We can also destructure only the properties we want to use from a module
- The `exports` variable is a shorthand syntax to refer to `module.exports` object
- If we export our own file, we need to reference the path to the file
- We can actually require the entire directory. This is a very common pattern when working with npm packages, a third-party libraries written by other developers
  - When require in a directory, Node is going to look for the index.js file and whatever this file exports, it's what the directory will export
  - For example, there's a directory called shelter and in it contains four files: index.js file, cat1.js, cat2.js, cat3.js. The index.js file requires in the three cat modules and exports the three modules as an array. Another file called app.js requires in the shelter directory: `const cats = require('./shelter')`

**NPM: Node Package Manager:**
- NPM is two things:
  - It's a library of thousands of packages published by other developers that we can use for free
  - A command line tool to easily install and manage those packages in our Node projects
- npm comes with Node

**Installing npm packages:**
- When installing an npm package in our Node application, the code for that library will be stored in a directory called node_modules
- A file called package-lock.json is also created. This file is a record of the contents of the node_modules directory
- When require in the library in a file, we just refer to the name of the library. Node will go look for the module in the node_modules directory
  - `const jokes = require('give-me-a-joke');`
- Refer to the library's doc on how to use it
- Some npm packages we want to install globally and others we want to install them locally, meaning, installing in a particular project directory. When installing locally, files outside of the directory will not have access to the module
- To install a package globally, add the `-g` flag

**The package.json file:**
- Every Node app that we create should have the package.json file. It contains the metadata or information about the application or package 
- This file also contains a list of dependencies and its version used. It acts as a record that keeps track of all the dependencies installed in an application
- To create the package.json file, run in the command line: `npm init -y`
- Put this file at the root directory of a project
- We use this package.json file to share dependencies used in a project with other developers
- To install all the dependencies at once, go to the project directory and run: `npm install`. This will generate the node_modules directory necessary to run the application


## S32: CREATING SERVERS WITH EXPRESS
#### TOPICS:
- What are frameworks?
- Our first Express app
- Routing basics
- Path parameters
- Working with query strings
- Nodemon

**Express:**
- Express is a web development framework
- Express is a "fast, unopinionated, minimalist web framework for Node.js." It helps us build web applications. It helps us get servers up and running with Node
- It's just an NPM package which comes with a bunch of methods and optional plugins that we can use to build web applications and API's
- Express helps us...
  - Start up a server to listen for requests
  - Parse incoming requests
  - Match those requests to particular routes
  - Craft our http response and associated content
- Libraries vs. frameworks
  - When you use a library, you're in charge. You control the flow of the application code, and you decide when to use the library
  - With frameworks, that control is inverted. The framework is in charge, and you are merely a participant. The framework tells you where to plug in the code

**Our first Express app**
- Create a project directory and cd into the directory. Run `npm init -y` to create the package.json file
- Install Express package: `npm i express`
- In project directory, create a file called index.js
- In index.js file:
  - Require in Express in order to use it: `const express = require('express');`
  - Next, execute express because it's a function. Save the returned value in an app variable: `const app = express();`
  - The app object contains a whole bunch of properties and methods. It is an Express application
  - To start an Express server, call the listen() method on app object
    - The 1st argument is the port to listen to. We'll listen on port 3000
    - The 2nd arg is a callback function. This function runs when the app starts listening on port 3000
- Run the Node application in the terminal: `node index.js`
  - Now the server is listening for incoming requests on port 3000
  - Run `Ctrl c` to quit the server from listening
- This server is only served on local machine. If you're on a different network or other machine, you won't be able to make requests on this server
- To view the server listening on a particular port on the local machine, go the the browser and type in: `localhost:3000`
- Our goal is to have an incoming request and get an outgoing response
- Call the use() method on app and pass in a callback function. Anytime when there's an incoming request on this port, `app.use()` will run and the callback will execute. This registers that there's an incoming request
  ```js
  const express = require('express');
  const app = express();
  //console.dir(app);

  app.use(() => {
    console.log('We got a new request!');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });
  ```

**The request and response objects**
- Express automatically makes two objects on every incoming request. These two objects are automatically passed in as two parameters in the callback function of `app.use()` method
  - The first param, usually called req, is the request object which represents the incoming request
  - The second param, usually called res, is the response object representing the outgoing response
  - We have access to both of these objects
  - So an HTTP request is not a Javascript object. It's just text information. It is not particular to any programming language
  - In this case, Express parses the HTTP request data and turns it into a req object that it passes in to our callback `app.use()`
    - This req object contains a whole bunch of information about the request, such as the pathname, the port number, the headers object
  - The res object has a whole bunch of methods and properties that can be used to generate a response to whoever made the request
    - The send() method sends the HTTP response. If the response is an array or object, the content-type is in application/json format
  ```js
  app.use((req, res) => {
    // Sending a response with a string
    res.send('Hello, we got your request!');
    // Sending a response with an object
    res.send({ color: 'violet' });
  })
  ```

**Express routing basics:**
- Routing is taking incoming requests in a path that is requested and matching that to some code in some response
- The path of the request is a route. We are routing some incoming request to some outgoing response
- The app.get() method is used to receive the path of an incoming request and a callback to send a response to the matching path
  - This method expects two arguments
  - 1st arg is the pathname of the request
  - 2nd arg is a callback that takes req and res as arguments. In this callback, we can call res.send() method to send a response to the requested path
  - The callback only runs if the route pathname matches
  ```js
  app.get('/', (req, res) => {
    res.send('This is the home page!');
  });

  app.get('/cats', (req, res) => {
    res.send('Meow!');
  });

  app.get('/dogs', (req, res) => {
    res.send('Woof!');
  });
  ```
- The `'/'` path is considered the root route. It's the home page
- There are other HTTP incoming requests that we can listen for. We respond with different contents for different incoming requests
  - app.get()
  - app.post()
  - app.put()
  - app.delete()

**Express path parameters:**
- In the URL pathname, the colon followed by the path definition string indicates a variable, not the actual name in the path itself: `'/r/:subreddit/:postId'`. We're looking for a pattern
- We can access the values of path params in the `req.params` property
```js
app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit with post Id ${postId}</h1>`);
});
```

**Working with query strings:**
- A query string is a portion of the URL that comes after a question mark. We can include information, as key-value pairs, as part of this query string
- The request object that Express constructs for us and passes in to our callback has a property called query. This query property contains the key-value pair based upon the query string. We can access the query string in `req.query`
- If there are multiple key-value pairs query strings, separate them with ampersand `&`
```js
app.get('/search', (req, res) => {
  const { q } = req.query;
  res.send(`<h1>Search results for: ${q}</h1>`)
})

// In the browser
localhost:3000/search?q=cat
// Output
Search results for: cat
```

**Auto-restart with Nodemon:**
- There's a way to automatically restart/reload the server when we change our codebase
- Nodemon is a tool that will watch for changes to our files and will restart the server for us
- Install nodemon globally: `npm i -g nodemon` 
- Run: `nodemon index.js`


## S33: CREATING DYNAMIC HTML WITH TEMPLATING
#### TOPICS:
- What is templating
- Configuring Express for EJS
- Passing data to templates
- Serving static assets 
- Creating partials
- EJS loops and conditionals

**What is templating?**
- Templating allows us to define a preset "pattern" for a webpage, that we can dynamically modify
- Instead of writing static HTML code that's always the same, we can embed information and logic. So we can repeat parts of the template over and over with a loop as an example. Or conditionally show or hide something
- For example, we could define a single "Search" template that displays all the results for a given search term. We don't know what the term is or how many results there are ahead of time. The webpage is created on the fly
- There are many templating engines out there to help us do this. These include EJS, handlebars, jade language, pug, and nunjucks
- The tool we will be using is EJS - Embedded Javascript templating
  - It embeds actual Javascript inside the template

**Configuring Express for EJS:**
- In index.js file:
  - Use the `app.set()` method to specify the view engine as EJS
    - This method takes 2 arguments. 1st arg is the key and 2nd arg is the value
  - `app.set('view engine', 'ejs');`
- Install EJS: `npm i ejs`
- We don't need to require in ejs, because Express, behind the scenes, will require the package called ejs 
- By default, when we create an Express app and we're using some view engine, Express is going to assume that our views (our templates) exists in a directory called views
- Create a directory called view. In view folder, create a file called home.ejs
- In home.ejs file:
  - Generate an HTML DOCTYPE boilerplate
  - Add an h1 text
  - Add two paragraphs of text
- In index.js file:
  - In the callback `app.get()` method, use the `res.render()` method and pass in the home template as an argument. This will render the home.ejs template onto the home page
  ```js
  app.get('/', (req, res) => {
    res.render('home')
  });
  ```
- Final code in index.js file:
  ```js
  const express = require('express');
  const app = express();

  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  ```

**Setting the views directory:**
- We want to set up the path to views directory in such a way that regardless of where nodemon runs the index.js file, Express will be able to find the views directory
- We want to join the path to index.js file with the views directory path
- In index.js file:
  - Require in the path module: `const path = require('path');`
  - Use the `app.set()` method to set the 'views' key to the path that joins the index.js file path with the path of views directory
  - `app.set('views', path.join(__dirname, '/views'));` 

**EJS interpolation syntax:**
- Tags
  - `<%` 'Scriptlet' tag, for control-flow, no output
  - `<%=` Outputs the value into the template (HTML escaped)
  - `<%-` Outputs the unescaped value into the template
  - `%>` Plain ending tag
- Whatever is inside the `<%= %>` tag will be evaluated and displayed in the template
- Examples:
  ```ejs
  <h1>The Home Page <%= 4 + 5 + 1 %></h1>
  <h1>The Home Page <%= 'hello world'.toUpperCase() %></h1>
  ```

**Passing data to templates:**
- We can pass information from our route to our template
- In index.js file:
  ```js
  app.get('/rand', (req, res) => {
    // Generate random number
    const num = Math.floor(Math.random() * 10) + 1;

    // 1st arg is the random.ejs file
    // 2nd arg is JS passed in as an object
    // This object will be passed through to the template
    res.render('random', { num });
  });
- In views/random.ejs file:
  ```ejs
  <h1>Your random number is: <%= num %></h1>
  ```
- In the browser:
  - Visit the URL: `localhost:3000/rand`
  - A random number will be generated every time you refresh the browser
  ```

**Conditionals in EJS:**
- Use the `<% %>` tag to embed Javascript without the result actually being added to the template. So we can add JS logic without having anything rendered as a result of this tag
- In views/random.ejs file:
  ```ejs
	<body>
		<h1>Your random number is: <%= num %></h1>
		<% if(num % 2 === 0) { %>
		<h2>That is an even number!</h2>
		<% } else { %>
		<h2>That is an odd number!</h2>
		<% } %>
		<h3>That number is: <%= num%2===0 ? 'EVEN' : 'ODD' %></h3>
	</body>
  ```

**Loops in EJS:**
- Use the `<% %>` tag to loops over iterable objects and use the `<%= %>` tag to display each elements
- In index.js file:
  ```js
  app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Monty', 'Tom', 'Winston', 'Target'];
    res.render('cats', { cats });
  });
  ```
- In views/cat.ejs file:
  ```ejs
	<body>
		<h1>All The Cats</h1>
		<ul>
			<% for(let cat of cats) { %>
			<li><%= cat %></li>
			<% } %>
		</ul>
	</body>
  ```

**Serving static assets in Express:**
- The `express.static()` method is a middleware and we pass in an argument of the folder that we want to serve our assets from
- For example, use the following code to serve images, CSS files, and Javascript files in a directory named public:
  - `app.use(express.static('public'))`
- In index.js file:
  - `app.use(express.static(path.join(__dirname, 'public')));`
- At the root of the project directory, create a directory called public. In this directory, create a file called app.css
- In public/app.css file:
  ```css
  body {
    background-color: darkseagreen;
  }
  ```
- In views/cats.ejs file:
  - Add the CSS stylesheet in the head tag
  ```html
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>All Cats!</title>
    <link rel="stylesheet" href="/app.css">
	</head>
  ```

**Bootstrap + Express:**
- Duplicate a copy of the templating app project and delete the public directory. We will be using Bootstrap to style our app instead
- In the root project directory, create a directory called public
- In public folder, create 2 folders: css and js
- Bootstrap website: https://getbootstrap.com/docs/3.3/getting-started/
- Download the Bootstrap minified CSS and Javascript files. Place the minified css file in css folder and place the minified JS file in js folder
- Go to jQuery website and download the jQuery file. Save the file as jquery.js and place this file in the js folder
- In views/subreddit.ejs file:
  - Include the Bootstrap css stylesheet and Bootstrap JS script in the head element
  - Include the script for jQuery just above the script for Javascript
    ```html
    <head>
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <script src="/js/jquery.js"></script>
      <script src="/js/bootstrap.min.js"></script>
    </head>
    ```
  - Go to Bootstrap website and copy demo code for a navbar: https://getbootstrap.com/docs/4.5/components/navbar/
  - Paste the code at the very top of the body tag
    - Change the name of the nav items to: Random Number, Chickens, Soccer, and Mighty Harvest
    - Change the href link as well

**ESJ and creating partials:**
- Partials is a way to include sub-templates inside other templates
- This is useful when we have some code or some features of a webpage we're duplicating. For example, we want to include the navbar on every page
- **To create the head partial:**
  - In the views directory, create a folder called partials. In partials folder, create a file called head.ejs
  - In head.ejs file:
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Site</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <script src="/js/jquery.js"></script>
        <script src="/js/bootstrap.min.js"></script>
      </head>
    ```  
- To include the head partial in subreddit.ejs, random.ejs, cats.ejs, notfound.ejs, and home.ejs files:
  - Remove the existing html tag and head tag and leave the body tag
  - Replace it with this code instead: `<%- include('partials/head') %>`
- **To create the navbar partial:**
  - In the views/partials directory, create a file called navbar.ejs
  - In navbar.ejs file:
    - Copy all the code inside the nav element to this file
    ```html
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Express App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/rand">Random Number</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/r/chickens">Chickens</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/r/soccer">Soccer</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/r/mightyharvest">Mighty Harvest</a>
          </li>
        </ul>
      </div>
    </nav>
    ```
- To include the navbar partial in subreddit.ejs, random.ejs, cats.ejs, notfound.ejs, and home.ejs files:
  - Include this code at the very top of the body tag: `<%- include('partials/navbar') %>`


## S34: DEFINING RESTFUL ROUTES
#### TOPICS:
- GET vs. POST requests
- Handling POST requests in Express
- Parsing request body
- Forms + Express
- Method override
- RESTful routing

**GET vs. POST requests:**
- **GET**
  - Used to retrieve information
  - Data is sent via query string: `req.query`
  - Information is plainly visible in the URL!
  - Limited amount of data can be sent
- **POST**
  - Used to post data to the server
  - Used to write/create/update
  - Data is sent via request body, not a query string!: `req.body`
  - Can send any sort of data (JSON!)

**Parsing the request body in POST requests:**
- We can send data in different formats such as text, json, javascript, html, etc.
- They have to be parsed differently. We need to tell Express explicitly how it should parse the incoming request bodies
- The `req.body` contains key-value pairs of data submitted in the request body. By default, it is `undefined`
- We need to tell Express to parse form-encoded information from the request body. Express has a built-in middleware that's going to parse the request body as url-encoded data
  - `app.use(express.urlencoded({ extended: true }))`
  - Use `console.log(req.body)` to see the parsed request body
- Express also has a built-in middleware function that parses incoming requests with JSON payloads
  - `app.use(express.json())`
- In index.js file:
  ```js
  const express = require('express');
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
  });

  app.post('/tacos', (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`Ok, here are your ${qty} ${meat}`);
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000!');
  });
  ```

**Intro to REST:**
- Stands for Representational State Transfer
- It's a set of guidelines for how a client and server should communicate and perform CRUD operation on a given resource
- A RESTful system complies with these rules of REST
- The main idea of REST is treating data on the server-side as resources then can be CRUDed
- The most common way of approaching REST is in formatting the URLs and HTTP verbs in your applications to expose full CRUD operations over HTTP

**The HTTP verbs:**
- GET - to retrieve data/information from the server
- POST - to create and send data to the server
- PATCH - to update data on the server
- DELETE - to delete data on the server

**Express redirect:**
- The `res.redirect([optionalStatusCode,] 'path')` redirects to the URL derived from the specified path. By default, the status code is 302
- For example, redirect users to all comments after they submitted a comment: `res.redirect('/comments')`
- When redirect, Express actually makes another request to the path specified in the redirect() method

**Update method: patch and put:**
- Patch - The PATCH method is used to apply partial modifications to a resource
- Put - The PUT method replaces all current representations of the target resource with the request payload
- After an update is completed, we usually want to redirect instead of sending something

**Express method override:**
- The big problem is HTML forms in our browser can only sent GET or POST requests. They can't send a PUT, PATCH, or DELETE requests
- The method-override package is a middleware that lets us use HTTP verbs such as PUT or DELETE in places where the client (form as an example) doesn't support it
- Install: `npm i method-override`
- Import the method in index.js file: `const methodOverride = require('method-override')`
- To use a query string value to override the method, specify the query string key as the string argument to the `methodOverride` function
- In index.js file:
  ```js
  const app = express();
  const methodOverride = require('method-override');

  app.use(methodOverride('_method'));

  // Setup a form to edit a comment
  app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('comments/edit', { comment });
  });

  // Update a comment
  app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
  });
  ```
- In edit.ejs file:
  ```html
  <form method="POST" action="/comments/<%= comment.id %>?_method=PATCH">
    <textarea name="comment" id="" cols="30" rows="10">
      <%= comment.comment %> 
    </textarea>
    <button>Save</button>
  </form>
  ```


## S36: MONGODB DATABASE
#### TOPICS:
- Installation
- The Mongo shell
- Mongo inserts
- Mongo finding/querying
- Mongo updates
- Mongo deletions
- Database basics
- SQL vs. noSQL

**What is Mongo and why use it?**
- Mongo is a document database, which we can use to store and retrieve complex data from
- It is commonly used in combination with Node and Express (MEAN and MERN stacks)
- It's easy to get started with (though it can be tricky to truly master)
- It plays particularly well with Javascript
- Its popularity also means there is a strong community of developers using Mongo

**SQL vs. noSQL:**
- **SQL databases**
  - Structured Query Language databases are relational databases
  - We pre-define a schema of tables before we insert anything. It conforms to a pattern
  - MySQL, Postgres, SQLite, Oracle, Microsoft SQL Server
- **noSQL databases** 
  - noSQL databases do not use SQL
  - There are many types of no-sql databases, including document, key-value, and graph stores
  - MongoDB, Couch DB, Neo4j, Cassandra, Redis

**Installation:**
- Mongo install site: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- Install Homebrew: https://brew.sh/#install
- Installing MongoDB 4.4 Community Edition
  - Step 1: `brew tap mongodb/brew`
  - Step 2: `brew install mongodb-community@4.4`
- To run MongoDB as a macOS service: `brew services start mongodb-community@4.4`
- To stop: `brew services stop mongodb-community@4.4`
- To verify that MongoDB is running: `brew services list`

**The Mongo shell:**
- To get into the shell, type in the terminal: `mongo`
- To quit: `ctrl c`
- To list all the database: `show dbs`
- To create a database: `use nameOfDatabase`
- To access a database, but if it doesn't find it, it will create it: `use nameOfDatabase`
- To see collections: `show collections`
- To see database: `db`
- To insert a document in a collection: `db.collection.insert()`
- To see documents in a collection: `db.collection.find()`

**What is BSON?**
- Stands for "Binary JSON". BSON is a more compact version of JSON
- Reasons why JSON is less idea for usage inside of a database
  - JSON is a text-based format, and text parsing is very slow
  - JSON's readable format is far from space-efficient, another database concern
  - JSON only supports a limited number of basic data types
- We can write regular JSON, but Mongo is going to store it as binary. This takes up space in memory

**MongoDB CRUD operations:**
- Source: https://docs.mongodb.com/manual/crud/
- You can have many collections in a single database. Each item inside a collection is called a document
- **Inserting documents:**
  - First step is to create a collection. If the collection does not currently exist, insert operations will create the collection
  - Insert methods: db.collection.insert(), db.collection.insertOne(), db.collection.insertMany()
  - To insert a document into a collection: `db.collection.insert()`
  - `db.dogs.insert([{name: "Wyatt", breed: "Golden", age: 13, catFriendly: false}, {name: "Tonya", breed: "Chihuahua", age: 17, catFriendly: true}])`
  - To see collections: `show collections`
  - To see documents in a collection: `db.collection.find()`
    - This will return all the documents in the collection
  - When inserting/creating a document, the `_id` field is automatically created for us if it's not provided
  - The `_id` is a primary key. It's a unique reference for each individual document in a collection
- **Finding documents:**
  - The `db.collection.find()` method will return all the documents in a collection
  - We can query the collection and return only what we're looking for by passing in a query argument
  - `db.dogs.find({breed: "Golden"})`
- **Updating documents:**
  - When updating a document, we first find the document and then specify what we want to update
  - Update methods:
    - `db.collection.updateOne(<filter>, <update>, <options>)`
    - `db.collection.updateMany(<filter>, <update>, <options>)`
    - `db.collection.replaceOne(<filter>, <update>, <options>)`
  - The `$set` operator replaces the value of a field with the specified value
  - The `$set` operator expression has the following form:
    - `{ $set: { <field1>: <value1>, ... } }`  
  - To specify a `<field>` in an embedded document or in an array, use the dot notation
  - `db.dogs.updateOne({name: "Charlie"}, {$set: {age: 4, breed: "Lab"}})`
  - When updating a document using the `$set` operator, if a field is not found, it will set a new field with the value
- **Deleting documents:**
  - Delete methods:
    - `db.collection.deleteOne()`
    - `db.collection.deleteMany()`
  - `db.cats.deleteOne({name: 'Blue Steele'})`  
  - To delete the entire collection: `db.collection.deleteMany({})`
- **Additional Mongo operators:**
  - Use the dot syntax to access nested properties
    - `db.dogs.find({'personality.childFriendly': true})`
  - Query selectors: comparison and logical
    - https://docs.mongodb.com/manual/reference/operator/query-comparison/
  - Comparison: $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
    - `db.inventory.find({qty: {$gt: 20}})`


## S37: CONNECTING TO MONGO WITH MONGOOSE
#### TOPICS:
- The role of ORM/ODM's
- Connecting Mongoose to Mongo
- Defining a model
- Mongoose CRUD
- Schema constraints
- Model instance and static methods
- Mongoose middleware
- Mongoose virtuals

**What is Mongoose?**
- Doc: https://mongoosejs.com/
- Mongoose is an ODM, Object Document/Data Mapper
- ODMs like Mongoose map documents coming from a database into usable Javascript objects
- ORMs, Object Relation Mapper map SQL database to another programming language
- Mongoose is a driver that connects Mongo with Node.js
- Mongoose provides ways for us to model out our application data and define a schema
- It offers easy ways to validate data and build complex queries from the comfort of JS

**Connecting Mongoose to Mongo:**
- Doc: https://mongoosejs.com/
- A Mongoose is an NPM package that we can use to connect to MongoDB
- Install: `npm i mongoose`
- Make sure MongoDB is running in the background first before connecting Mongoose to Mongo
  - Run: `brew services start mongodb-community@4.4`
- In index.js file:
  ```js
  const mongoose = require('mongoose');
  mongoose
    .connect('mongodb://localhost:27017/movieApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('CONNECTION OPEN!');
    })
    .catch((err) => {
      console.log('OH NO ERROR!');
      console.log(err);
    });
  ```
- Then run: `node index.js`

**Creating Mongoose model:**
- Doc: https://mongoosejs.com/docs/api/model.html
- The whole point of using Mongoose is to have an easier way to interact with the MongoDB from Javascript
- Models are JS classes that we make, with the assistant of Mongoose, that represent information in a mongoDB. Specifically, they represent information in some collection
- Mongoose gives us a whole bunch of methods that we can use on a Model to interact with this Model's database
- For every collection that we'll be working with in a MongoDB, we need to define a Model for each one in JS file
- **Defining a schema:**
  - Everything in Mongoose starts with a Schema
  - Each schema maps to a MongoDB collection and defines the shape of the documents within that collection
  - A schema is a mapping of different collection keys from Mongo to different types in JS. For example, the title key should be a String type or the age key should be a Number type
  - Permitted SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map 
  - Defining a schema has nothing to do with the database. This is just on the JS side of the equation
  - To define a schema: `new mongoose.Schema()`
  - Example:
    ```js
    const movieSchema = new mongoose.Schema({
      title: String,
      year: Number,
      score: Number,
      rating: String
    })
    ```
- **Creating a Model:**
  - Now we take that schema and tell Mongoose that we want to make a Model using that schema
  - A model is a class with which we construct documents
  - To make a Model: `const modelName = mongoose.model('modelName', nameOfSchema)`
  - Note that the first letter of the model name is in uppercase, just like the name of a JS class
  - Example:
    ```js
    const Movie = mongoose.model('Movie', movieSchema);
    ```
  - `const Movie` is a JS class
- **Creating an instance of a Model class:**
  - To create an instance: `new modelName()`
  - Example:
    ```js
    const amadeus = new Movie({
      title: 'Amadeus',
      year: 1986,
      score: 9.2,
      rating: 'R'
    });
    ```
  - This creates a Javascript object, but it's not saved to the database
- **Saving an instance to MongoDB:**
  - Note that creating an instance/object of a Model class does not save/add the instance to the database. This just creates a JS object
  - We need to call the .save() method on the instance to save it to MongoDB

**Mongoose middleware:**
- Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing plugins
- **Types of middleware:**
  - Mongoose has 4 types of middleware: 
    - document middleware
    - model middleware
    - aggregate middleware
    - query middleware
  - In document middleware functions, `this` refers to the document
  - In query middleware functions, `this` refers to the query


## S38: MONGOOSE WITH EXPRESS
#### TOPICS:
- Integrating Mongoose with Express
- Defining our Model
- Products index
- Product details
- Creating products
- Updating products
- Deleting products
- Filtering by category

**Express + Mongoose basic setup:**
- Create a new project directory. Create an index.js file
- Create a views directory
- Create package.json file by running: `npm init -y`
- Install: `npm i express ejs mongoose`
- In index.js file:
  ```js
  const express = require('express');
  const app = express();
  const path = require('path');
  const mongoose = require('mongoose');

  mongoose
    .connect('mongodb://localhost:27017/shopApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MONGO CONNECTION OPEN!');
    })
    .catch((err) => {
      console.log('OH NO MONGO CONNECTION ERROR!');
      console.log(err);
    });

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/dog', (req, res) => {
    res.send('woof!');
  });

  app.listen(3000, () => {
    console.log('App is listening on port 3000!');
  });
  ```

**Creating our Product model:**
- Create a folder called models and inside this folder, create a file called product.js
- In product.js file:
  - We will modify the schema as we build the app
  ```js
  const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      lowercase: true,
      enum: ['fruit', 'vegetable', 'dairy']
    }
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
  ```
- In index.js file:
  - Import the Product model: `const Product = require('./models/product');`
  - Create a new database called farmStand in MongoDB
    ```js
    mongoose
      .connect('mongodb://localhost:27017/farmStand', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    ```
- Next, create a seeds file to give some initial data to our database. It's a good idea and it's common practice when building an application to have some data in the database separate from the web app, just for development purposes
- At the root of product directory, create a file called seeds.js
- In seeds.js file:
  - Use `Model.insertMany()` to insert multiple documents at once
  - Note that when using `Model.insertMany()`, if anything does not pass validation, then nothing will be inserted. It's all or nothing
  ```js
  const mongoose = require('mongoose');

  const Product = require('./models/product');

  mongoose
    .connect('mongodb://localhost:27017/farmStand', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MONGO CONNECTION OPEN!');
    })
    .catch((err) => {
      console.log('OH NO MONGO CONNECTION ERROR!');
      console.log(err);
    });

  // const p = new Product({
  // 	name: 'Ruby Grapefruit',
  // 	price: 1.99,
  // 	category: 'fruit'
  // });

  // p.save()
  // 	.then((p) => {
  // 		console.log(p);
  // 	})
  // 	.catch((e) => {
  // 		console.log(e);
  // 	});

  const seedProducts = [
    {
      name: 'Fairy Eggplant',
      price: 1.0,
      category: 'vegetable'
    },
    {
      name: 'Organic Goddess Melon',
      price: 4.99,
      category: 'fruit'
    },
    {
      name: 'Organic Mini Seedless Watermelon',
      price: 3.99,
      category: 'fruit'
    },
    {
      name: 'Organic Celery',
      price: 1.5,
      category: 'vegetable'
    },
    {
      name: 'Chocolate Whole Milk',
      price: 2.69,
      category: 'dairy'
    }
  ];

  Product.insertMany(seedProducts)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
  ```
- Run the seeds.js file to save the data to the database/MongoDB: `node seeds.js`
- Check to see if the data is in MongoDB
  - Make sure Mongod is running in the background: `brew services start mongodb-community@4.4`
  - To get into Mongo shell, type in the terminal: `mongo`
  - To show the list of dbs, type: `show dbs` 
  - To get into farmStand db: `use farmStand`
  - To show the collections in farmStand db: `show collections` 
  - To see documents in a collection: `db.collectionName.find()`

**Create a route to products index page:**
- In index.js file:
  - Make sure that the Product model is imported
  ```js
  app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
  });
  ```
- In views directory, create a products folder. In this folder, create a file called index.ejs
- In views/products/index.ejs file:
  - Render a view for products index
  - Loop over products array and display each product in a list
  ```html
  <ul>
    <% for(let product of products) { %>
    <li><%= product.name %></li>
    <% } %>
  </ul>
  ```

**Create a route to product detail page:**
- In index.js file:
  ```js
  app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/detail', { product });
  });
  ```
- In views/products folder, create a file called detail.ejs
- In detail.ejs file:
  - Show the product name, price and category
  - Add a link that takes you back to product index page
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title><%= product.name %></title>
    </head>
    <body>
      <h1><%= product.name %></h1>
      <ul>
        <li>Price: $<%= product.price %></li>
        <li>Category: <%= product.category %></li>
      </ul>
      <a href="/products">All Products</a>
    </body>
  </html>
  ```
- In index.ejs file:
  - Make each product as a link that takes you to the product detail page
  ```html
  <ul>
    <% for(let product of products) { %>
    <li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
    <% } %>
  </ul>
  ```

**Create two routes to create a new product:**
- We need a form and we need a route to submit the form to. So we need two routes. Use the GET method to serve the form and use the POST method to submit the form and create a new product
- We're not doing any validation or error handling at the moment
- In index.js file:
  - We need to tell Express to parse form-encoded information from the request body. Express has a built-in middleware that's going to parse the request body as url-encoded data
    - `app.use(express.urlencoded({ extended: true }))`
  - After the product has been submitted, redirect user to the product detail page
  ```js
  app.use(express.urlencoded({ extended: true }));

  app.get('/products/new', (req, res) => {
    res.render('products/new');
  });

  app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
  });
  ```
- In views/products folder, create a file called new.ejs
- In new.ejs file:
  ```html
  <body>
    <h1>Add A Product</h1>
    <form action="/products" method="POST">
      <label for="name">Product Name</label>
      <input type="text" name="name" id="name" placeholder="product name">
      <label for="price">Price (Unit)</label>
      <input type="number" name="price" id="price" placeholder="product price">
      <label for="category">Select Category</label>
      <select name="category" id="category">
        <option value="fruit">fruit</option>
        <option value="vegetable">vegetable</option>
        <option value="dairy">dairy</option>
      </select>
      <button>Add Product</button>
    </form>
  </body>
  ```

**Create two routes to update products:**
- We need to create two routes to update a product. One is to serve the edit form and the other is to update the product in the database
- Use the GET method to get the product from the database by its id, and this is an async operation. Use the PUT method to update the product in DB and this is also an async operation
- We cannot make a PUT request from an HTML form in the browser. But we can fake it by sending a POST request and override the method with a PUT method
- We need to install the method-override npm package and tell Express to use it and then we can set our own query string parameter to base the method override on
- Install: `npm i method-override`
- In index.js file:
  - Import method-override: `const methodOverride = require('method-override')`
  ```js
  const methodOverride = require('method-override');

  app.use(methodOverride('_method'));

  app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
  });

  app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true
    });
    console.log(req.body);
    res.redirect(`/products/${product._id}`);
  });
  ```
- In views/products folder, create a file called edit.ejs
- In edit.ejs file:
  - The form is similar to the create product form, but need to add value property and override the POST method to PUT method
  - Add the value property for each input field
  - Add a cancel button that takes you back to the product detail page
  ```html
  <form action="/products/<%= product._id %>?_method=PUT" method="POST">
    <label for="name">Product Name</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="product name"
      value="<%= product.name %>"
    />
    <label for="price">Price (Unit)</label>
    <input
      type="number"
      name="price"
      id="price"
      placeholder="product price"
      value="<%= product.price %>"
    />
    <label for="category">Select Category</label>
    <select name="category" id="category">
      <option value="fruit">fruit</option>
      <option value="vegetable">vegetable</option>
      <option value="dairy">dairy</option>
    </select>
    <button>Add Product</button>
  </form>
  <a href="/products/<%= product._id %> ">Cancel</a>
  ```
- In detail.ejs file:
  - Add a link that takes you to the edit product page
  `<a href="/products/<%= product._id %>/edit">Edit Product</a>`

**Fix category selector functionality:**
- To avoid having to manually create a category option every time we add more categories, we can create a categories array and loop over the array to display them in the category selector instead 
- In index.js file:
  - Create an array of categories
  - Pass the categories array to the new product and edit product routes
  ```js
  const categories = ['fruit', 'vegetable', 'dairy'];

  app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
  });

  app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
  });
  ```
- In new.ejs file:
  - Loop over the categories array and display each category as an option
  ```html
  <select name="category" id="category">
    <% for(let category of categories) { %>
    <option value="<%= category %>"><%= category %></option>
    <% } %>
  </select>
  ```
- In edit.ejs file:
  - When editing a product, we want to pre-populate the current category in the form
  - Loop over the categories array. If the product category matches the category in the categories array, add the selected property 
  ```html
  <select name="category" id="category">
    <% for(let category of categories) { %> 
      <option value="<%= category %>" <%= product.category === category ? 'selected' : '' %>><%= category %></option>
    <% } %> 
  </select>
  ```

**Create a route to delete a product:**
- We cannot make a DELETE request from an HTML form in the browser, but we can fake it by sending a POST request and add on a method-override query string
- In detail.ejs file:
  - Create a form and add on the method-override query string and set it to DELETE
  - Inside this form has a delete button
  ```html
  <form action="/products/<%= product._id %>?_method=DELETE" method="post">
    <button>Delete</button>
  </form>
  ```
- In index.js file:
  ```js
  app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
  });
  ```

**Filtering by category:**
- In detail.ejs file:
  - In the product detail page, make the product category as a link that will take the user to a page of products with that category
  - We're querying by category. Set the query category to product category
  ```html
  <li>
    Category:
    <a href="/products?category=<%= product.category %>"
      ><%= product.category %></a
    >
  </li>
  ```
- In index.js file:
  - Look in req.query and destructure category. This will give us the value for category
  - If there is a category query, find products based on that category in DB. This is an async operation. Then render the list of products
  - If there isn't, find all products in DB. Then render the list of products
  ```js
  app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render('products/index', { products, category });
    } else {
      const products = await Product.find({});
      res.render('products/index', { products, category: 'All' });
    }
  });
  ```
- In index.ejs file:
  - Display the name of the category in the page header
  - If category is not equal to All, display the "All Products" link. We only want to display this link that takes them to All Products page when the user is currently in products filter-by-category page
  ```html
	<body>
		<h1><%= category %> Products!</h1>
		<ul>
			<% for(let product of products) { %>
			<li><a href="/products/<%= product._id %>"><%= product.name %></a></li>
			<% } %>
		</ul>
		<a href="/products/new">New Product</a>
		<% if(category !== 'All') { %>
		<a href="/products">All Products</a>
		<% } %>
	</body>
  ```


## S39: YELPCAMP PROJECT: CAMPGROUNDS CRUD

**1. Creating the Basic Express App**
- Create a project directory called YelpCamp
- Create a package.json file: `npm init -y`
- Install Express, Mongoose, EJS: `npm i express mongoose ejs`
- At the root of the directory, create a file called app.js
- In app.js file:
  ```js
  const express = require('express');
  const path = require('path');

  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
  ```
- Create a folder called views and in it, create a file called home.ejs
- In home.ejs file:
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home</title>
    </head>
    <body>
      <h1>Welcome to Yelp Camp!</h1>
    </body>
  </html>
  ```

**2. Campground Model Basics**
- Create a models folder and in it, create a model file called campground.js
- In campground.js file:
  ```js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
  });

  module.exports = mongoose.model('Campground', CampgroundSchema);
  ```
- In app.js file:
  - Import Mongoose: `const mongoose = require('mongoose');`
  - Import Campground model: `const Campground = require('./models/campground');`
  - Connecting Mongoose to MongoDB
  - Create a route for makecampground using GET method
  ```js
  mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected');
  });

  app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping!' });
    await camp.save();
    res.send(camp)
  });
  ```
- Check to see if our database is successfully connected to our Express app. Go to Mongo shell and see if a document is created in MongoDB
  - cd in project directory and type in the terminal: `mongo`
  - yelp-camp should be listed in the database: `show dbs`
  - To get into yelp-camp DB: `use yelp-camp`
  - To show the collections: `show collections`. campgrounds should be listed
  - To view documents: `db.campgrounds.find()` 

**3. Seeding Campgrounds Database**
- Create a folder called seeds. In it, create 3 files:
  - cities.js
  - seedHelpers.js
  - index.js
- In index.js file:
  ```js
  const mongoose = require('mongoose');
  const cities = require('./cities');
  const { places, descriptors } = require('./seedHelpers');
  const Campground = require('../models/campground');

  mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected');
  });

  const sample = (array) => array[Math.floor(Math.random() * array.length)];

  const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`
      });
      await camp.save();
    }
  };

  seedDB().then(() => {
    mongoose.connection.close();
  });
  ```
- Now, whenever we need to seed our database, we can call this seed index.js file. This file does the following:
  - Uses Mongoose to make a connection to MongoDB
  - It deletes everything in campgrounds database
  - Then it creates 50 random campsites and saves them to the database
  - Closes the connection to DB once it's done
- Execute the file in the terminal: `node seeds/index.js`

**4. Create a Route for Campground Index**
- In app.js file:
  - Get all campgrounds in DB and save them in campgrounds variable
  - Render campgrounds page and pass in the campgrounds
  ```js
  app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
  });
  ```
- In views/campgrounds folder, create a file called index.ejs
- In index.ejs file:
  - Loop through the list of campgrounds and display the campground title
  ```html
  <body>
    <h1>All Campgrounds</h1>
    <ul>
      <% for(let campground of campgrounds) { %>
        <li><%= campground.title %></li>
      <% } %>  
    </ul>
  </body>
  ```

**5. Create Campground Show Route**
- In app.js file:
  - Create a campground show route using GET method
  - Find the campground in DB based on its id and save it to campground variable
  - Pass the campground to the render method
  ```js
  app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
  });
  ```
- In views/campgrounds/index.ejs file:
  - Make each campground as a link that will take you to the campground detail page
  ```html
  <ul>
    <% for(let campground of campgrounds) { %>
      <li><a href="/campgrounds/<%= campground._id %>"><%= campground.title %></a></li>
    <% } %>  
  </ul>
  ```
- In views/campgrounds/show.ejs file:
  - Display the campground title and location
  ```html
  <body>
    <h1><%= campground.title %></h1>
    <h2><%= campground.location %></h2>
  </body>
  ```

**6. Create Two Routes for Campground New and Create**
- In app.js file:
  - We need to tell Express to parse the request form body, else it'll be undefined
    - `app.use(express.urlencoded({ extended: true }));`
  ```js
  app.use(express.urlencoded({ extended: true }));

  app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
  });

  app.post('/campgrounds', async (req, res) => {
    // res.send(req.body)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  });
  ```
- In views/campgrounds folder, create a file called new.ejs file:
- In new.ejs file:
  ```html
  <form action="/campgrounds" method="post">
    <div>
      <label for="title">Title</label>
      <input type="text" name="campground[title]" id="title" />
    </div>
    <div>
      <label for="location">Location</label>
      <input type="text" name="campground[location]" id="location" />
    </div>
    <button>Add Campground</button>
  </form>
  <a href="/campgrounds">All Campgrounds</a>
  ```

**7. Campground Edit and Update Functionality**
- We cannot make a PUT request from an HTML form in the browser. But we can fake it by sending a POST request and override the method with a PUT method
- We need to install the method-override npm package and tell Express to use it and then we can set our own query string parameter to base the method override on
- Install: `npm i method-override`
- In app.js file:
  - Import method-override: `const methodOverride = require('method-override');`
  ```js
  app.use(methodOverride('_method'));

  app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
  });

  app.put('/campgrounds/:id', async (req, res) => {
    // res.send('It works!')
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
      id,
      { ...req.body.campground },
      { new: true }
    );
    res.redirect(`/campgrounds/${campground._id}`);
  });  
  ```
- In views/campgrounds folder, create a file called edit.ejs
- In edit.ejs file:
  - In the title and location input fields, set the value properties to campground title and location. This will pre-populate the initial values in the fields
  - Use method-override query string and set it to PUT request
  - Add a link that takes you back to the campground detail page
  ```html
  <form action="/campgrounds/<%= campground._id %>?_method=PUT" method="POST">
    <div>
      <label for="title">Title</label>
      <input
        type="text"
        name="campground[title]"
        id="title"
        value="<%= campground.title %>"
      />
    </div>
    <div>
      <label for="location">Location</label>
      <input
        type="text"
        name="campground[location]"
        id="location"
        value="<%= campground.location %>"
      />
    </div>
    <button>Update Campground</button>
  </form>
  <a href="/campgrounds/<%= campground._id %> ">Back to Campground</a>
  ```
- In show.ejs file:
  - Add a campground edit link that takes you to the campground edit page
  - `<a href="/campgrounds/<%= campground._id %>/edit">Edit</a>`

**8. Create a Route for Campground Delete**
- In app.js file:
  ```js
  app.delete('/campground/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  });
  ```
- In show.ejs file:
  - Create a form that has a 'Delete' button in it that makes a POST request, but we'll use method-override to send a DELETE request
  ```html
  <form action="/campgrounds/<%= campground._id %>?_method=DELETE" method="POST">
    <button>Delete</button>
  </form>
  ```

## S40: MIDDLEWARE: THE KEY TO EXPRESS
#### TOPICS:
- The concept of middleware
- Defining custom middleware
- Morgan logging

**Intro to Express middleware:**
- Express middleware are functions that run during the request/response lifecycle
- Request -> middleware -> response
- **Middleware:**
  - Middleware are just functions that run at some point during the request and response lifecycle
  - Each middleware has access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle
  - The next middleware function is commonly denoted by named `next`
  - Middleware can end the HTTP request by sending back a response with methods like res.send()
  - OR middleware can be chained together, one after another by calling next()
- Middleware functions can perform the following tasks:
  - Execute any code
  - Make changes to the request and the response objects
  - End the request-response cycle
  - Call the next middleware function in the stack

**Using Morgan - logger middleware:**
- Morgan is a middleware that logs information about HTTP requests to our terminal. Use this to help us figure out what request just came in for debugging
- Install: `npm i morgan`
- Import in index.js file: `const morgan = require('morgan')`
- Also install and import Express
- Use: `app.use(morgan('dev'))`

**Defining our own middleware:**
- Middleware function signature:
  ```js
  function(req, res, next) {
    // do something
    next()
  }
  ```
  - The 3rd parameter `next` is a callback function
  - By executing `next()`, we are calling whatever the next matching middleware or route handler is
- We can use a middleware function to add a property to the request object
  ```js
  const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
  };
  ```
 
**app.use()**
- `app.use(optionalPath, callback, optionalCallback)`
- `app.use()` mounts the specified middleware function or functions at the specified path; the middleware function is executed when the base of the requested path matches `optionalPath`
- `app.use()` is a way to get some code to run on every single request. Whatever function you put in `app.use()` will be called for every single request
- However, we can pass in a string for a path to match as a first argument in `app.use()`. The function only runs when the path of incoming request matches the specified path. This is useful when we want to run a middleware for a specific route path
  ```js
  app.use('/dogs', (req, res, next) => {
    console.log('I love dogs!');
    next();
  });
  ```


## S41: YELPCAMP: ADDING BASIC STYLES

**1. A New EJS Tool for Layouts - ejs-mate:**
- ejs-mate layout allows us to define some boilerplate where we can have code that we insert in between some content. We can inject whatever content we want dynamically into the boilerplate
- We can also inject partials into the boilerplate
- ejs-mate is one of many engines that are used to run and parse ejs
- Install ejs-mate: `npm i ejs-mate`
- In app.js file:
  - Import ejs-mate: `const ejsMate = require('ejs-mate');`
  - We want to tell Express to use this engine instead of the default one that it uses 
    - `app.engine('ejs', ejsMate);`
- In views directory, create a folder called layouts. In it, create a file called boilerplate.ejs
- In boilerplate.ejs file:
  - At `<%- body %>` is where the content is injected
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>BOILERPLATE!!</title>
    </head>
    <body>
      <%- body %>
    </body>
  </html>
  ```
- In views/campgrounds/index.js, edit.ejs, new.ejs, show.ejs files:
  - For each view file, delete all the html doctype structure and leave only the page content
  - Then at the top of each file, call the layout() method and pass in the path to the boilerplate.ejs file
  - Example for index.ejs file
    ```html
    <% layout('layouts/boilerplate') %>
    <h1>All Campgrounds</h1>
    <div>
      <a href="/campgrounds/new">Add Campground</a>
    </div>
    <ul>
      <% for(let campground of campgrounds) { %>
      <li>
        <a href="/campgrounds/<%= campground._id %>"><%= campground.title %></a>
      </li>
      <% } %>
    </ul>
    ```

**2. Add Bootstrap5 Boilerplate**
- Website: https://v5.getbootstrap.com/
- In boilerplate.ejs file:
  - Paste the CSS stylesheet CDN in the `<head>` tag
  - Paste the Bootstrap Javascript script at the bottom of `<body>` tag
  - Wrap the dynamic content in a main tag with a class of container
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>BOILERPLATE!!</title>

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <main class="container">
        <%- body %>
      </main>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.min.js"
        integrity="sha384-t6I8D5dJmMXjCsRLhSzCltuhNZg6P10kE0m0nAncLUjH6GeYLhRU1zfLoW3QNQDF"
        crossorigin="anonymous"
      ></script>
    </body>
  </html>
  ```

**3. Add Bootstrap Navbar Partial to Boilerplate**
- In views directory, create a folder called partials. In it, create a file called navbar.ejs
- In navbar.ejs file:
  - Go to Bootstrap website and copy a navbar example. Then modify the content
  ```html
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">YelpCamp</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="/">Home</a>
          <a class="nav-link" href="/campgrounds">Campgrounds</a>
          <a class="nav-link" href="/campgrounds/new">New Campground</a>
        </div>
      </div>
    </div>
  </nav>
  ```
- Now, include the navbar partial in the boilerplate file
- In boilerplate.ejs file:
  - At the top of the `<body>` tag, include the navbar partial by calling the include() method and pass in the path to navbar.ejs file
  - `<%- include('../partials/navbar') %>`

**4. Add Footer Partial**
- In views/partials folder, create a file called footer.ejs
- In footer.ejs file:
  - Set margin-top to auto `mt-auto`. This will push the footer to the bottom of the page when the view height is set to 100 `vh-100`
  ```html
  <footer class="footer bg-dark py-3 mt-auto">
    <div class="container">
      <span class="text-muted">&copy; YelpCamp 2020</span>
    </div>
  </footer>
  ```
- In boilerplate.ejs file:
  - Add Bootstrap flex box class to the body tag
  - Set the view height to 100
  `<body class="d-flex flex-column vh-100">`

**5. Adding Images to Campground model**
- Unsplash website: https://source.unsplash.com/
- We will use images from Unsplash website
- We need to re-seed our database to include image, description and price properties
- In seeds/index.js file:
  - We'll randomly generate the price for each campground
  - We'll use lorem ipsem text for description for now
  - Set the image property to an Unsplash image collection
  ```js
  const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10
      const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: 'https://source.unsplash.com/collection/483251',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi minus, eaque quas soluta quisquam quasi fugit repudiandae nostrum neque eveniet suscipit delectus voluptatibus, veritatis odio. Aspernatur dolore totam sapiente?',
        price
      });
      await camp.save();
    }
  };
  ```
- In the terminal, run: `node seeds/index.js`
- Display the image, description and price in campground detail page
- In views/campgrounds/show.ejs file:
  ```html
  <img src="<%= campground.image %>" alt="">
  <p><%= campground.description %></p>
  <p>$<%= campground.price %>/night</p>
  ```

**6. Styling Campgrounds Index**
- We'll use Bootstrap card component and grid to display each campground in campgrounds index page
- In views/campgrounds/index.ejs file:
  ```html
  <% for(let campground of campgrounds) { %>
  <div class="card mb-3">
    <div class="row">
      <div class="col-md-4">
        <img class="img-fluid" alt="" src="<%= campground.image %>" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><%= campground.title %></h5>
          <p class="card-text"><%= campground.description %></p>
          <p class="card-text">
            <small class="text-muted"><%= campground.location %> </small>
          </p>
          <a class="btn btn-primary" href="/campgrounds/<%= campground._id %>"
            >View <%= campground.title %></a
          >
        </div>
      </div>
    </div>
  </div>
  <% } %>
  ```

**7. Styling the New Form**
- In views/campgrounds/new.ejs file:
  - Include input fields for title, location, image url, campground price, and description
  ```html
  <% layout('layouts/boilerplate') %>
  <div class="row">
    <h1 class="text-center">New Campground</h1>
    <div class="col-6 offset-3">
      <form action="/campgrounds" method="post">
        ...
        <div class="mb-3">
          <label class="form-label" for="price">Campground Price</label>
          <div class="input-group">
            <span class="input-group-text" id="price-label">$</span>
            <input
              type="text"
              class="form-control"
              id="price"
              placeholder="0.00"
              name="campground[price]"
              aria-label="price"
              aria-describedby="price-label"
            />
          </div>
        </div>
        ...
        <div class="mb-3">
          <button class="btn btn-success">Add Campground</button>
        </div>
      </form>
      <a href="/campgrounds">All Campgrounds</a>
    </div>
  </div>
  ```

**8. Styling Edit Form**
- In views/campgrounds/edit.ejs file:
  - Start out with copying everything from the new form
  - For each input field, add the value property. This will pre-populate the initial values
  - For the textarea description, we don't use the value property. Instead, inject the campground.description between the opening and closing textarea tag
  ```html
  <div class="mb-3">
    <label class="form-label" for="description">Description</label>
    <textarea
      class="form-control"
      type="text"
      name="campground[description]"
      id="description"
    >
    <%= campground.description %>
    </textarea>
  </div>
  ```

**9. Styling Show Page**
- In views/campgrounds/show.ejs file:
  - We'll use Bootstrap card component and grid to display campground details
  - Find the card example on Bootstrap we want to use and copy the code as the starting point
  ```html
  <% layout('layouts/boilerplate') %>
  <div class="row">
    <div class="col-6 offset-3">
      <div class="card mb-3">
        <img src="<%= campground.image %>" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><%= campground.title %></h5>
          <p class="card-text"><%= campground.description %></p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-muted"><%= campground.location %></li>
          <li class="list-group-item">$<%= campground.price %>/night</li>
        </ul>
        <div class="card-body">
          <a class="card-link btn btn-info" href="/campgrounds/<%= campground._id %>/edit">Edit</a>
          <form class="d-inline" action="/campgrounds/<%= campground._id %>?_method=DELETE" method="POST">
            <button class="btn btn-danger">Delete</button>
          </form>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  </div>
  ```


## S42: HANDLING ERRORS IN EXPRESS APPS
#### TOPICS:
- Defining custom error handlers
- Handling async errors
- Defining custom error class
- Express' built-in error handler
- Working with Mongoose errors

**Defining custom error handlers:**
- Express error handling guide: http://expressjs.com/en/guide/error-handling.html
- Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: `(err, req, res, next)` 
- If we define a function with this signature, it will be treated as error-handling middleware
  ```js
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  ```
- We define error-handling middleware last, after other app.use() and routes calls
- Notice that when **not** calling “next” in an error-handling function, you are responsible for writing (and ending) the response. Otherwise those requests will “hang” and will not be eligible for garbage collection
  - When err passed in next, this will trigger the next error handler
  - When nothing is passed in to next, it's going to call the next regular middleware
  ```js
  // Error-handling middleware
  app.use((err, req, res, next) => {
    console.log('*********************************')
    console.log('*************ERROR***************')
    console.log('*********************************')
    // console.log(err)
    // This is passing the error to the next error handler
    next(err)
  })
  ```

**Our custom error class:**
- Define our own error class in AppError.js file:
  ```js
  class AppError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
    }
  }

  module.exports = AppError;
  ```
- Import and use the error class in index.js file:
  - Import: `const AppError = require('./AppError')`
  ```js
  app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403)
  })
  ```

**Handling async errors:**
- Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous code throws an error, then Express will catch and process it
  ```js
  app.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
  })
  ```
- **Option 1: passing error to next()**
  - For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them
  ```js
  app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      // return will end any code after from executing
      // Pass the error to the next error handler middleware
      return next(new AppError('Product Not Found', 404));
    }
    res.render('products/detail', { product });
  });

  // Error handler middleware
  // This handles error passed from next()
  app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
  });
  ```
- **Option 2: use the try-catch block**
  - The try-catch block will catch any errors that we don't throw ourselves
  - Wrap the async function in a try-catch block
  ```js
  app.get('/products/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        // Throw our own error
        throw new AppError('Product Not Found', 404);
      }
      res.render('products/detail', { product });
    } catch (e) {
      // Will catch any errors we didn't throw
      next(e);
    }
  });

  // Error handler middleware
  // This handles error passed from next()
  app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
  });
  ```

**Defining an async error utility function:**
  ```js
  // async utility function
  // This function takes a function as an argument
  // It returns a new function
  // This new function is simply executes the function passed in to wrapAsync()
  // and chains on a .catch() to catch the error
  // If there's an error, it calls next()
  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(e => next(e))
    }
  }

  // wrap the async function in the utility function
  app.get('/products/:id', wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        throw new AppError('Product Not Found', 404);
      }
      res.render('products/detail', { product });
  }));
  ```


## S43: YELPCAMP: ERRORS AND VALIDATING DATA

**1. Client-Side Form Validations**
- Bootstrap5 form validation: https://v5.getbootstrap.com/docs/5.0/forms/validation/
- In views/campgrounds/new.ejs and edit.ejs file:
  - Add `novalidate` and `class="validated-form"` to the form element
    - `<form action="/campgrounds/<%= campground._id %>?_method=PUT" method="POST" novalidate class="validated-form">`
  - In each input field for new and edit form, add the `required` property
- In views/layouts/boilerplate.ejs file:
  - Go to Bootstrap5 website and copy the form validation Javascript script and paste at the bottom of the body tag
  ```html
  <script>
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.validated-form');

      // Loop over them and prevent submission
      Array.from(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  </script>
  ```
- Now any input fields that's marked with `required` will turn red if nothing is entered

**2. Basic Error Handler**
- In app.js file:
  - At the very bottom and just before the app.listen(), set up a very basic error handler middleware
  - Use the try-catch block to handle any errors in the post method route when a request is made to submit a new campground
  ```js
  app.post('/campgrounds', async (req, res, next) => {
    // res.send(req.body)
    try {
      const campground = new Campground(req.body.campground);
      await campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
    } catch (e) {
      // Error passed to the next error handler middleware
      next(e);
    }
  });

  // Error handler middleware
  app.use((err, req, res, next) => {
    res.send('Oh boy, something went wrong!');
  });
  ```

**3. Defining ExpressError Class and Async Wrapper Utils**
- At the root of project directory, create a folder called utils. In it, create a file called ExpressError.js. This is a custom error handler class
- In ExpressError.js file:
  ```js
  class ExpressError extends Error {
    constructor(message, statusCode) {
      super();
      this.message = message;
      this.statusCode = statusCode;
    }
  }

  module.exports = ExpressError;
  ```
- In utils folder, create an async wrapper file called catchAsync.js
- In catchAsync.js file:
  - This utility function catches any errors from an async function
  - This function takes a function as an argument
  - It returns a new function
  - This new function executes the function being passed in and chains the .catch() method to it to catch the error
  - If an error occurs, next() will be called with the error passed into it
  - This in turn, passes the error to the next error handler middleware to handle the error
  ```js
  module.exports = (func) => {
    return (req, res, next) => {
      func(req, res, next).catch(next);
    };
  };
  ```
- In app.js file:
  - Import the async wrapper: `const catchAsync = require('./utils/catchAsync');`
  - To use the async wrapper function on one of the async functions
    - No need to use the try-catch block anymore
    - If an error occurs, the wrapper function will catch the error and pass the error to the next error handler middleware
    ```js
    app.put(
      '/campgrounds/:id',
      catchAsync(async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(
          id,
          { ...req.body.campground },
          { new: true }
        );
        res.redirect(`/campgrounds/${campground._id}`);
      })
    );
    ```

**4. More Errors**
- Lets use our ExpressError class to handle 404 statusCode
- In app.js file:
  - Import the ExpressError class: `const ExpressError = require('./utils/ExpressError');`
  ```js
  // If nothing matches in the route, this runs
  app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found!!', 404));
  });

  // Error handler middleware
  app.use((err, req, res, next) => {
    // Destructure properties coming from ExpressError class
    // Also assign default values to the properties
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send(message);
  });
  ```

**5. Defining Error Template**
- In views directory, create a file called error.ejs
- In error.ejs file:
  ```html
  <% layout('layouts/boilerplate') %>
  <div class="row">
    <div class="col-6 offset-3">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading"><%= err.message %></h4>
        <p><%= err.stack %></p>
      </div>
    </div>
  </div>
  ```
- If there's an error, we can render the error.ejs template instead of sending the error
- In app.js file:
  ```js
  app.use((err, req, res, next) => {
    // Destructure properties coming from ExpressError class
    // Also assign default values to the properties
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    // Here, we're passing the entire err to the error.ejs template
    res.status(statusCode).render('error', {err});
  });
  ```

**6. JOI Schema Validation**
- JOI is a Javascript validator tool. This allows us to validate form on the server-side
- Note that when we're defining a validation schema, it's not Mongoose schema
- Install: `npm i joi`
- In app.js file:
  - Import JOI: `const Joi = require('joi');`
  - Validating form when making a post request of a new campground
  ```js
  app.post(
    '/campgrounds',
    catchAsync(async (req, res, next) => {
      // res.send(req.body)
      // if (!req.body.campground) {
      // 	throw new ExpressError('Invalid campground data', 400);
      // }
        
      const campgroundSchema = Joi.object({
        campground: Joi.object({
          title: Joi.string().required(),
          price: Joi.number().required().min(0),
          image: Joi.string().required(),
          location: Joi.string().required(),
          description: Joi.string().required()
        }).required()
      });
      const { error } = campgroundSchema.validate(req.body);
      if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
      }
      console.log(result);
      const campground = new Campground(req.body.campground);
      await campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
    })
  );
  ```

**7. JOI Validation Middleware**
- We can create a validation middleware that we can pass to different route handlers that requires validation before Mongoose takes the data 
- Define a validation schema in a separete file. At the root of the project directory, create a file called schemas.js We will eventually have more schemas in this file
- In schemas.js file:
  ```js
  const Joi = require('joi');

  module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0),
      image: Joi.string().required(),
      location: Joi.string().required(),
      description: Joi.string().required()
    }).required()
  });
  ```
- In app.js file:
  - Import campgroundSchema: `const { campgroundSchema } = require('./schemas.js');`
  - Use the validateCampground middleware in the route handler when it needs validation
  - Pass in the middleware as a 2nd argument in the route handler
  ```js
  const { campgroundSchema } = require('./schemas.js');

  // Define validation middleware
  const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new ExpressError(msg, 400);
    } else {
      next()
    }
  }

  app.post(
	'/campgrounds',
	validateCampground,
  catchAsync(async (req, res, next) => { ... })
  );

  app.put(
	'/campgrounds/:id',
	validateCampground,
  catchAsync(async (req, res) => { ... })
  )
  ```


## S44: DATA RELATIONSHIPS WITH MONGO
#### TOPICS:
- One to few
- One to many
- One to Bajillions
- Populate
- Mongo schema design
- SQL relationships overview

**One to few relationship:**
- Embed the data directly in the document
  ```js
  name: 'Tommy Cash',
  savedAddresses: [
    { street: '234 7th st', city: 'Kirkland', country: 'USA' },
    { street: 'Ravala 5', city: 'Tallin', country: 'Estonia' }
  ]
  ```
- In models/user.js file:
  - Start with importing Mongoose and the structure of connecting to Mongoose
  ```js
  // Set id to false if you don't want Mongoose to auto-generate one
  const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
      {
        _id: { id: false },
        street: String,
        city: String,
        state: String,
        country: String
      }
    ]
  });

  const User = mongoose.model('User', userSchema);

  // Create a new user from the User model
  // Then use push method to push an address to the new user
  // Call .save() to save the new user to DB
  // Don't forget to invoke the makeUser function
  const makeUser = async () => {
    const u = new User({
      first: 'Harry',
      last: 'Potter'
    });
    u.addresses.push({
      street: '123 Sesame St.',
      city: 'New York',
      state: 'NY',
      country: 'USA'
    });
    const res = await u.save();
    console.log(res);
  };

  // Add another address to a user
  const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
      street: '555 Folsom St.',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    });
    const res = await user.save();
    console.log(res);
  };

  // makeUser();
  addAddress('5fbf2bad11bf1dd6e8202c9f');
  ```
- Execute the file to add user to DB. cd into models directory and run: `node user.js`
- Check the database using Mongo shell
  - Make sure Mongod is running in the background: `brew services start mongodb-community@4.4`
  
**One to many relationship:**
- We don't directly embed information in the parent document. Instead, we just store or embed a reference that's defined somewhere else. We usually do this using an object id
- One option is to store our data separately, but then store references to document ID's somewhere inside the parent:
  ```js
  {
    farmName: 'Full Belly Farms',
    location: 'Guinda, CA',
    produce: [
      ObjectID('2819781267781'),
      ObjectID('1415281867672'),
      ObjectID('8131977121283'),
    ]
  }
  ```
- In models/farm.js file:
  - Start with importing Mongoose and the structure of connecting to Mongoose
  ```js
  const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
      type: String,
      enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
  });

  const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  });

  const Product = mongoose.model('Product', productSchema);
  const Farm = mongoose.model('Farm', farmSchema);

  // Product.insertMany([
  // 	{ name: 'Goddess Melon', price: 5.99, season: 'Summer' },
  // 	{ name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
  // 	{ name: 'Napa Cabbage', price: 2.99, season: 'Spring' }
  // ]);

  const makeFarm = async () => {
    const farm = new Farm({
      name: 'Full Belly Farms',
      city: 'Guinda, CA'
    });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
  };
  // makeFarm();

  const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
  };
  addProduct();
  ```
- What's being stored in the database for products is an array of ObjectId's, not the actual products
  ```
  { "_id" : ObjectId("5fbf603a96cd7be382880035"), "products" : [ ObjectId("5fbf5cb68e1de2e0fabc38a4"), ObjectId("5fbf5cb68e1de2e0fabc38a5") ], "name" : "Full Belly Farms", "city" : "Guinda, CA", "__v" : 1 }
  ```

**Mongoose populate:**
- Populate is a method that we can chain on to when querying a model
- Certain models may only store references to the child documents of other models. To retrieve the details of those documents and populate them in the parent model, we chain on the .populate() method 
- In models/farm.js file:
  - First, we want to query the Farm model using the .findOne() method to find a farm by its name
  - If it exists, it will return the info of the farm
  - However, the products property, it will return an array of object ids. They are reference to products in the Product model
  - To get and display the details of those products, chain on the .populate() method and pass in the property/ies you want to populate the data
  - `products` is the property we want to populate
  - In the model schema, make sure to set the `ref` property to the name of the model you want Mongoose to find the reference  
  ```js
  const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  });

  Farm.findOne({ name: 'Full Belly Farms' })
  .populate('products')
  .then(farm => console.log(farm))
  ```

**One to bajillions relationship:**
- With thousands or more documents, it's more efficient to store a reference to the parent on the child document
  ```js
  {
    tweetText: 'lol I just crashed my car because I was tweeting',
    tags: ['stupid', 'moron', 'yolo'],
    user: ObjectId('6395769482')
  }
  ```
- In models/tweet.js file:
  ```js
  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const userSchema = new Schema({
    username: String,
    age: Number
  });

  const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });

  const User = mongoose.model('User', userSchema);
  const Tweet = mongoose.model('Tweet', tweetSchema);

  const makeTweets = async () => {
    // const u = new User({ username: 'chickenfan99', age: 66 });
    // const tweet1 = new Tweet({ text: 'omg I love my chicken!', likes: 2 });
    // tweet1.user = u;
    // u.save();
    // tweet1.save();

    const user = await User.findOne({ username: 'chickenfan99' });
    const tweet2 = new Tweet({ text: 'bock bock bock', like: 888 });
    tweet2.user = user;
    tweet2.save();
  };
  // makeTweets();

  // If you only want a specific property and not the entire info of a document, pass in the property name as the next argument
  const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
  };
  findTweet();
  ```

**Mongo schema design:**
- Blog post on schema design: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3
- Here are some “rules of thumb” to guide you through these indenumberable (but not infinite) choices
  - **One:** favor embedding unless there is a compelling reason not to
  - **Two:** needing to access an object on its own is a compelling reason not to embed it
  - **Three:** Arrays should not grow without bound. If there are more than a couple of hundred documents on the “many” side, don’t embed them; if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed 
  - **Four:** Don’t be afraid of application-level joins: if you index correctly and use the projection specifier (as shown in part 2) then application-level joins are barely more expensive than server-side joins in a relational database
  - **Five:** Consider the write/read ratio when denormalizing. A field that will mostly be read and only seldom updated is a good candidate for denormalization: if you denormalize a field that is updated frequently then the extra work of finding and updating all the instances is likely to overwhelm the savings that you get from denormalizing
  - **Six:** As always with MongoDB, how you model your data depends – entirely – on your particular application’s data access patterns. You want to structure your data to match the ways that your application queries and updates it


## S45: MONGO RELATIONSHIPS WITH EXPRESS
#### TOPICS:
- Deleting with Mongo middleware
- Defining our Farm and Product models
- Creating farms
- Farms show page

**1. Defining our Farm and Product models**
- First setup the project by duplicating the S38_Mongoose_Express project
- In this project, we're going to setup a two-way relationship where the Farm model will have embed products objectId references and the Product model will have embed farm objectId reference
- When we visit a farm page, we want to be able to see a list of products
- When we visit a product page, we want to see a list of farms that carry that product
- In models folder, create a file called farm.js
- In farm.js file:
  - Define the Farm model
  ```js
  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const farmSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Farm must have a name!']
    },
    city: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email required']
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  });
  ```
- In products.js file:
  - Define the Product model
  ```js
  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      lowercase: true,
      enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
      type: Schema.Types.ObjectId,
      ref: 'Farm'
    }
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
  ```

**2. Creating new farms**
- In index.js file:
  - Import the Farm model: `const Farm = require('./models/farm');`
  - Create a get route handler that retrieves all the farms in the database
  - Create a get route handler that serves the create new farm form
  - Create a post route handler that saves the new farm data to the database and then redirect user to farms index page
  ```js
  app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
  });

  app.get('/farms/new', (req, res) => {
    res.render('farms/new');
  });

  app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
  });
  ```
- In views directory, create a folder called farms. In it, generate two templatings
  - index.ejs - renders farms index page
  - new.ejs - renders the add a farm form

**3. Farms show page**
- In index.js file:
  - Create a get route handler takes the user to a farm details page
  ```js
  app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/show', { farm });
  });
  ```
- In views/farms folder, create a templating file called show.ejs
  - Render the farm's city and email
  - Create an anchor link that takes user back to farms index page
- In views/farms/index.ejs file:
  - Make the farm list as a link that takes user to the farm details page
  - `<li><a href="/farms/<%= farm._id %>"><%= farm.name %></a></li>`

**4. Creating products for a farm**
- We want to create a product for a particular farm. To do this, on the show farm page, we add a link that says Add New Product. So user has to go to the farm page first and then be able to add a product through the farm
- This way, the route to add a product will include the farm id in it
- In index.js file:
  - Create a get route handler to serve a create new product form for a farm
  - Create a post route handler that 
    - finds the farm by its id in the database
    - creates a new product based on the data from req.body
    - pushes the new product to the farm.products property
    - adds the farm to the new product.farm property
    - saves the farm and new product to the database
  ```js
  app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', { categories, id });
  });

  app.post('/farms/:id/products', async (req, res) => {
    // res.send(req.body)
    const { id } = req.params;
    // Find the farm in the database based on farm id
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    // Create a new product based on the data we get from req.body
    const product = new Product({ name, price, category });
    // Push the new product to farm.products array
    farm.products.push(product);
    // Going the other way, add the farm to the new product.farm property
    product.farm = farm;
    // Save farm to the database. This farm now has a new product
    await farm.save();
    // Save the new product to the database
    await product.save();
    res.send(farm);
  });
  ```
- In views/products/new.ejs file:
  - Modify the path from '/products' to '/farms/<%= id %>/products'
  ```html
  <form action="/farms/<%= id %>/products" method="POST">
  ```
- In MongoDB:
  - In the products collection, the farm property should embed with farm objectId's
  - In the farms collection, the products property should embed with product objectId's

**5. Finishing touches**
- In the new product form page, views/products/new.ejs, render a text to display the name of the farm that this new product is going to be created for
- In index.js file: 
  - Populate the products on the show farm page
  - Populate the farm names on the show product page
- In the farm show page, views/farms/show.ejs, render the list of products for this farm
- In the product show page, views/products/detail.ejs, render the list of farm names for this product. Then make each farm name as anchor link that takes you back to the farm show page

**6. Deletion Mongoose middleware**
- If we delete a farm, all the associated references, the products, to be deleted as well
- Mongoose middleware are entirely distinct from Express middleware. They have nothing to do with one another
- In Mongoose middleware, there's a difference between document middleware and query middleware
- `findOneAndDelete` is a query middleware
- In models/farm.js file:
  - Import the Product model: `const Product = require('./product')`
  - Setup a Mongoose query middleware to find and delete a farm
  - Call the .post() method on farmSchema
    - The 1st arg it takes is the name of the query middleware, findOneAndDelete
    - The 2nd arg is an async calback function. The data that's returned from the query is a farm. We can delete the associated products in this callback
      - In this callback, first check to see if there's products in farm.products array
      - If there is, call the .deleteMany() method to delete them all
  ```js
  farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
      const res = await Product.deleteMany({ _id: { $in: farm.products } });
      // console.log(res)
    }
  });
  ```
- In index.js file:
  - Create a delete route to delete a farm
  ```js
  app.delete('/farms/:id', async (req, res) => {
    const deletedFarm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
  });
  ```
- In show page for a farm, views/farms/show.ejs file:
  - Create a form that has a delete button in it
  - Set the method-override query string to DELETE to override the browser POST method
  ```html
  <form action="/farms/<%= farm._id %>?_method=DELETE" method="POST">
    <button>Delete</button>
  </form>
  ```


## S46: YELPCAMP: ADDING THE REVIEWS MODEL

**1. Defining the Review Model**
- In models folder, create a file called review.js
- In review.js file:
  ```js
  const mongoose = require('mongoose');
  const { model } = require('./campground');
  const Schema = mongoose.Schema;

  const reviewSchema = new Schema({
    body: String,
    rating: Number
  });

  model.exports = mongoose.model('Review', reviewSchema);
  ```
- In models/campground.js file:
  - A campground may have many reviews. So we're going to embed reviews in the Campground model
  - In campgroundSchema, set the reviews property to an array of objectId's
    - Set the ref property to the Review model
  ```js
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
  ```

**2. Adding the Review Form**
- Create a review form at the bottom of the campground show page
- In models/campgrounds/show.ejs file:
  ```html
  <h2>Leave a Review</h2>
  <form action="" class="mb-3">
    <div class="mb-3">
      <label class="form-label" for="rating">Rating</label>
      <input
        class="form-range"
        type="range"
        min="1"
        max="5"
        name="review[rating]"
        id="rating"
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="body">Review</label>
      <textarea
        class="form-control"
        name="review[body]"
        id="body"
        cols="30"
        rows="3"
      ></textarea>
    </div>
    <button class="btn btn-success">Submit</button>
  </form>
  ```

**3. Creating Reviews for Campground**
- Create a review for a campground
- In app.js file:
  - Create a post route handler adds a new review to a campground, saves both the campground and review to the database, and then redirects user to the campground show page
  ```js
  app.post(
    '/campgrounds/:id/reviews',
    catchAsync(async (req, res) => {
      const campground = await Campground.findById(req.params.id);
      const review = new Review(req.body.review);
      campground.reviews.push(review);
      await review.save();
      await campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
    })
  );
  ```
- In views/campgrounds/show.ejs file:
  - Add the request path and the POST method in the form element
  - `<form action="/campgrounds/<%= campground._id %>/reviews" method="POST" class="mb-3">`

**4. Displaying Reviews on Campground Show Page**
- Before displaying the reviews, we first need to populate the reviews of a campground
- Then we can loop over the reviews array to display the reviews at the bottom of campground show page
- In app.js file:
  - Chain on the .populate() method and pass in the name of the property that we want to populate
  - `const campground = await Campground.findById(req.params.id).populate('reviews');`
- In views/campgrounds/show.ejs file:
  - We're just going to display the rating and review in <p> tags for now
  ```html
  <% for(let review of campground.reviews) { %>
  <div class="mb-3">
    <p>Rating:<%= review.rating %></p>
    <p>Review:<%= review.body %></p>
  </div>
  <% } %>
  ```

**5. Validating Reviews**
- In schemas.js file:
  - Create a validation schema for Review model using Joi
  ```js
  module.exports.reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().required().min(1).max(5),
      body: Joi.string().required()
    }).required()
  })
  ```
- In app.js file:
  - Import the reviewSchema: `const { campgroundSchema, reviewSchema } = require('./schemas.js');`
  - Create a validate middleware for Review
  - Then pass in the middleware to the post route handler for reviews as 2nd arg
  ```js
  // Validate middleware for Review
  const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
  };

  // Pass in the middleware as 2nd argument
  app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => { ... }));
  ```
- Add form valiation on the client-side using Bootstrap5
- In views/campgrounds/show.ejs file:
  - Add `required` property to Review <textarea> tag
  - In the Review form element, add `novalidate` property and `validated-form` class
  ```html
		<form
			action="/campgrounds/<%= campground._id %>/reviews"
			method="POST"
			class="mb-3 validated-form"
			novalidate
		>
  ``` 

**6. Styling Reviews**
- In views/campgrounds/show.ejs file:
  - Use the card component to style the reviews
  - Use a 2-column grid where Leave a Review section is on the right hand side

**7. Deleting Reviews**
- In app.js file:
  - Create a delete route handler to delete a review from DB based on reviewId
  - Use the `$pull` operator to pull the reviewId from reviews property
  ```js
  app.delete(
    '/campgrounds/:id/reviews/:reviewId',
    catchAsync(async (req, res) => {
      const { id, reviewId } = req.params;
      await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      res.redirect(`/campgrounds/${id}`);
    })
  );
  ```
- In views/campgrounds/show.ejs file:
  - At the bottom of each review, add a delete form that has a Delete button in it
    - Use the query string to set method-override to DELETE
    - Set the regular method to POST
  ```html
  <form action="/campgrounds/<%= campground._id %>/reviews/<%= review._id %>?_method=DELETE" method="POST">
    <button class="btn btn-sm btn-danger">Delete</button>
  </form>
  ```

**8. Campground Delete Middleware**
- To delete a campground and its associated reviews, we're going to use the Mongoose `findOneAndDelete` query middleware. This middleware will try to find the campground and we can pass that campground to an async callback function to delete its associated reviews
- Note that this `findOneAndDelete` query middleware only triggers because in the delete route handler to delete campground, we called the `findByIdAndDelete` method on Campground model. A different method would not trigger this middleware
- In models/campground.js file:
  - Import Review model: `const Review = require('./review');`
  - This query middleware first tries to find and delete a document, then passes in the deleted doc to the async callback function
  - We call the deleteMany method on to delete all reviews in the Review model whose id is in the deleted doc reviews array
  ```js
  CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
      await Review.deleteMany({
        _id: {
          $in: doc.reviews
        }
      });
    }
  });
  ```


## S47: EXPRESS ROUTER AND COOKIES
#### TOPICS:
- Express router basics
- Understanding cookies
- Cookie parser
- Signed cookies
- HMAC signing

**Express Router Basics:**
- Express Router: https://expressjs.com/en/api.html#express.router
- Creates a new router object. A `router` object is an isolated instance of middleware and routes. You can think of it as a "mini-application," capable only of performing middleware and routing functions. Every Express application has a built-in app router
- The top-level `express` object has a `Router()` method that creates a new router object
- Once you've created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application 
- `const router = express.Router([options])`
  - The optional `options` parameter specifies the behavior of the router
- **Creating routes with Express.Router():** In routes/shelters.js file:
  - Import Express
  - Create the router object by calling express.Router()
  - Add on specific routes on the router object
  - Export the router object
  ```js
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('ALL SHELTERS');
  });

  router.post('/', (req, res) => {
    res.send('CREATING SHELTERS');
  });

  router.get('/:id', (req, res) => {
    res.send('VIEWING ONE SHELTER');
  });

  router.get('/:id/edit', (req, res) => {
    res.send('EDITING ONE SHELTER');
  });

  module.exports = router;
  ```
- **Using the routes:** In index.js file:
  - Import the shelter routes
  - Call the app.use() to use the routes
    - The 1st arg is the path that specifies the prefix of all of the routes that we've predefined in the router that we pass in as 2nd arg
      - For example, if our shelter routes all starts with 'shelters', in our 1st arg path we can specify '/shelters'
      - The advantage of this is we can change the route in one central place, although it's not often that we change our route
    - 2nd arg the name of the router. For example, shelterRoutes
  ```js
  const express = require('express');
  const app = express();
  const shelterRoutes = require('./routes/shelters');

  app.use('/shelters', shelterRoutes);

  app.listen(3000, () => {
    console.log('Serving app on port 3000');
  });
  ```

**Express Router and Middleware:**
- With Express router (the router object), just as we can add on specific routees (get, post, put, delete), we also can add in our own middleware
- This is useful when we wawnt to apply a middleware to a chunk of our application, but not the entire application. For example, only admin users can have access to certain features of the app
- **Defining routes and middleware:** In routes/admin.js file:
  - We can define our own middleware and then pass it in to router.use(). This middleware will only apply to the routes defined in this file
  - Even when we import this adminRoutes to index.js file, the middleware will not apply to other routes
  ```js
  const express = require('express');
  const router = express.Router();

  router.use((req, res, next) => {
    if (req.query.isAdmin) {
      next();
    }
    res.send('SORRY NOT AN ADMIN!');
  });

  router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET');
  });
  router.get('/deleteeverything', (req, res) => {
    res.send('OK DELETED IT ALL!');
  });

  module.exports = router;
  ```
- **Using the routes:** In index.js file:
  ```js
  const adminRoutes = require('./routes/admin');

  app.use('/admin', adminRoutes);
  ```
- **Test in the browser:**
  - Type in URL: `http://localhost:3000/admin/deleteeverything?isAdmin=true`

**Introducing Cookies:**
- Cookies are little bits of information that are stored in a user's browser when using a particular website
- Once a cookie is set, a user's browser will send the cookie on every subsequent request to the site
- Cookies allow us to make HTTP stateful
- Uses:
  - Session management - keep track user login state, shopping cart
  - Personalization - used to remember info about the user in order to show relevant content to that user over time
  - Tracking - used to track users' web browsing habits

**Sending Cookies:**
- Document: http://expressjs.com/en/5x/api.html#res.cookie
- `res.cookie(name, value [, options])`
- Sets cookie `name` to `value`. The `value` parameter may be a string or object converted to JSON
- The `options` parameter is an object that can be the following properties
  - domain, encode, expires, httpOnly, maxAge, path, priority, secure, signed, sameSite
- Example:
  ```js
  app.get('/setname', (req, res) => {
    res.cookie('name', 'stevie chicks')
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!')
  })
  ```
- To see the cookies sent to a website in the browser:
  - Go to dev tools -> Application tab -> cookies
  - Should see the Name and Value of each cookie

**Cookie Parser Middleware:**
- We're going to use cookie-parser package to parse our cookies
- Install: `npm i cookie-parser`
- In index.js file:
  - Import cookie-parser
  - Execute cookieParser
  - Cookies are stored in `req.cookies`
  ```js
  const cookieParser = require('cookie-parser');
  // Execute cookieParser middleware
  app.use(cookieParser());

  app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey there, ${name}`);
  });
  ```

**Signing Cookies:**
- The idea of signing something in programming refers to digital signature or cryptographic signature. The idea is not to encrypt or hide informatin, instead it is to be able to verify its integrity hasn't changed
- In cookieParser, optionally we may enable signed cookie support by passing a `secret` string, which assigns `req.secret` so it may be used by other middleware
  - `cookieParser('secret')`
  - Note that this `secret` string is usually stored in an enviromental variable and not be exposed
- To tell cookieParser to send cookie as signed cookie, specify signed to true
  - `res.cookie(name, value, { signed: true })`
- To access regular cookies
  - `req.cookies`
- To access signed cookies
  - `req.signedCookies`
- Example:
  ```js
  const cookieParser = require('cookie-parser');
  // This string is going to be used by cookieParse to sign a cookie
  app.use(cookieParser('thisismysecret'));

  app.get('/getsignedcookie', (req, res) => {
    // Specify signed set to true
    res.cookie('fruit', 'grape', { signed: true });
    res.send('OK SIGNED YOUR FRUIT COOKIE!');
  })

  // To access regular cookies and signed cookies
  app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.cookies);
  });
  ```


## S48: EXPRESS SESSION AND FLASH
## TOPICS:
- Conceptual overview of session
- Setting up Express session
- Integrating flash messages

**Introduction to Sessions:**
- Cookies are stored in the web browser and sessions are stored on the server
- There's a limit and size of data that can be stored in the browser
- It's not very practical (or secure) to store a lot of data client-side using cookies. This is where sessions come in!
- Sessions are a server-side data store that we use to make HTTP stateful. Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data

**Express Session Middleware:**
- express-session middleware is a package we can use to implement sessions in Express app
- Install: `npm i express-session`
- By default, the session is stored in `memoryStore` and it's for development purposes, not for production. For production, it's best to use another party's session store, such as Redis or Mongo. We will do this when we deploy our app
- In index.js file:
  - Import express-session middleware: `const session = require('express-session');`
  - Instantiate the middleware inside app.use()
  - There are a whole bunch of different options we can pass in
  - But for now, all we need to pass in to the middleware when we instantiate it is a secret. The value of the secret is a string
    - `app.use(session({ secret: 'thisisasecret' }))`
  - At any time on our request, incoming request object (req), we will now have a session property available: `req.session`
  - In this `req.session`, we can add anything we want to it
  - Remember that the cookie in the browser does not contain any information in the session. The session can contain so much more information and does not send any of the data to be stored as a cookie
  - The only thing that it sends to the browser is a session id. That session id then is sent on every subsequent request
  - express-session will take the session id package and the cookie and search the session store with the matching id. If there's a match, then the session info is available
  ```js
  const express = require('express');
  const app = express();
  const session = require('express-session');

  const sessionOptions = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false
  };
  // Instantiate session and pass in options
  app.use(session(sessionOptions));

  // Adding count to session
  app.get('/viewcount', (req, res) => {
    if (req.session.count) {
      req.session.count += 1;
    } else {
      req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`);
  });

  // Adding username to session
  app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
  });

  app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`);
  });

  app.listen(3000, () => {
    console.log('Serving app on port 3000');
  });
  ```

**Intro to Flash:**
- The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user
- The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered
- We're going to use a package called connect-flash
- Install: `npm i connect-flash`
- In index.js file:
  - Import flash: `const flash = require('connect-flash');`
  - Make sure express-session is imported and setup
  - Execute flash middleware: `app.use(flash());`
  - With flash middleware in place, all requests will have a `req.flash()` function that can be used for flash messages
  - Pass in the flash key and value in req.flash()
  - Than call req.redirect()
  - Wherever the redirect page is is where we want to retrieve the flash message by calling req.flash() and pass in the key
  ```js
  const flash = require('connect-flash');

  // Execute flash middleware
  app.use(flash());

  app.get('/farms', async (req, res) => {
    const farms = await farms.find({});
    // Get an array of flash messages by passing the key to req.flash()
    res.render('farms/index', { farms, messages: req.flash('success') });
  });

  app.post('/farms', async (req, res) => {
    const farm = new farm(req.body);
    await farm.save();
    // Set a flash message by passing the key, followed by the value, to req.
    req.flash('success', 'Successfully made a new farm!');
    res.redirect('/farms');
  });
  ```

**Res.locals and Flash:**
- Another option is to set the flash messages on res.locals and it will be available to any templates that is rendered
- Write a middleware that adds flash messages to res.locals
  ```js
  app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
  })
  ```
- In a templete file:
  - `<%= messages %>`


## S49: YELPCAMP: RESTRUCTURING AND FLASH
**1. Breaking Out Campground Routes:**
- At the root of project directory, create a folder called routes. In it, create a file called campgrounds.js
- In campgrounds.js file:
  - Import Express
  - Create a router object from express.Router()
  - Import campgroundSchema and Campground model
  - Import catchAsync and ExpressError utility functions
  - Then cut and paste all the route handlers for campgrounds to this file
    - replace `app.get()` with `router.get()`, etc
  - Cut and paste the validate middleware for Campground
  - Lastly, export the router
- In app.js file:
  - Import the campgrounds routes
    - `const campgrounds = require('./routes/campgrounds');`
  - Use the campgrounds routes
    - `app.use('/campgrounds', campgrounds);`

**2. Breaking Out Review Routes:**
- In routes folder, create a file called reviews.js
- In reviews.js file:
  - Very similar process to breaking out campground routes
  - One thing we need to do when creating the router object from express.Router() is we need to set mergeParams option to true. We don't have access to a campground id at the moment in our review routes file
    - `const router = express.Router({ mergeParams: true });`

**3. Serving Static Assets:**
- At the root of project directory, create a folder called public. In it, create two new folders: javascripts and stylesheets
- In public/javascripts/validateForms.js file:
  - From the boilerplate.ejs file, cut and paste the validate form function into this file
  ```js
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form');

    // Loop over them and prevent submission
    Array.from(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  })();
  ```
- In views/layouts/boilerplate.ejs file:
  - Include the validateForms.js file in a script tag
  - `<script src="/javascripts/validateForms.js"></script>`
- In app.js file:
  - We need to tell Express to serve our public directory
  - `app.use(express.static(path.join(__dirname, 'public')));`

**4. Configuring Session:**
- Install express-session: `npm i express-session`
- In app.js file:
  - Import express-session
  - Execute and use the session in the app by calling app.use()
  - Define session config and then pass it in to session when executing
    - Set expiration date for the cookie. This way, the user won't be logged in forever, for example. Date.now() is formated in millisecond
    - Set httpOnly on the cookie for extra security
    - We will eventually move the secret to an env variable
  ```js
  const session = require('express-session');

  const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  };
  app.use(session(sessionConfig));
  ``` 

**5. Setting Up Flash:**
- Install connect-flash: `npm i connect-flash`
- Flash a message when a user successfully created a new campground
- In app.js file:
  - Import connect-flash
  - Use flash in app.use()
  - Define a flash middleware using res.locals. This way all of our templates will automatically have access to flash messages and we don't have to pass them to our templates
  ```js
  const flash = require('connect-flash');

  app.use(flash());

  // Flash middleware
  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    next();
  });
  ```
- In routes/campgrounds.js file:
  - To use flash, call req.flash() and pass in key and value
  - Call res.redirect() right after flash, because this is where the flash message will be rendered
  ```js
  router.post(
    '/',
    validateCampground,
    catchAsync(async (req, res, next) => {
      // res.send(req.body)
      // if (!req.body.campground) {
      // 	throw new ExpressError('Invalid campground data', 400);
      // }
      const campground = new Campground(req.body.campground);
      await campground.save();
      req.flash('success', 'Successfully made a new campground!');
      res.redirect(`/campgrounds/${campground._id}`);
    })
  );
  ```
- In boilerplate.ejs file:
  - Render the success flash key
  - `<%= success %>`

**6. Flash Success Partial:**
- We'll style our success flash partial using Bootstrap5 and display the flash partial at the top of the page
- In views/partials folder, create a file called flash.ejs
- In flash.ejs file:
  - Render the success flash message and style the message using Bootstrap5
  - Add conditional to only display when success key exists and it's not empty
  ```html
  <% if(success && success.length) { %>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <%= success %>
      <button
        type="button"
        class="btn-close"
        data-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  <% } %>
  ```
- In boilerplate.ejs file:
  - Include the flash partial just above the body
  ```html
  <main class="container my-5">
    <%- include('../partials/flash') %> 
    <%- body %>
  </main>
  ```
- If successfully updated or deleted a campground, display a success flash message
- In routes/campgrounds.js file:
  - In the update route handler to update a campground, use req.flash() to create a success flash message when a user successfully updated a campground
    ```js
    router.put(
      '/:id',
      validateCampground,
      catchAsync(async (req, res) => {
        // res.send('It works!')
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(
          id,
          { ...req.body.campground },
          { new: true }
        );
        req.flash('success', 'Successfully updated campground!');
        res.redirect(`/campgrounds/${campground._id}`);
      })
    );
    ```
  - In the delete route handler to delete a campground, use req.flash() to create a success flash message when a user successfully deleted a campground
    ```js
		req.flash('success', 'Successfully deleted campground');
		res.redirect('/campgrounds');
    ```
- If successfully created or deleted a review, display a success flash message
- In routes/reviews.js file:
  - In the put route handler to create a review, use req.flash() to create a success flash message when a user successfully created a review
    ```js
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
    ```
  - In the delete route handler to delete a review, use req.flash() to create a success flash message when a user successfully deleted a review
    ```js
		req.flash('success', 'Successfully deleted review');
		res.redirect(`/campgrounds/${id}`);
    ```
  
**7. Flash Errors Partial:**
-  In app.js file:
  - Add an error flash key to flash middleware
  ```js
  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });
  ```
- In views/partials/flash.ejs file:
  - Render the error flash message and style the message using Bootstrap5
  - Add conditional to only display when error key exists and it's not empty
  ```html
  <% if(error && error.length) { %>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <%= error %>
      <button
        type="button"
        class="btn-close"
        data-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  <% } %>
  ```
- In routes/campgrounds.js file:
  - Show a flash error message when a campground has been deleted and later a user tries to access the campground page. Then redirect to campgrounds index page
  - Do the same thing when trying to edit a campground that doesn't exist
  ```js
  router.get(
    '/:id',
    catchAsync(async (req, res) => {
      const campground = await Campground.findById(req.params.id).populate(
        'reviews'
      );
      if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
      }
      res.render('campgrounds/show', { campground });
    })
  );
  ```


## S50: AUTHENTICATION FROM "SCRATCH"
#### TOPICS:
- Authentication vs. authorization
- How to (not) store passwords
- Working with bcrypt
- Auth demo
- Understanding hashing functions
- Password salts

**Authentication Vs. Authorization**
- Authentication is the process of verifying who a particular user is
- We typically authenticate with a username/password combo, but we can also use security questions, facial recognition, etc.
- Authorization is verifying what a specific user has access to
- Generally, we authorize after a user has been authenticated. "Now that we know who you are, here is what you are allowed to do and NOT allowed to do"

**How to (not) Store Passwords**
- Rule #1: never store passwords
  - Never store a password in text and as it is in database
- The solution: Hashing
  - Rather than storing a password in the database, we run the password through a hashing function first and then store the result in the database
  - Hashing functions are functions that map input data of some arbitrary size to fixed-size output values

**Cryptographic Hashing Functions**
1. One-way function which is infeasible to invert
2. Small change in input yields large change in the output
3. Deterministic - same input yields same output
4. Unlikely to find 2 outputs with same value
5. Password Hash Functions are deliberately SLOW

**Password Salts**
- A salt is a random value added to the password before we hash it
- It helps ensure unique hashes and mitigate common attacks

**Intro to Bcrypt**
- bcrypt.js package is written entirely in Javascript, so it will run on node.js and also works in the browser
- bcrypt package is built on top of C++ and is made for node.js. It doesn't work in the browser. We will be using this package
- Install: `npm i bcrypt`
- The recommended number for saltRounds is 12. The higher the number, the longer it takes to generate the salt
- Example:
  - Import: `const bcrypt = require('bcrypt');`
  - Call bcrypt.genSalt() to generate the salt. Pass in the saltRounds
  - Call bcrypt.hash() to generate the hash. Pass in the password and the salt
  - It's asynchronous operation, so we need to await it
  - Use bcrypt.compare() to compare the text password with the hashed password
  ```js
  const bcrypt = require('bcrypt');

  // Technique 1: generate the salt and hash separately
  const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
  };

  // Technique 2: generate the salt and the hash
  const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
  };

  const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
      console.log('LOGGED YOU IN! SUCCESSFUL MATCH!');
    } else {
      console.log('INCORRECT!');
    }
  };

  // hashPassword('monkey');
  login('monkey', '$2b$12$EDvRJnvxuGAyU1cXFGhz9uPwSnGjY4u89dvgJvQ6BhThFiQy3.csG');
  ```

**Auth Demo: Setup**
- Install: `npm i express mongoose ejs bcrypt`
- In models/user.js file:
  - Import mongoose
  - Define userSchema
    - Define username and password
    - Set both to string type and set required to true
  - Instantiate a User model and export it
- In index.js file:
  - Import Express
  - Instantiate an app object from express
  - Call app.listen() for server to listen on port 3000
  - Import User model
  - Set the view engine to ejs and set views to views directory
  - Create a get route handler for path '/register'. This route serves the register form
    - Call res.render() and render the register.ejs template
- In views/register.ejs file:
  - Render a form with username and password input fields and a Sign Up button

**Auth Demo: Registering**
- In index.js file:
  - Import mongoose and bcrypt
  - Connect mongoose to mongoDB database. Name the database authDemo
  - Create a post route handler to create a new user. This is an async function
    - Destructure username and password from req.body
    - Hash the password using bcrypt.hash() and save the hashed password to hash variable
    - Instantiate a new user from User model
      - Set the username to username from req.body
      - Set the password to hash
    - Save the new user to the database using user.save() method. This is an async operation, so we need to await it
    - When finished, redirect user to home page using res.redirect()
    ```js
    app.post('/register', async (req, res) => {
      // res.send(req.body)
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        password: hash
      });
      await user.save();
      res.redirect('/');
    });
    ```
- In views/register.ejs file:
  - In the form element, set action property to `/register` path and set method to `POST`

**Auth Demo: Login**
- In index.js file:
  - Create a get route handler to serve the login form
    - Call res.render() to render the login.ejs template
  - Create a post route handler to login a user
    - Find the user in the database using User.findOne()
    - Then call bcrypt.compare() to compare the text password the user typed in the login form and the user hashed password from the database
  ```js
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.send('YAY WELCOME!');
    } else {
      res.send('TRY AGAIN');
    }
  });
  ```
- In views/login.ejs file:
  - Copy and paste the register form as a starter code
  - Change the header text to Login
  - Change the action path to `/login`
  - Change the button text to Login

**Auth Demo: Staying Logged In with Session**
- Install express-session: `npm i express-session`
- In index.js file:
  - Import express-session
  - Execute the session inside app.use(). Specify the secret option
  - If the user is successfuly logged in, we will store the user id in the session. And then redirect them to '/secret' page
    - If they're not successfully logged in, redirect them to login page
  - If a user successfully registered as a new user, we will store the user id to the session asl well. Then redirect them to '/secret' page
  - Once a user is successfully logged in or registered, their user id is stored in the session. Only these users have access to the '/secret' page
  ```js
  app.use(session({ secret: 'notagoodsecret' }));

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.user_id = user._id;
      res.redirect('/secret');
    } else {
      res.redirect('/login');
    }
  });

  app.get('/secret', (req, res) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    }
    res.send('THIS IS SECRET! YOU CANNOT SEE ME UNLESS YOU ARE LOGGED IN!');
  });
  ```

**Auth Demo: Logout**
- To log someone out, we just need to get rid of the user id in the session by setting it to null. Do this in a post route handler
- In index.js file:
  - Create a post route handler for logout
    - Set the user id in session to null
    - Then redirect user to login page
    - Another option to logout a user is use `req.session.destroy()`
  ```js
  app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
  });
  ```
- In views/secret.ejs file:
  - Render a form that has a Signout button in it
  - Set the form path to `/logout` and the method to POST
  ```html
  <form action="/logout" method="POST">
    <button>Sign Out</button>
  </form>
  ```

**Auth Demo: Require Login Middleware**
- We're going to write a simple middleware that verifies if somebody is logged in or not. Because often times, we want to protect multiple endpoints
- We simply pass in this middleware as a 2nd argument to any route handlers we want to protect
- In index.js file:
  - Write a middleware function that checks if the user id exists in the session
    - If it doesn't exist, they're not logged in user. Redirect to login page
    - If it exist, they're logged in user. Call next()
  - Use this middleware anywhere that requires user to be logged in. Pass in this middleware as 2nd arg
  ```js
  const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect('/login');
    }
    next();
  };

  // Using the middleware in a route
  app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
  });
  ```

**Auth Demo: Refactoring to Model Methods**
- In models/user.js file:
  - Move the functionality where we look for a user in the database and check whether they've entered a valid password to the User model method
  - Also, hash the password before saving to the database
  ```js
  userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
  };

  // Hash the password before saving to the database
  // Has the password only if it's been modified
  userSchema.pre('save', async function (next) {
    // If the password hasn't been changed, call next()
    if (!this.isModified('password')) return next();
    // If the password has been modified, hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  ```


## S51: YELPCAMP: ADDING IN AUTHENTICATION
**1. Intro to Passport**
- Passport is a tool that helps add authentication in Node.js application
- It also comes with different stategies, different ways or services to log somone in, such as Facebook, Google, Twitter, github login
- With Passport, it's easy to add in other stategies for users to log into our application in the future
- We're going to begin with local login
- Install passport: `npm i passport passport-local passport-local-mongoose`

**2. Creating Our User Model**
- In models folder, create a User model file called user.js
- In user.js file:
  - Import Mongoose and passport-local-mongoose
  - Define the userSchema
  - Use userSchema.plugin() and pass in passportLocalMongoose
    - This will add username and password fields to our userSchema
    - Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value
  - Instantiate a User model and export it
  ```js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const passportLocalMongoose = require('passport-local-mongoose');

  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    }
  });

  // This will add username and password fields to our userSchema
  userSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('User', userSchema);
  ```

**3. Configuring Passport**
- Now we're going to configure our app, the app.js file, to use Passport
- In app.js file
  - Import passport and passport-local
  - Import User model
  - Tell our app to use `passport.initialize()`
  - Tell our app to use `passport.session()`
    - This is a middleware that we need to use if we want persistent login sessions
    - Also, make sure to use `session()` before `passport.session()`
  - Next step is to tell Passport to use the LocalStrategy. And this LocalStrategy, the authentication method is located on our User model call `authenticate()`
    - `authenticate()` is a static method coming from passport-local-mongoose. It generates a function that is used in Passport's LocalStrategy
    - `passport.use(new LocalStrategy(User.authenticate()));`
  - Tell Passport to serialize a user by calling `serializeUser()` on passport
    - `serializeUser()` is a static method that generates a function that is used by Passport to serialize users into the session
    - `passport.serializeUser(User.serializeUser());`
  - Tell Passport to deserialize a user, get a user out of the session, by calling `deserializeUser()` method
    - `passport.deserializeUser(User.deserializeUser());`
    ```js
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const User = require('./models/user');

    app.use(session(sessionConfig));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    ```
  - Next, let's register a new user using a helper method called `register(user, password, cb)`
    - This is a static method provided by passport-local-mongoose to register a new user instance with a given password and checks if username is unique
    - Call this method on the User model: `User.register()`
      - Pass in the user object as 1st arg
      - Pass in a password as 2nd arg
    - This is an async operation, so we need to await it
    - Store the registered user in a variable
    ```js
    app.get('/fakeUser', async (req, res) => {
      const user = new User({ email: 'andrew@example.com', username: 'andrew' });
      // 1st arg is the user object
      // 2nd arg is the password
      // Passport hashes the password, creates the salt, and stores the salt & hash on the new user
      const newUser = await User.register(user, 'chicken');
      res.send(newUser);
    });
    ```

**4. Register Form**
- In routes folder, create a file called users.js. This file handles all the routes for user
- In users.js file:
  - Create a get route handler that serves the register form
    - Call res.render() to render the register.ejs template
  - Create a post route handler to handle the register form request
  ```js
  const express = require('express');
  const router = express.Router();
  const User = require('../models/user');

  router.get('/register', (req, res) => {
    res.render('users/register');
  });

  router.post('/register', async (req, res) => {
    res.send(req.body);
  });

  module.exports = router;
  ```
- In views folder, create another folder called users. In it, create a file called register.ejs
- In register.ejs file:
  - Include the boilerpate template
  - Render a register form that has a username, email, and password input fields, and a submit button
  - Add browser form validation by adding a class of validated-form and set novalidate on the form element
- In app.js file:
  - Import the user routes
  - Tell app to use the userRoutes
  ```js
  const userRoutes = require('./models/user');

  app.use('/', userRoutes);
  ```

**5. Register Route Logic**
- To register a user, we first create a basic user instance from the User model with just the username and email, but not the password. To register a new user, we call the register() method on the User model and pass in the basic user object and the password as arguments
- In routes/users.js file:
  - Import catchAsync utility function
  - Register a user in a try/catch block
    - If there's an error, we want to flash an error message and redirect user to register page
    - If success, flash a success massage and redirect user to campgrounds page
  - First create a user object from User model
    - Provide the email and username, but not the password
    - Save that to a user variable
  - Then call the register() method on the User model to register the user
    - Pass in the user object and the password as arguments
    - This is an async operation, so we need to await it
    - Save it to a registeredUser variable
  ```js
  const catchAsync = require('../utils/catchAsync');

  router.post(
    '/register',
    catchAsync(async (req, res) => {
      // res.send(req.body);
      try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
      } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
      }
      console.log(registeredUser);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    })
  );
  ```

**6. Login Routes**
- For logging a user, we can use `passport-authenticate()` middleware provided by Passport. We just need to specify the login strategy and options to handle failures
- In routes/users.js file:
  - Import passport: `const passport = require('passport');`
  - Create a get route handler that serves the login form
    - Call res.render() and render the login.ejs template
  - Create a post route handler that handles the login user functionality
    - As 2nd arg, use the `passport.authenticate()` middleware
      - 1st arg is specify the login strategy. In our case, it's local login
      - 2nd arg is specify options as object. If login fails we want to flash an error message and redirect user back to login page
    - If they've made it pass the middleware, that means they're authenticated and we can flash a success message and redirect user to campgrounds index page
  ```js
  router.get('/login', (req, res) => {
    res.render('users/login');
  });

  router.post(
    '/login',
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login'
    }),
    (req, res) => {
      req.flash('success', 'Welcome back!');
      res.redirect('/campgrounds');
    }
  );
  ```
- In views/users folder, create a file called login.ejs file
- In login.ejs file:
  - This login form is very similar to the register.ejs form. Copy and paste as a starter code
  - For login, we only need username and password input fields
  - Change the form path to `/login` and it's a POST method

**7. isLoggedIn Middleware**
- To keep track of whether a user is authenticated or is logged in or not, we can use a middleware provided by Passport called `isAuthenticated()`. This middleware is automatically added to the request object (req)
- We can write our own middleware that we can use anywhere in our application that requires a user to be authenticated before accessing certain features
- At the root of project, create a file called middleware.js
- In middleware.js file:
  - Write an isLoggedIn middleware that checks if the user is authenticated or not
    - If not, redirect user to login page
    - If authenticated, call next()
  ```js
  module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('error', 'You must be signed in');
      return res.redirect('/login');
    }
    next();
  };
  ```
- We can use this middleware when a user tries to create a new campground, edit a campground, and delete a campground. A user must be authenticated/signed in
  - To use the middleware, just pass in the name of the middleware as 2nd argument in the request route

**8. Adding Logout**
- Passport added two methods automatically to the request object (req) called `login()` and `logout()`. After calling it, we can redirect user to somewhere else
- In routes/users.js file:
  - Create a get route handler to logout a user using the req.logout() method
  - Add a success flash message when a user successfully logged out
  - Then redirect them to campgrounds index page
  ```js
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
  ```
- In views/partials/navbar.ejs file:
  - Add nav links for Login, Sign Up, and Logout in the navbar
  ```html
  <div class="navbar-nav ml-auto">
    <a class="nav-link" href="/login">Login</a>
    <a class="nav-link" href="/register">Sign Up</a>
    <a class="nav-link" href="/logout">Logout</a>
  </div>
  ```

**9. currentUser Helper**
- In the navebar, when a user is already logged in, we don't want to display the Sign Up or Login links. When a user is logged in, display the Logout link 
- Passport has automatically added a property called `user` to the request object (req). Passport is going to deserialize the user data in the session and fill in `req.user` with that data
- When calling `req.user`, we have access to the user in the session
  - When there's no user in the session, `req.user` is set to undefined
  - If there's a user, it contains the user id, name, and email
- In app.js file:
  - We want our all of our templates to have access to the current user, so we want to set `req.user` globally, just like we did with success and error flash messages
  ```js
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });
  ```
- In navbar.ejs file:
  - Write a condition that checks if there's a currentUser in the session
  ```html
  <div class="navbar-nav ml-auto">
    <% if(!currentUser) { %>
    <a class="nav-link" href="/login">Login</a>
    <a class="nav-link" href="/register">Sign Up</a>
    <% } else { %>
    <a class="nav-link" href="/logout">Logout</a>
    <% } %>
  </div>
  ```

**10. Fixing Register Route**
- After someone has registered an account, it's a bad experience for them to have to login again to use our application. We want to log them in once they're registered
- Passport added a `login()` function on the request object(req) that can be used to establish a login session
- When the login operation completes, `user` will be assigned to `req.user`
- Note: `passport.authenticate()` middleware invokes `req.login()` automatically. This function is primarily used when users sign up, during which `req.login()` can be invoked to automatically log in the newly registered user
- Syntax: `req.login(user, callback)`
- In routes/users.js file:
  - In route handler to register a new user, after a registeredUser is created, call `req.login()` function to login the registeredUser
  ```js
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.flash('success', 'Welcome to Yelp Camp!');
    res.redirect('/campgrounds');
  });
  ```

**11. returnTo Behavior: req.originalURL**
- When a user attempts to access a page that requires user authentication, but they're not authenticated, so we ask them to log in. We want to remember or keep track of the page the user wanted to visit so that they've logged in, it will direct them to that page
- What we want to do is find this URL and create a state for it in the session. Once the user is logged in and directed to this page, we can clear this URL from the session
- There's a `originalUrl` property that's automatically added to the request object (req): `req.originalUrl`
- In middleware.js file:
  - In isLoggedIn middleware, store the original URL, `req.originalUrl`, in the session. Call the session returnTo
  ```js
  module.exports.isLoggedIn = (req, res, next) => {
    // console.log('REQ.USER...', req.user)
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash('error', 'You must be signed in');
      return res.redirect('/login');
    }
    next();
  };
  ```
- In routes/users.js file:
  - In the route handler for login, after the user is authenticated, we can redirect user to the originalUrl/returnTo stored in the session
  - If there isn't a returnTo, redirect to campgrounds index page
  - After redirect, we want to delete the returnTo in the session
  ```js
  router.post(
    '/login',
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login'
    }),
    (req, res) => {
      req.flash('success', 'Welcome back!');
      const redirectUrl = req.session.returnTo || '/campgrounds';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
  );
  ```


## S52: YELPCAMP: BASIC AUTHORIZATION
**1. Adding an Author to Campground**
- When a user creates a campground, we want to associate the user id, found in req.user, with the campground. We also want to display the campground author's username on the campground show page
- In models/campground.js file:
  - Add author property to the campgroundSchema
  ```js
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
  ```
- Next, we want to have access to the author information in the show campground page. To do that, we need to populate the author key in the campground route handler
- In routes/campgrounds.js file:
  - In route handler to find and show a campground, chain on the .populate() method and pass in the author key
  ```js
  router.get(
    '/:id',
    catchAsync(async (req, res) => {
      const campground = await Campground.findById(req.params.id)
        .populate('reviews')
        .populate('author');
        // console.log(campground)
      if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
      }
      res.render('campgrounds/show', { campground });
    })
  );
  ```
- In views/campgrounds/show.ejs file:
  - Display the author's username in the show campground template
  - `<li class="list-group-item text-muted">Submitted by <%= campground.author.username %></li>`
- In routes/campgrounds.js file:
  - In the post route handler to create a new campground, assign the campground author to the user id found in the session. Do this right before saving the campground to the database
  - `campground.author = req.user._id;`

**2. Showing and Hiding Edit/Delete**
- If a user visits a campground show page and that user is not the author of that campground, we want to hide the Edit/Delete button. To do this, we first want to check if there's a currentUser and then check to see if the currentUser id matches with the campground author
- If no user is logged in, currentUser is set to undefined. And doing currentUser._id will break everything. That is why we need to check if currentUser exists as well
- In views/campgrounds/show.ejs file:
  ```html
  <% if(currentUser && campground.author.equals(currentUser._id)) { %>
    <div class="card-body">
      <a
        class="card-link btn btn-info"
        href="/campgrounds/<%= campground._id %>/edit"
        >Edit</a
      >
      <form
        class="d-inline"
        action="/campgrounds/<%= campground._id %>?_method=DELETE"
        method="POST"
      >
        <button class="btn btn-danger">Delete</button>
      </form>
    </div>
  <% } %>
  ```








**3. Campground Permissions**
**4. Authorization Middleware**
**5. Reviews Permissions**
**6. More Reviews Authorization**









## RESOURCES
- Color inspiration: www.coolers.co/palettes/trending
- Bootstrap website: https://getbootstrap.com/docs/3.3/getting-started/


## NPM PACKAGES USED
- Express framework
  - Install: `npm i express`
- Nodemon: auto-restart the server
  - Install globally: `npm i -g nodemon`
- EJS: Embedded Javascript templating
  - Install: `npm i ejs`
- uuid
  - Install: `npm i uuid`
  - Import: `const { v4: uuidv4} = require('uuid')`
  - Use: `uuidv4()`
- Express method-override
  - Install: `npm i method-override`
  - Import: `const methodOverride = require('method-override');`
- Mongoose
  - Install: `npm i mongoose`
  - Import in index.js file: `const mongoose = require('mongoose');`
  - Make sure MongoDB is running in the background first before connecting Mongoose to Mongo
    - Run: `brew services start mongodb-community@4.4`
- Morgan
  - Install: `npm i morgan`
- ejs-mate
  - Install: `npm i ejs-mate`
- Bootstrap5
  - Website: https://v5.getbootstrap.com/
- JOI - a JS validator tool
  - Install: `npm i joi`
- cookie-parser
  - Install: `npm i cookie-parser`
- express-session
  - Install: `npm i express-session`
- connect-flash
  - Install: `npm i connect-flash`
- bcrypt
  - Install: `npm i bcrypt`
- passport
  - Install: `npm i passport passport-local passport-local-mongoose`