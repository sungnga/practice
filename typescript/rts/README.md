# React + Typescript

Mini exercises of React working with Typescript

### [Initialize project with react-create-app](https://github.com/sungnga/practice/commit/26a767aebb617c416255f2d4b51e82db54777621?ts=2)
- Run: `npx create-react-app rts --template typescript --use-npm`
- Create a React project using create-react-app


## TYPES AROUND PROPS AND STATE

### [Explicit component type annotations](https://github.com/sungnga/practice/commit/bc674414e0d654b4da0ee2fe6255c49871a12bf1?ts=2)
- All React Components can optionally provide these properties
  - propTypes
  - displayName
  - defaultProps
  - contextType
- Typescript doesn't know that we're making a React component, so it thinks that 'Child' will not have these properties
  ```js
  interface ChildProps {
    color: string;
  }

  // first approach
  export const Child1 = ({ color }: ChildProps) => {
    return <div>{color}</div>;
  };

  // second approach
  // Defining a function component with typescript
  export const Child2: React.FC<ChildProps> = ({ color }) => {
    return <div>{color}</div>;
  };
  ```
- By taking the second approach,
  - 'Child2' will be a React function component
  - 'Child2' might have properties assigned to it like 'propTypes' and 'contextTypes'
  - 'Child2' will receive props of type 'ChildProps'

### [Annotations with children](https://github.com/sungnga/practice/commit/17b20a1f0ad1e891d3af03d1fb0cf01b2580f4e0?ts=2)
- The first approach cannot directly receive children unless manually add an annotation to ChildProps interface
- The second approach can receive children prop. `React.FC` does expect to receive a children prop

### [State with typescript](https://github.com/sungnga/practice/commit/feb9e3cf4b0ab6c4db0bf78dd96004d036deadf4?ts=2)
- Whenever we make use of state inside React, we can put in a default value. If TS can figure out what type of that value is, we won't get an error
- If we put any default value where type inference doesn't work, we need to specify the actual type for that piece of state. For example, if we initialize our state to be an empty array. TS can't figure what type of value this empty array will hold. So we need to annotate this piece of state to `useState<string[]>([])` to indicate that it's an array of strings

### [Type Unions in state](https://github.com/sungnga/practice/commit/f0fbfcf656fe3b7232919c9ff427e07709a0eaa9?ts=2)
- A simple UserSearch app that returns either foundUser or undefined
- Create state with typescript


## TYPES AROUND EVENTS AND REFS

### [Inline event handlers](https://github.com/sungnga/practice/commit/dfa885dd1aced2fc0b3fb136a9a045349368bfb9?ts=2)
- We don't get any errors with inline event handlers
  ```ts
  const EventComponent: React.FC = () => {
    return (
      <div>
        <input onChange={(e) => console.log(e)} />
      </div>
    );
  };

  export default EventComponent;
  ```

### [Typing standalone event handlers](https://github.com/sungnga/practice/commit/dfa885dd1aced2fc0b3fb136a9a045349368bfb9?ts=2)
- Apply type annotation to an event inside an event handler function
- Type inference will not apply if we define the event function ahead of time and pass down the function to JSX
- Type inference will only applied inside of JSX when we define that callback function directly inline (like the code above)

### [Typescript with class components](https://github.com/sungnga/practice/commit/5936659f752902992beb811df6a7c0cbd9be28da?ts=2)
- The UserSearch app written with class based component
- Must pass in the users array as children props to the UserSearch component

### [Applying types to refs](https://github.com/sungnga/practice/commit/00aecc3cc20093c9afc906896c89713650a88cfb?ts=2)
- Create a ref using useRef() hook inside a function component and properly type it with typescript
- When the UserSearch component appears on the screen, the input field is automatically focused allowing user to start typing without having to first click into it
- Whenever we create a ref that is going to refer to some kind of HTML element, we're going to apply a type that's going to describe the type of element that the `inputRef` is passed off to did not get pass down to an html element
- For example, a ref to an input element is of type HTMLInputElement
- If the `inputRef` did not get applied to some html element, then the thing that the `inputRef` is pointing to might be of type null. TS takes this into account
  - `const `inputRef` = useRef<HTMLInputElement | null>(null);`

### [Implementing inputRef in useEffect hook](https://github.com/sungnga/practice/commit/3b30433ed3eb1ecb09b3d6b1a9b33d80d045d7c7?ts=2)
- Use useEffect() hook to apply the inputRef when the component first mounts or when the page reloads
- Write a condition that if `!inputRef.current`, meaning that the inputRef hasn't been assigned to an html element, then return early. If there is, call .focus() on it
