interface ChildProps {
	color: string;
	onClick: () => void;
}

// first approach
// this component does not expect any children
// cannot directly receive children
// unless manually add annotations to interface
export const Child = ({ color, onClick }: ChildProps) => {
	return (
		<div>
			{color}
			<button onClick={onClick}>Click me</button>
		</div>
	);
};

// second approach
// Defining a function component with typescript
// can receive children prop
export const ChildAsFC: React.FC<ChildProps> = ({
	color,
	onClick,
	children
}) => {
	return (
		<div>
			{children}
			{color}
			<button onClick={onClick}>Click me</button>
		</div>
	);
};
