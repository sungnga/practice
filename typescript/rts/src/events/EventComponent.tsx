const EventComponent: React.FC = () => {
	// note that 'ChangeEvent' is only one kind of event
	// there are others
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event);
	};

	const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		console.log(event);
	};

	return (
		<div>
			<input onChange={onChange} />
			<div draggable onDragStart={onDragStart}>
				Drag Me!
			</div>
		</div>
	);
};

export default EventComponent;
