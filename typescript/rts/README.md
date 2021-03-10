# React + Typescript + Redux

Mini exercises using React, Typescript, and Redux

### Initialize project with react-create-app
- Run: `npx create-react-app rts --template typescript --use-npm`
- Create a React project using create-react-app

## TYPES AROUND PROPS AND STATE

### Explicit component type annotations
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

### Annotations with children
- The first approach cannot directly receive children unless manually add an annotation to ChildProps interface
- The second approach can receive children prop. `React.FC` does expect to receive a children prop

### State with typescript
- Whenever we make use of state inside React, we can put in a default value. If TS can figure out what type of that value is, we won't get an error
- If we put any default value where type inference doesn't work, we need to specify the actual type for that piece of state. For example, if we initialize our state to be an empty array. TS can't figure what type of value this empty array will hold. So we need to annotate this piece of state to `useState<string[]>([])` to indicate that it's an array of strings

### Type Unions in state
- A simple UserSearch app that returns either foundUser or undefined
- Create state with typescript


## TYPES AROUND EVENTS AND REFS

### Inline event handlers
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

### Typing standalone event handlers
- Apply type annotation to an event inside an event handler function
- Type inference will not apply if we define the event function ahead of time and pass down the function to JSX
- Type inference will only applied inside of JSX when we define that callback function directly inline (like the code above)

### Typescript with class components
- The UserSearch app written with class based component
- Must pass in the users array as children props to the UserSearch component

### Applying types to refs
- Create a ref using useRef() hook inside a function component and properly type it with typescript
- When the UserSearch component appears on the screen, the input field is automatically focused allowing user to start typing without having to first click into it
- Whenever we create a ref that is going to refer to some kind of HTML element, we're going to apply a type that's going to describe the type of element that the `inputRef` is passed off to did not get pass down to an html element
- For example, a ref to an input element is of type HTMLInputElement
- If the `inputRef` did not get applied to some html element, then the thing that the `inputRef` is pointing to might be of type null. TS takes this into account
  - `const `inputRef` = useRef<HTMLInputElement | null>(null);`


