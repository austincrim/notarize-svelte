<script>
    export let title;
    export let dateEdited;
</script>

<div
    class="flex flex-col gap-2 p-4 rounded hover:bg-gray-200 transition-colors duration-75">
    <div class="text-lg font-mono">{title}</div>
    <div class="text-sm">{dateEdited.toLocaleDateString()}</div>
</div>
