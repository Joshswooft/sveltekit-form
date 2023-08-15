import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { nanoid } from 'nanoid';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;



type RegisterParams = {
    username: string;
    email: string;
    password: string;
}

// creates a new account for the user
function register(params: RegisterParams) {
    console.log("created user: ", params.username)

    return true;
}


// in real life the server would create a session out of the user details
// the session would be normally stored in a database
function createSession(params: RegisterParams): string {
    const sessionID = nanoid();
    return sessionID
}

export const actions: Actions = {
    default: async (event) => {
        console.log("register endpoint")

        const data = await event.request.formData();


        const email = data.get("email")?.toString();
        const username = data.get("username")?.toString();
        const password = data.get("password")?.toString();

        console.log("posted form data: ", { username, email, password });

        if (typeof email === "undefined" || !email.includes("@")) {
            return fail(400, { error: true, errors: [{ field: "email", message: "email is invalid" }] })
        }

        if (typeof username === "undefined" || username.length < 3) {
            return fail(400, { error: true, errors: [{ field: "username", message: "username cant be less than 3 characters long" }] })
        }

        if (typeof password === "undefined" || password.length < 8) {
            return fail(400, { error: true, errors: [{ field: "password", message: "password cant be less than 8 characters long" }] })
        }

        const params = { username: username!, email: email!, password: password! }

        try {
            register(params);

            const sessionID = createSession(params)
            event.cookies.set("session", sessionID, {
                path: "/"   // this is done to have access throughout the app regardless of path
            })

        }
        catch (err) {
            console.error(err)
            return fail(500, { error: true, message: "Failed to register user, please try again later. " })
        }

        throw redirect(301, `/${username}`)

    }
}