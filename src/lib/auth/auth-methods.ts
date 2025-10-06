import { goto } from "$app/navigation";
import { Loading } from "carbon-components-svelte";
import { authClient } from "./auth-client";

export async function signIn(email: string, password: string){
    const { data, error } = await authClient.signIn.email({
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
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {onRequest: (ctx) => {
            //show loading
            console.log("Loading...");
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            goto("/");
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    //callbacks
})

}

export async function signUp(email: string, password: string , name: string, image?: string){
    const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
            console.log("Loading...");
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            alert("Sign up successful!");
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
});

}

export async function signOut(){
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                goto("/login");   
            },
            onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
        },
        });
}; 