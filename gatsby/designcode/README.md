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