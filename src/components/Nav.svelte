<script>
    import Button from './Button.svelte';
</script>

<div class="items-center hidden px-4 lg:flex lg:flex-col">
    <div class="flex items-center justify-center">
        <svg
            class="mr-2 text-green-400 xl:h-14 xl:w-14 lg:h-12 lg:w-12"
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
        <h1 class="font-serif font-bold text-green-400 xl:text-5xl lg:text-4xl">
            Notarize
        </h1>
    </div>
    <nav class="mt-10">
        <ul class="flex flex-col space-y-8 text-center">
            <Button type="primary">
                <li>Download Notes</li>
            </Button>
            <li>
                <a href="https://github.com/austincrim/notarize">
                    <Button type="dark">
                        <img
                            class="inline-block w-8 h-8 mr-1"
                            alt="github logo"
                            src="/images/github-logo-light.png"
                        />
                        View Source
                    </Button>
                </a>
            </li>
            <Button type="secondary">
                <li>Log In</li>
            </Button>
        </ul>
    </nav>
</div>
