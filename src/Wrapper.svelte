<script>
    import Tailwindcss from "./Tailwindcss.svelte";
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import App from "./App.svelte";

    const client = new QueryClient();
</script>

<Tailwindcss />

<QueryClientProvider {client}>
    <App />
</QueryClientProvider>
