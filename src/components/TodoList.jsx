import {Fragment, useState} from 'react';

import TodoItem from './TodoItem';

const TodoList = () => {
	const [todos, setTodos] = useState(
		[
			{id: 1, tarea: 'Estudiar React'},
			{id: 2, tarea: 'Hacer la compra'},
			{id: 3, tarea: 'Llamar a mamá'},
			{id: 4, tarea: 'Sacar al perro'},
			{id: 5, tarea: 'Hacer la comida'},
			{id: 6, tarea: 'Hacer la cama'},
			{id: 7, tarea: 'Lavar los platos'},
			{id: 8, tarea: 'Hacer ejercicio'}
		]
	)
	return (
		<Fragment>
				<h1 className="display-5 my-3">Lista de tareas 😎✔️ </h1>

                <div className='input-group my-5'>
                    <input type="text" className='form-control' placeholder='Ingrese una tarea' />
                    <button className='btn btn-primary ms-2'><i className="bi bi-patch-plus"></i></button>
                    <button className='btn btn-danger ms-2'><i className="bi bi-trash"></i></button>
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
