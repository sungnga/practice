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