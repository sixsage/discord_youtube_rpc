interface PropExample {
	num: number;
	num2: number;
}

function SearchBar(props: PropExample) {
	return <div> { props.num + props.num2 } </div>;
}

export default SearchBar;
