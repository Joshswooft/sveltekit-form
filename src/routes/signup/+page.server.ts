import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { nanoid } from 'nanoid';
import { z } from "zod";

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

const registerUserSchema = z.object({
    username: z.string().trim().min(3, "username must be 3 characters long").max(60),
    email: z.string().email("email is not valid"),
    password: z.string().min(8)
})

export const actions: Actions = {
    default: async (event) => {
        console.log("register endpoint")

        const formData = Object.fromEntries(await event.request.formData());
        // use safeParse as it doesn't throw error
        const parsedData = registerUserSchema.safeParse(formData);

        console.log("parsed data: ", parsedData)

        if (!parsedData.success) {

            const errors = parsedData.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                };
            });

            console.log("errors: ", errors)

            return fail(400, { error: true, errors: errors })
        }


        const params = { ...parsedData.data }

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