import {Fragment, useState, useRef, useEffect} from 'react';

/* Importamos id para las tareas, unico y aleatorio */

import uuid4 from 'uuid4';

import TodoItem from './TodoItem';

const TodoList = () => {
	const [todos, setTodos] = useState([
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

	const cambiarEstadoTarea = (id) => {
		/* Obtener todos los elementos del array */
		const newTodos = [...todos];
		/* Buscar el todo que se necesita cambiar de estado dentro del array */
		const todo = newTodos.find((todo) => todo.id === id);
		/* Cambiar el estado de todo */
		todo.estado = !todo.estado;
		setTodos(newTodos);
	};

	const eliminarTareasCompletas = () => {
		/* Filtrar las tareas que no esten completas */
		const tareas = todos.filter((todo) => !todo.estado);
		setTodos(tareas);
	};

	/* Contar las tareas desmarcadas o con estado false */
	const contadorTareas = () => {
		return todos.filter((todo) => !todo.estado).length;
	};

	/* Resumen de las tareas, mostrado un color segun la cantidad de tareas pendientes */
	const ResumenTareas = () => {
		const cantidad = contadorTareas();
		if (cantidad === 0) {
			return (
				<div className="alert alert-success mt-3 text-center">
					Felicidades, No hay tareas pendientes 😎✔️
				</div>
			);
		}
		if (cantidad === 1) {
			return (
				<div className="alert alert-info mt-3 text-center">
					Te queda solamente 1 tarea pendiente 😎✔️
				</div>
			);
		}
		if (cantidad > 9) {
			return (
				<div className="alert alert-danger mt-3 text-center">
					Te quedan {cantidad} tareas pendientes ☹️😱
				</div>
			);
		}
		return (
			<div className="alert alert-warning mt-3 text-center">
				Te quedan {cantidad} tareas pendientes 😅
			</div>
		);
	};
	//Definir el tareaRef
	const tareaRef = useRef();
	
	/* LocalStorage */
	const KEY = 'todos'
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(KEY));
		if (storedTodos){
			setTodos(storedTodos)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(todos));
	}, [todos]);

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
				<button
					className="btn btn-danger ms-2"
					onClick={eliminarTareasCompletas}>
					<i className="bi bi-trash"></i>
				</button>
			</div>

			<ul className="list-group my-5">
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						cambiarEstado={cambiarEstadoTarea}
					/>
				))}
			</ul>
			<ResumenTareas />
		</Fragment>
	);
};

export default TodoList;
