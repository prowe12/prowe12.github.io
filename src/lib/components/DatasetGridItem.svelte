<script>
    export let url = "/";
    export let title = "Dataset";
</script>

<div class="flex flex-col items-center relative">
    <div class="cylinder">
    </div>
    <div class="absolute inset-x-4 bottom-2 top-[20%] flex items-center justify-center">
        <div class="flex flex-col items-bottom">
            <a href={url} class="text-center text-base hover:underline">{title}</a>
        </div>
    </div>
</div>


<style>
    .cylinder {
        --r: 20px;
        width: 190px;
        height: 200px;
        background: 
            radial-gradient(50% var(--r) at 50% var(--r), #ffffff33 99.99%, #ffffff00 0),
            rgb(61, 96, 131);
        border-radius: 100% / calc(var(--r) * 2);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>