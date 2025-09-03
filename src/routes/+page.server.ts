import client from '$lib/server';
import type { PageServerLoad, Actions } from './$types';

//gets all tasks 
export const load: PageServerLoad = async ({ fetch }) => {
  const result = await client.GET("/tasks/");
  let todos: typeof result.data = [];
  let success = false;

  if (result.data) {
    todos = result.data;
    success = true;
  }

	return {
    todos,
    success
	};
};

//deletes all tasks 
export const actions = {
	delete: async (event) => {
		const result = await client.DELETE("/tasks/")
    let todos: typeof result.data = [];
    let success = false;

    if (result.data) {
      todos = result.data;
      success = true;
    }

    return {
      todos,
      success
    };
	}
} satisfies Actions;

//export const load: PageServerLoad = async ({ fetch }) => {
  // const {data, error} = await client.GET("/tasks/")
  // const response = await fetch('http://127.0.0.1:8000/tasks/', {
  //   method: 'GET'
  // });
  // const tasks = await response.json() as Task[];

  // if (response.status === 500) {
  //   error(response.status, 'Something went wrong :(');
  // }