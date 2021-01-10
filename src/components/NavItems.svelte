<script>
    export let selectedNote = null;

    import Button from './Button.svelte';
</script>

<li>
    {#if selectedNote}
        <a
            download={selectedNote.title}
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(selectedNote?.content)}`}
        >
            <Button type="primary" classList="w-full">Download Note</Button>
        </a>
    {/if}
</li>
<li>
    <a href="https://github.com/austincrim/notarize">
        <Button classList="w-full" type="dark">
            <img
                class="inline-block w-8 h-8 mr-1"
                alt="github logo"
                src="/images/github-logo-light.png"
            />
            View Source
        </Button>
    </a>
</li>
<li>
    <Button classList="w-full" type="secondary">Log In</Button>
</li>
