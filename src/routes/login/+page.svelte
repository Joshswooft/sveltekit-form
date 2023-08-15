<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<form>
    <input type="email" name="email" placeholder="john@google.com" />
    <input type="password" name="password" />
    <button type="submit">Login</button>
</form>
