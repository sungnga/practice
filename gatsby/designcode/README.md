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

### Using advanced CSS selectors and filter property