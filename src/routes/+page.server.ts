import client from '$lib/server';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

//gets all tasks
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
	const result = await client.GET('/tasks/', {
		params: { header: { userID: locals.user.id } }
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
	//deletes all tasks for the user
	delete: async ({ locals }) => {
		if (!locals.user) {
			redirect(302, '/login');
		}
		const result = await client.DELETE('/tasks/', {
			params: { header: { userID: locals.user.id } }
		});

		if (result.data) {
			return { success: true };
		}
	},

	// add new task for the user
	create: async ({ locals, request }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();
		if (!locals.user) {
			redirect(302, '/login');
		}

		if (!title || !description) {
			return fail(400, { title, description: description, missing: true });
		}

		await client.POST('/tasks/', {
			params: {
				header: {
					userID: locals.user.id
				}
			},
			body: {
				title,
				description,
				completed: false,
				urgent: false
			}
		});
	},

	//delete a specific task by its id
	deleteTask: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formData.get('_id')?.toString();
		if (!locals.user) {
			redirect(302, '/login');
		}
		if (!id) {
			return fail(400, { id, missing: true });
		}
		await client.DELETE('/tasks/{id}', {
			params: {
				path: { id },
				header: { userID: locals.user.id }
			}
		});
	},

	//update a specific task title or description by its id
	updateTask: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('_id')?.toString();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();
		const completed = formData.get('completed') === 'on' ? true : false;
		if (!locals.user) {
			redirect(302, '/login');
		}
		if (title === null || description === null || !id) {
			return fail(400, { id, title, description, missing: true });
		}
		await client.PATCH(`/tasks/{id}`, {
			body: {
				title,
				description,
				completed
			},
			params: {
				path: { id },
				header: { userID: locals.user.id }
			}
		});

		return { success: true };
	}
} satisfies Actions;
