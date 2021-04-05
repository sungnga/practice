### Project starter file structure:
```
  ├── src
  ├──── components
  ├────── layout
  ├──────── layout.css
  ├──────── layout.js
  ├──────── seo.js
  ├──── pages
  ├────── 404.js
  ├────── index.js
  ├── static
  ├──── images
  ├── gatsby-browser.js
  ├── gatsby-config.js
  ├── gatsby-node.js
  ├── gatsby-ssr.js
  ├── package-lock.json
  ├── package.json
  └── README.md
```

### CSS reset
- Meyerweb reset: https://meyerweb.com/eric/tools/css/reset/
- Use CSS reset to overwrite Gatsby default CSS styles in layout.css file

### Setting global CSS

### Using styled components
- Install styled-components: `npm i styled-components`
- Import: `import styled from 'styled-components'`
- Use:
  ``` js
  const Wrapper = styled.div`
    /* css styles here */
  `
  ```
- Install gatsby-plugin-styled-components and configure it
  - `npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components`

### Setting text styles, color variables, and global style
- Set text styles in TextStyles.js file
- Set color styles in ColorStyles.js file
- Set global style in GlobalStyle.js file
  - Here we can set background color themes preferences
  - Use the GlobalStyle component in layout.js file

### Creating a reusable button component
- Create a PurchaseButton component and render it in the HeroSection component. Pass down the title and subtitle props
- In the PurchaseButton component, receive the title and subtitle props and render their values in the Link button

### Applying CSS grid to PurchaseButton component

### Applying CSS hover, transition, and transform to PurchaseButton component
- Apply animation to the icon and button on hover state

### Using advanced CSS selectors and filter property
- Apply filter to the icon when hover over the button

### Adding MockupAnimation component to HeroSection
- The MockupAnimation component is placed in the 2nd column of the HeroSection
- To build the MockupAnimation:
  - Create a simple div tag and add a className that holds each mockup animation. There are 5 total
  - For each mockup item, copy the CSS code for the mockup background from Figma file and paste it in the styled component
  - Then add the svg to the mockup `background` property
  - Using position relative and position absolute allow you to place each mockup item exactly where you want it to be in the MockupAnimation component

### Applying perspective 3-D effects to MockupAnimation component
- Apply 3-D perspective to the MockupAnimation and animate it over hover state
- Also apply CSS effects when hover over individual mockup items

### Adding the Navbar component
- The Navbar component is rendered in the Layout component
- Iterate over the menuData array and display each menu item as a Link

### Styling the Navbar and using CSS grid

### Passing props to styled components
- Move the Navbar menu item Links into a separate component called MenuButton
- Render this component when iterating over the menuData array in the Navbar component
- Just like a React component, we can pass props to styled components and apply different CSS styles
  - For example, if there's no title props passed to the MenuItem styled component, we don't add an additional 10px gap to the column
  - Another example is, we dynamically adjust the number of columns in Navbar depending on the length of the menuData array

### Building the MenuTooltip component, toggling the MenuTooltip in Navbar
- First, in the Navbar component:
  - Create a piece of state called isOpen and initialize it to false
  - For the account MenuButton, pass down an additional onClick event as props. This onClick props executes the handleClick function as a callback. So when the account MenuButton is clicked, isOpen state is toggled
  - Write a handleClick function that toggles the isOpen state from false to true and vise versa
    - This function also receives an event object as an argument
    - Call event.preventDefault() to prevent the default onClick behavior, which takes you to the /account page
  - In the return section, render the MenuTooltip component and pass down the isOpen state as props
- In the MenuButton component:
  - Receive the onClick props from the Navbar parent component
  - In the Link component, add an onClick event handler and set it to the onClick props
  - So this onClick props is only applied to the account MenuButton item. When this button is clicked, it toggles the isOpen state and the MenuTooltip component will be visible or hidden depending on this state
- In the MenuTooltip component:
  - Receive the isOpen props from the Navbar parent component
  - Iterate over the tooltipData array and display each item in a MenuButton component. Pass down to it the item props
  - Pass down the isOpen state as props to the Wrapper styled component
  - In the Wrapper component, set the value of visibility property to `visible` if isOpen state is true. Else, set the value to `hidden`
  - Finally, add styles to the component using CSS and CSS grid

### Creating a wave background in WaveBackground component
- The WaveBackground component is rendered in the HeroSection component and inside of the Wrapper styled component
- In the WaveBackground component:
  - Move the `background` property from the HeroSection component to this component
  - Position the three waves using inline styling
  - Set the wave background and the linear-gradient background behind all the texts and graphics in the HeroSection using the z-index property
- NOTE: the CSS blur effect doesn't work well in all browsers
- To solve this issue, export as a png instead of an svg when using a blur effect
- The size of a png file is much bigger than an svg. Use a tool called ImageOptim to bring down the file size
- Export the wave1 background as a png in Figma, use ImageOptim to reduce the file size, and use it in the WaveBackground component

### Applying CSS keyframes animation with delay to HeroSection
- Animate each child element at different delay time
- The children are the Title, Description, and PurchaseButton styled components

### Apply gradient to texts using background masking technique

### Applying media queries, adding hamburgerMenu icon