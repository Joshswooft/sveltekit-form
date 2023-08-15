import { writable, type Writable } from "svelte/store";

export type FormData = {
    name: string;
    errors: {
        field: string | number;
        message: string;
    }[]
}

export type FormStore = Pick<Writable<FormData>, "subscribe"> & {
    setErrors: (errors: FormData["errors"]) => void;
}

export const FORM_CONTEXT_KEY = "form"

export function formStore(initialData: FormData): FormStore {
    const form = writable<FormData>(initialData);

    return {
        ...form,
        setErrors: (errors: FormData["errors"]) => form.update(existing => ({
            ...existing,
            errors
        }))
    }

}