<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h1>Login page</h1>
<form>
    <input type="email" name="email" placeholder="john@google.com" />
    <input type="password" name="password" />
    <button type="submit">Login</button>
</form>
