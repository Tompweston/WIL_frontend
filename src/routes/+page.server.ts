import client from '$lib/server';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';


//gets all tasks
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
	const result = await client.GET('/{user_id}', {
		params: { path: { user_id: locals.user.id } }
	});
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
		const result = await client.DELETE('/');
		let todos: typeof result.data = [];
		let success = false;

		if (result.data) {
			todos = result.data;
			success = true;
		}
	},

	// add new task
	create: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();
		const user_id = formData.get('user_id')?.toString();


		if (!title || !description) {
			return fail(400, { title, description: description, missing: true });
		}

		const result = await client.POST('/', {
			body: {
				title,
				description,
				completed: false,
				urgent: false,
				user_id,
			}
		});
	},

	//delete a specific task by its id
	deleteTask: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('_id')?.toString();
		if (!id) {
			return fail(400, { id, missing: true });
		}
		const result = await client.DELETE('/{id}', {
			params: { path: { id } }
		});
	},

	//update a specific task by its id
	updateCompleted: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id')?.toString();
		const completed = formData.get('completed') === 'on' ? true : false;

		if (completed === null || !id) {
			return fail(400, { id, completed, missing: true });
		}
		const result = await client.PATCH(`/{id}`, {
			body: {
				completed
			},
			params: { path: { id } }
		});

		return { success: true };
	},

	//update a specific task title or description by its id
	updateTask: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('_id')?.toString();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();
		if (title === null || description === null || !id) {
			return fail(400, { id, title, description, missing: true });
		}
		const result = await client.PATCH(`/{id}`, {
			body: {
				title,
				description
			},
			params: { path: { id } }
		});

		return { success: true };
	}
} satisfies Actions;
