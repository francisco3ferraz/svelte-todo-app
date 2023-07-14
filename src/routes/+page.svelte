<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
		<div class="mb-4">
			<h1 class="text-grey-darkest">Todo List</h1>
			<form class="flex mt-4" method="post" action="?/create">
				<input
					name="todo"
					id="todo"
					class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
					placeholder="Add Todo"
				/>
				<button
					type="submit"
					class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
				>Add</button>
			</form>
		</div>
		<div>
			{#each data.availableTodos as todo (todo.id)}
				<div class="flex mt-4 bg-white rounded-lg w-[500px] p-4 shadow-lg flex-col">
					<h3 class="flex flex-row items-center gap-x-2 {todo.completed && 'line-through'}">
						<span
							class="w-[12px] h-[12px] rounded-full inline-block {todo.completed
								? 'bg-green-500'
								: 'bg-red-500'}"
						/>
						<span class="font-bold text-lg">{todo.title}</span>
					</h3>
					<p class="font-light text-sm text-neutral-600 {todo.completed && 'line-through'}">
						{todo.description}
					</p>
					<div class="flex flex-row justify-end gap-x-4 mt-4">
						<form
							method="POST"
							action="?/complete"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.status === 200) {
										// update the todo to be completed
										const todoIdx = data.availableTodos.findIndex((t) => t.id === todo.id);
										data.availableTodos[todoIdx].completed = true;
									}
								};
							}}
						>
							<input class="hidden" name="id" value={todo.id} />
							<button
								class="border-2 p-1 border-blue-600 rounded-lg text-blue-600 disabled:border-gray-600 disabled:text-gray-600"
								disabled={todo.completed}
								type="submit">Complete</button
							>
						</form>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								return async ({ result }) => {
									if (result.status === 200) {
										data.availableTodos = data.availableTodos.filter((t) => t.id !== todo.id);
									}
								};
							}}
						>
							<input class="hidden" name="id" value={todo.id} />
							<button class="border-2 p-1 border-red-600 rounded-lg text-red-600" type="submit">
								Delete</button
							>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
