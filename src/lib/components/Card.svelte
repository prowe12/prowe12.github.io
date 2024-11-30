
<script lang='ts'>
    export let image="/pictures/escudero_2017-antartic-research-group_-_7.jpg";
    export let imageAlt="Pyranometer at Escudero Station, Antarctica";
    export let title="Radiation";
    export let description="Continuous measurements of infrared and shortwave radiation to characterize the Antarctic surface energy budget.";
    export let url = "/data";
    export let label = "See more";
</script>

<div class="flex flex-row my-4 gap-10 border-2 border-gray-300 p-4 rounded-xl bg-white">
    <div class="w-1/4">
        <img src={image} alt={imageAlt} class="w-[300px] rounded-lg">
    </div>
    <div class="w-3/4 pr-20">
        <h3 class='font-bold text-2xl my-4'>{title}</h3>
        <p class='mb-2 text-xl'>{description}</p>
        <a href={url} class="underline text-xl pb-10">{label}</a>
    </div>
</div>