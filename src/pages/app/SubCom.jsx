import React, { useState, useEffect, useRef } from 'react';



const effect = count => {
	// Update the document title using the browser API
  document.title = `You clicked ${count} times`;
  return () => document.title = 'clear'
};


 export default ({change}) => {
	let [count, setCount] = useState(2);
	const click = e => {
		count++;
		change(count);
		setCount(count);
	};
	useEffect(effect.bind(null, count));
	const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
	return <React.Fragment>
		<div onClick={click}>
			{count}
			<input ref={inputEl} type="text" />
			<button onClick={onButtonClick}>Focus the input</button>
		</div>
    </React.Fragment>
}


