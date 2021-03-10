interface ChildProps {
	color: string;
}

// first approach
export const Child = ({ color }: ChildProps) => {
	return <div>{color}</div>;
};

// second approach
// Defining a function component with typescript
export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {
	return <div>{color}</div>;
};
