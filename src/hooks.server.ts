import type { Handle, RequestEvent } from "@sveltejs/kit";

export type Session = {
    user: string;
    email: string;
    authToken: string;
}

async function getSession(event: RequestEvent): Promise<Session | null> {
    const sessionId = event.cookies.get("session");
    // getting the session is not enough, we should verify it is correct
    if (!sessionId) {
        return null;
    }

    // ... logic to get session data from somewhere

    return {
        user: "John",
        email: "john@google.com",
        authToken: "some auth token which can be used in API endpoints"
    }

}

export const handle: Handle = ({ event, resolve }) => {
    console.log("called before request")
    event.locals.getSession = () => getSession(event);

    return resolve(event)
}