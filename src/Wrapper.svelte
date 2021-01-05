<script>
    import GlobalCss from "./GlobalCss.svelte";
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import App from "./App.svelte";

    const client = new QueryClient();
</script>

<GlobalCss />

<QueryClientProvider {client}>
    <App />
</QueryClientProvider>
