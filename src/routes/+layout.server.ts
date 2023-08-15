import type { RequestEvent } from "@sveltejs/kit";

export const load = (async ({ locals }: RequestEvent) => {

    const session = await locals.getSession();

    console.log("session data: ", session)

    return {
        user: session?.user
    };
})