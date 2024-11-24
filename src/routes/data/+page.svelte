
<script>
    import ResearchItem from '$lib/components/ResearchItem.svelte';
    import { researchItems } from '../../researchItems';
            
</script>


<svelte:head>
    <meta charset="utf-8" />
    <title>Rowe Home Page</title>
</svelte:head>


<main>

    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-4 mt-6">
        <h2 class="text-4xl flex justify-center mb-10">Data Science</h2>

        {#each researchItems as {image, imageAlt, title, description, url}}
            <ResearchItem {image} {imageAlt} {title} {description} {url}/>
        {/each}
    </div>


    <div class="flex justify-center p-10 m-10">
       <div class="prose px-10 mx-40 mt-4">
            <h2>Datasets</h2>

            <div class="col-md-12 col-xs-12 col-sm-12">
                <ul>
                    <li><a href="https://refractiveindex.info/?shelf=main&book=H2O&page=Rowe-240K">Complex
                            refractive indices of liquid water</a></li>
                    <li><a href="https://people.nwra.com/rowe/single_scatter.shtml">Single
                            scattering parameters of liquid water</a></li>
                    <li><a href="https://arcticdata.io/catalog/view/urn:uuid:130bc82b-5a71-487a-9dff-74d8a8ef62b5">Arctic upwelling and downwelling cloudy-sky infrared radiances at monochromatic resolution</a>.
                    </li>
                    <li><a href="https://doi.pangaea.de/10.1594/PANGAEA.939770">Supercooled Liquid Cloud measurement
                    from the South Pole Atmospheric Radiation and Cloud Lidar Experiment (SPARCLE)</a>.
                    </li>
                    <li><a href="https://mplnet.gsfc.nasa.gov/data?all&s=King_George_Island">
                        Micro-Pulse Lidar Network (MPLNET) data from King George Island during 2017-2022.
                        </a>
                    </li>
                    <li><a href="https://www.kaggle.com/pennyrowe/modeling-spread-covid-19">
                        Modeling the spread of COVID-19</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</main>
