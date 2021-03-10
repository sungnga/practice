import { ChildAsFC } from './Child';

const Parent = () => {
	return (
		<ChildAsFC color='red' onClick={() => console.log('Clicked')}>
			Content between the opening and closing tag is children
		</ChildAsFC>
	);
};

export default Parent;
