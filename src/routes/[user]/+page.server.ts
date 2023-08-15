import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const session = await locals.getSession();

    if (!session) {
        throw redirect(303, "/login")
    }

    return {
        user: params.user,
    };
}) satisfies PageServerLoad;