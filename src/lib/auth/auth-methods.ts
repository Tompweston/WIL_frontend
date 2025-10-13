import { goto, invalidateAll } from '$app/navigation';
import { authClient } from './auth-client';

// sign in function
export async function signIn(email: string, password: string) {
	await authClient.signIn.email(
		{
			/**
			 * The user email
			 */
			email,
			/**
			 * The user password
			 */
			password,
			/**
			 * A URL to redirect to after the user verifies their email (optional)
			 */
			callbackURL: '/',
			/**
			 * remember the user session after the browser is closed.
			 * @default true
			 */
			rememberMe: false
		},
		{
			onRequest: () => {
				//show loading
				console.log('Loading...');
			},
			onSuccess: () => {
				//redirect to the dashboard or sign in page
				goto('/');
			},
			onError: (ctx) => {
				// display the error message
				alert(ctx.error.message);
			}
		}
	);
}

// sign up function
export async function signUp(email: string, password: string, name: string) {
	await authClient.signUp.email(
		{
			email, // user email address
			password, // user password -> min 8 characters by default
			name, // user display name
			callbackURL: '/' // A URL to redirect to after the user verifies their email (optional)
		},
		{
			onRequest: () => {
				//show loading
				console.log('Loading...');
			},
			onSuccess: () => {
				//redirect to the dashboard or sign in page
				alert('Sign up successful!');
			},
			onError: (ctx) => {
				// display the error message
				alert(ctx.error.message);
			}
		}
	);
} // sign out function
export async function signOut() {
	await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				invalidateAll();
				goto('/login');
			},
			onError: (ctx) => {
				// display the error message
				alert(ctx.error.message);
			}
		}
	});
}
