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
  
