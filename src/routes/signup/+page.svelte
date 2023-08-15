<script lang="ts">
    import { enhance } from "$app/forms";
    import { formStore, FORM_CONTEXT_KEY } from "$lib/stores/form";
    import { setContext } from "svelte";
    import type { ActionData } from "../$types";
    import ErrorMessage from "$lib/components/ErrorMessage.svelte";

    // form data that comes back when an action is submitted
    // must be named form - just one of those svelte weirdnesses
    export let form: ActionData;

    const formStoreCreate = formStore({ name: "my-signup-form", errors: [] });

    setContext(FORM_CONTEXT_KEY, formStoreCreate);

    function onFormChange(form: ActionData) {
        formStoreCreate.setErrors(form?.errors ?? []);
    }

    $: console.log("form: ", form);
    $: onFormChange(form);
</script>

<form method="post" use:enhance>
    <label for="username">Username: </label>
    <input type="text" name="username" placeholder="JohnSnow" />
    <ErrorMessage name="username" />

    <label for="email">Email: </label>
    <input type="email" name="email" placeholder="john@google.com" />
    <ErrorMessage name="email" />

    <label for="password">Password: </label>
    <input type="password" name="password" />
    <ErrorMessage name="password" />

    <button type="submit">Register</button>
</form>
