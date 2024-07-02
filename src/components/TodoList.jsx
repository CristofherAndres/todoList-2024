import {Fragment, useState, useRef} from 'react';

/* Importamos id para las tareas, unico y aleatorio */

import uuid4 from 'uuid4';

import TodoItem from './TodoItem';

const TodoList = () => {
	const [todos, setTodos] = useState([
		{id: 1, tarea: 'Estudiar React', estado: false},
		{id: 2, tarea: 'Hacer la compra', estado: true},
		{id: 3, tarea: 'Llamar a mamá', estado: false},
		{id: 4, tarea: 'Sacar al perro', estado: true},
	]);

	const agregarTarea = () => {
		const tarea = tareaRef.current.value.trim();
		if (tarea === '') return;
		setTodos((prevTodos) => {
			const nuevaTarea = {
				id: uuid4(),
				tarea: tarea,
				estado: false,
			};
			return [...prevTodos, nuevaTarea];
		});

		tareaRef.current.value = null;
	};

	//Definir el tareaRef
	const tareaRef = useRef();

	return (
		<Fragment>
			<h1 className="display-5 my-3">Lista de tareas 😎✔️ </h1>

			<div className="input-group my-5">
				<input
					type="text"
					className="form-control"
					placeholder="Ingrese una tarea"
					ref={tareaRef}
				/>
				<button className="btn btn-primary ms-2" onClick={agregarTarea}>
					<i className="bi bi-patch-plus"></i>
				</button>
				<button className="btn btn-danger ms-2">
					<i className="bi bi-trash"></i>
				</button>
			</div>

			<ul className="list-group my-5">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
		</Fragment>
	);
};

export default TodoList;
