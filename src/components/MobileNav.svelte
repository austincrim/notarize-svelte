<script>
    import { fade } from 'svelte/transition';

    let expanded = false;
</script>

<nav
    class="flex items-center justify-between w-full h-20 p-4 shadow-lg lg:hidden"
>
    <div class="flex items-center justify-center">
        <svg
            class="w-6 h-6 mr-2 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
        </svg>
        <h1 class="font-serif text-3xl font-bold text-green-400">Notarize</h1>
    </div>
    <div>
        <button on:click={() => (expanded = !expanded)}>
            <svg
                class="w-8 h-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </button>
    </div>
    {#if expanded}
        <div
            transition:fade
            class="absolute z-10 p-6 bg-white border rounded shadow-lg right-4 top-14"
        >
            <ul class="flex flex-col justify-around space-y-4">
                <a class="block" href="#">
                    <li
                        class="px-3 py-3 transition-colors rounded hover:bg-gray-100 active:bg-gray-200"
                    >
                        Download Note
                    </li>
                </a>
                <a class="block" href="#">
                    <li
                        class="px-3 py-3 transition-colors rounded hover:bg-gray-100 active:bg-gray-200"
                    >
                        Contact Support
                    </li>
                </a>
                <a class="block" href="#">
                    <li
                        class="px-3 py-3 transition-colors rounded hover:bg-gray-100 active:bg-gray-200"
                    >
                        Log Out
                    </li>
                </a>
            </ul>
        </div>
        <div
            transition:fade
            on:click={() => (expanded = false)}
            class="absolute inset-0 bg-gray-200 opacity-50"
        />
    {/if}
</nav>
