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

**Border properties:**
- border-width - controls the thickness of the border
- border-color - controls the color of the border
- border-style - controls the line style - dashed, solid, dotted, etc.
- Use `box-sizing: border-box` to set the border properties to fit inside the border box
  - If an element has a width of 100px and a border-width of 5px, the content inside the border property is 90px
- The border property is the border shorthand property to set the border-width, border-color, and border-style all at once
  ```css
  color: 2px dashed green;
  ```
- border-radius - rounds the corners of an element's outer border edge

**Display property:**
- INLINE
  - Width & Height are ignored.
  - Margin & Padding push elements away horizontally but not vertically
- BLOCK
  - Block elements break the flow of a document
  - Width, Height, Margin, & Padding are respected
- INLINE-BLOCK
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



















## RESOURCES
- Color inspiration: www.coolers.co/palettes/trending