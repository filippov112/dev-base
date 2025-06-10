#example
1. Установить Node.js и npm.
2. Создать проект Vue:
    ```sh
    npm create vue@latest vue-todo-app
    cd vue-todo-app
    npm install
    ```

3. Установка Axios
```sh
npm install axios
```

1. Создание компонентов
	- **App.vue**:
		```js
		<template>
		  <div>
		    <h1>TODO List</h1>
		    <TodoForm @add-todo="addTodo" />
		    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
		  </div>
		</template>
		
		<script>
		import axios from 'axios';
		import TodoForm from './components/TodoForm.vue';
		import TodoList from './components/TodoList.vue';
		
		export default {
		  components: { TodoForm, TodoList },
		  data() {
		    return { todos: [] };
		  },
		  methods: {
		    async fetchTodos() {
		      const response = await axios.get('http://localhost:5000/api/todos');
		      this.todos = response.data;
		    },
		    async addTodo(title) {
		      const response = await axios.post('http://localhost:5000/api/todos', { title, isCompleted: false });
		      this.todos.push(response.data);
		    },
		    async toggleTodo(todo) {
		      todo.isCompleted = !todo.isCompleted;
		      await axios.put(`http://localhost:5000/api/todos/${todo.id}`, todo);
		    },
		    async deleteTodo(id) {
		      await axios.delete(`http://localhost:5000/api/todos/${id}`);
		      this.todos = this.todos.filter(todo => todo.id !== id);
		    }
		  },
		  mounted() {
		    this.fetchTodos();
		  }
		};
		</script>
		```

	- **TodoForm.vue**:
		```js
		<template>
		  <form @submit.prevent="submitTodo">
		    <input v-model="title" placeholder="Добавить задачу" />
		    <button type="submit">Добавить</button>
		  </form>
		</template>
		
		<script>
		export default {
		  data() { return { title: '' }; },
		  methods: {
		    submitTodo() {
		      if (this.title.trim()) {
		        this.$emit('add-todo', this.title);
		        this.title = '';
		      }
		    }
		  }
		};
		</script>
		```

	- **TodoList.vue**:
		```js
		<template>
		  <ul>
		    <li v-for="todo in todos" :key="todo.id">
		      <input type="checkbox" v-model="todo.isCompleted" @change="$emit('toggle-todo', todo)" />
		      <span :class="{ completed: todo.isCompleted }">{{ todo.title }}</span>
		      <button @click="$emit('delete-todo', todo.id)">Удалить</button>
		    </li>
		  </ul>
		</template>
		
		<script>
		export default { props: ['todos'] };
		</script>
		
		<style>
		.completed { text-decoration: line-through; }
		</style>
		```
    
5. Запустить dev-сервер:
    ```sh
    npm install
    npm run dev
    ```
