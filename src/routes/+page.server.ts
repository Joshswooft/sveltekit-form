import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, parent }) => {

    const session = await locals.getSession()
    if (!session) {
        redirect(303, "/login")
    }

    // parent in this case is our +layout.server.ts
    const { user } = await parent();

    return {
        user
    };

});