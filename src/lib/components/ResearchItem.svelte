
<script lang='ts'>
    export let image="/pictures/escudero_2017-antartic-research-group_-_7.jpg";
    export let imageAlt="Pyranometer at Escudero Station, Antarctica";
    export let title="Radiation";
    export let description="I use time series of infrared and shortwave radiation to characterize the Antarctic surface energy budget.";
    export let url = "/data";
</script>

<div class="flex flex-row my-4 gap-4 border-2 border-gray-300 p-4 rounded-med">
    <div>
        <img src={image} alt={imageAlt}>
    </div>
    <div>
        <h3 class='font-bold text-2xl my-4'>{title}</h3>
        <p class='mb-2 text-xl'>{description}</p>
        <a href={url} class="underline text-xl pb-10">See more</a>
    </div>
</div>