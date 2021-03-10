# React + Typescript + Redux

A mini exercise using React, Typescript, and Redux together

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
