
<script>
    export let image="/pictures/escudero_2017-antartic-research-group_-_7.jpg";
    export let imageAlt="Pyranometer at Escudero Station, Antarctica";
    export let title="Radiation";

    let url = "/Research" + title;
</script>

<div class="flex flex-col border-2 border-gray-300 rounded-med">
    <div class='flex justify-center'>
        <img src={image} alt={imageAlt} width="300">
    </div>
    <div class='flex justify-center'>
        <h3 class='font-bold text-2xl'>{title}</h3>
    </div>
    <div class='flex justify-center'>
        <a href={url} class="underline text-xl pb-2">See more</a>
    </div>
</div>