import type { Task } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('http://127.0.0.1:8000/tasks/');
  const tasks = await response.json() as Task[];

  if (response.status === 500) {
    throw error(response.status, 'Something went wrong :(');
  }

	return {
    todos: tasks
	};
};