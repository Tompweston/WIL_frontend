import client from '$lib/server';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

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

export const actions = {
  //deletes all tasks 
	delete: async () => {
    const result = await client.DELETE("/tasks/")
    let todos: typeof result.data = [];
    let success = false;

    if (result.data) {
      todos = result.data;
      success = true;
    }

  // after deleting, redirect to base 
  throw redirect(303, '/');
	},  
  // add new task 
  create: async (event) => {
    const formData = await event.request.formData();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();

    if (!title || !description) {
      return fail(400, { title, description: description, missing: true });
    }

    const result = await client.POST("/tasks/", {
        body: {
          title,
          description,
          completed: false,
          urgent: false,  
          userID: "Tom"
        }
      })
    // after creating, redirect to base 
    throw redirect(303, '/');
  },

  deleteTask: async (event) => {
    const formData = await event.request.formData();
    const id = formData.get('_id')?.toString();
    if (!id) {
      return fail(400, { id, missing: true });
    }
    const result = await client.DELETE('/tasks/{id}', { 
      params: { path: { id } } 
    });
      // after deleting, redirect to base
      throw redirect(303, '/');
  }

} satisfies Actions;
