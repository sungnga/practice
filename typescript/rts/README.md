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