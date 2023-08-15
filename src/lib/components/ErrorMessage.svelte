<script lang="ts">
    import { getContext } from "svelte";
    import { FORM_CONTEXT_KEY, type FormStore } from "../stores/form";

    export let name: string;

    const formStore = getContext<FormStore>(FORM_CONTEXT_KEY);
    $: hasError = false;
    $: message = "";

    $: if ($formStore.errors.length > 0) {
        const fieldError = $formStore.errors.find((e) => e.field === name);

        hasError = !!fieldError;
        message = fieldError?.message ?? "";
    }
</script>

{#if hasError}
    <div class="error-message">
        <p>{message}</p>
    </div>
{/if}

<style>
    .error-message {
        color: red;
        font-weight: bold;
    }
</style>
