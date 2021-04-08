## Notes

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

### [Setting global CSS](https://github.com/sungnga/practice/commit/9ce905be767381f48ce4c539f5908b828ff36c3d#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)

### [Using styled components](https://github.com/sungnga/practice/commit/aeee60675f10568fae88c45ad2f3ce035971cc34#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
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

### [Setting text styles, color variables, and global style](https://github.com/sungnga/practice/commit/3d2c16d6e288ab3558ff01a59e805313dcbda328#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Set text styles in TextStyles.js file
- Set color styles in ColorStyles.js file
- Set global style in GlobalStyle.js file
  - Here we can set background color themes preferences
  - Use the GlobalStyle component in layout.js file

### [Creating a reusable button component](https://github.com/sungnga/practice/commit/ab4f400d1adcc2793acec5f7619c8e6e2902f48e#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Create a PurchaseButton component and render it in the HeroSection component. Pass down the title and subtitle props
- In the PurchaseButton component, receive the title and subtitle props and render their values in the Link button

### [Applying CSS grid to PurchaseButton component](https://github.com/sungnga/practice/commit/a75a5637a4a0e0ea433fd62188a592279f419afb#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)

### [Applying CSS hover, transition, and transform to PurchaseButton component](https://github.com/sungnga/practice/commit/92231b9ecddf2d957c7e534085ba5930020bc72f#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Apply animation to the icon and button on hover state

### [Using advanced CSS selectors and filter property](https://github.com/sungnga/practice/commit/af587d7c071eb99960bdd70891c6a4b6066be8c2#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Apply filter to the icon when hover over the button

### [Adding MockupAnimation component to HeroSection](https://github.com/sungnga/practice/commit/100d801cbd846d9d3f65e8d7cdb0662b7d40c239#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- The MockupAnimation component is placed in the 2nd column of the HeroSection
- To build the MockupAnimation:
  - Create a simple div tag and add a className that holds each mockup animation. There are 5 total
  - For each mockup item, copy the CSS code for the mockup background from Figma file and paste it in the styled component
  - Then add the svg to the mockup `background` property
  - Using position relative and position absolute allow you to place each mockup item exactly where you want it to be in the MockupAnimation component

### [Applying perspective 3-D effects to MockupAnimation component](https://github.com/sungnga/practice/commit/d85c1e25d13a1cf1bae95e5027f4aea12b0343e8#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Apply 3-D perspective to the MockupAnimation and animate it over hover state
- Also apply CSS effects when hover over individual mockup items

### [Adding the Navbar component](https://github.com/sungnga/practice/commit/3646543b8372ee5f6bf370b044ce78df5411c17f#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- The Navbar component is rendered in the Layout component
- Iterate over the menuData array and display each menu item as a Link

### [Styling the Navbar and using CSS grid](https://github.com/sungnga/practice/commit/b2a51b58e79a6459400ea28f7c64c99db3629205#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)

### [Passing props to styled components](https://github.com/sungnga/practice/commit/a9a8c7f2bcf466e7087a2f23657c4f886e52fa72#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Move the Navbar menu item Links into a separate component called MenuButton
- Render this component when iterating over the menuData array in the Navbar component
- Just like a React component, we can pass props to styled components and apply different CSS styles
  - For example, if there's no title props passed to the MenuItem styled component, we don't add an additional 10px gap to the column
  - Another example is, we dynamically adjust the number of columns in Navbar depending on the length of the menuData array

### [Building the MenuTooltip component, toggling the MenuTooltip in Navbar](https://github.com/sungnga/practice/commit/378883de490bf50edd4390a5df4b31659993b4c1#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
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

### [Creating a wave background in WaveBackground component](https://github.com/sungnga/practice/commit/78d3a9a9e331d0cdceb39acf6b299d86873bcc4e#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- The WaveBackground component is rendered in the HeroSection component and inside of the Wrapper styled component
- In the WaveBackground component:
  - Move the `background` property from the HeroSection component to this component
  - Position the three waves using inline styling
  - Set the wave background and the linear-gradient background behind all the texts and graphics in the HeroSection using the z-index property
- NOTE: the CSS blur effect doesn't work well in all browsers
- To solve this issue, export as a png instead of an svg when using a blur effect
- The size of a png file is much bigger than an svg. Use a tool called ImageOptim to bring down the file size
- Export the wave1 background as a png in Figma, use ImageOptim to reduce the file size, and use it in the WaveBackground component

### [Applying CSS keyframes animation with delay to HeroSection](https://github.com/sungnga/practice/commit/ec8db0620447e7b1dc7b279a2a6cd132d62a1c35#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Animate each child element at different delay time
- The children are the Title, Description, and PurchaseButton styled components

### [Apply gradient to texts using background masking technique](https://github.com/sungnga/practice/commit/be64ed63df9f4feaa98a0617833492911e30d2be#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)

### [Applying media queries, adding hamburgerMenu icon](https://github.com/sungnga/practice/commit/ab767ffd413891746414edfe72db59f6edd192e7#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)

### [Changing wave background for dark mode](https://github.com/sungnga/practice/commit/4104a0728c80fe7415590d845751ec8987d3e918#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- Reusing a previously declared styled component to add more customization

### [Dismissing the tooltip menu using useEffect hook](https://github.com/sungnga/practice/commit/80221a05ab28cacaaef1f223730352c349b0b63f#diff-6eda8ee35420e362720377cf501f22543bc7b26493177980d86d3f1f131ccfe3)
- We want to dismiss the tooltip menu when a user clicks anywhere on the page. We also want to dismiss it when the Account menuButton is clicked on, but does not dismiss when clicking inside the tooltip menu itself
- Use useRef() hook to reference different items and elements. We only want to dismiss the tooltip menu anywhere the page is clicked except the tooltip menu itself and the menuWrapper which contains the menu items
- In useEffect() hook, we need to manually unmount the eventListener so it doesn't persist and continuously firing