<script lang="ts">
    import { base } from '$app/paths';

    import NavBar from '$lib/components/NavBar.svelte';
    import Card from '$lib/components/Card.svelte';
    import DatasetGridItem from '$lib/components/DatasetGridItem.svelte';
    import PublicationsList from '$lib/components/PublicationsList.svelte';
    import { cardItems } from '$lib/data/cardItems';
    import { datasets } from '$lib/data/datasets';
    import { publications } from "$lib/data/publications"

    let recentFolderOpen = false;
    let oldFolderOpen = false;

    function toggleRecentFolder() {
        recentFolderOpen = !recentFolderOpen;
        if (recentFolderOpen) {
            oldFolderOpen = false;
        }
    };

    function toggleOldFolder() {
        oldFolderOpen = !oldFolderOpen;
        if (oldFolderOpen) {
            recentFolderOpen = false;
        }
    };

</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>Penny Rowe</title>
</svelte:head>

<NavBar />

<main class="bg-base px-8">
    <section class="flex flex-col items-center mx-auto max-w-5xl" id="hero">
        <div class="flex flex-col sm:flex-row gap-1 mt-8 sm:mt-20 mb-20">
            <div class="flex flex-1 flex-col items-start justify-end">
                <h1 class="text-[5.5rem] mb-2 font-serif leading-none">Penny Rowe</h1>
                <h2 class="text-2xl mb-4">Software Engineer & Data Scientist</h2>
                <p class="mr-8 hidden sm:block">Penny builds elegant websites and powerful analysis tools. She draws on her climate science background researching polar clouds to translate complex data into compelling, impactful stories.
                </p>
            </div>
            <div class="flex flex-1">
                <img class="w-full h-full object-cover object-center border rounded-xl shadow-2xl" src="{base}/pictures/escudero1.jpg" alt="Penny Rowe">
            </div>
        </div>
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl" id="projects">
        <div>
            <div class="mx-auto max-w-4xl flex flex-col px-6 py-10 mt-6">
                <h2 class="text-4xl flex justify-center mb-2 font-serif">Projects</h2>
                <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
            </div>

            <div>    
                {#each cardItems as {image, imageAlt, title, description, url, label}}
                    <Card {image} {imageAlt} {title} {description} {url} {label}/>
                {/each}
            </div>
        </div>
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl" id="resume">
        <div class="flex flex-col justify-center">
            <div class="my-20">
                <div class="mx-auto max-w-4xl flex flex-col px-6 pt-20 pb-4 mt-6">
                <h2 class="text-4xl flex justify-center mb-2 font-serif">Resume</h2>
                <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
            </div>

            <div class="flex-1 text-center pb-20">
                <div class="p-1">
                    <a href="Rowe_Resume_SE.pdf" class="rounded-md px-10 py-2 text-xl  hover:underline">Software Engineering Resume</a>
                </div>
                <div class="p-1">
                    <a href="Rowe_Resume_datascience.pdf" class="rounded-md px-10 py-2 text-xl hover:underline">Data Science Resume</a>
                </div>
                <div class="p-1">
                    <a href="Rowe_CV_datascience.pdf" class="rounded-md px-10 py-2 text-xl hover:underline">CV</a>
                </div>
            </div>
        </div>
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl pb-40" id="datasets">
        <div class="flex justify-center">
            <div>
                <div class="mx-auto flex flex-col pt-4 pb-6">
                    <h2 class="text-4xl flex justify-center mb-2 font-serif">Datasets</h2>
                    <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
                </div>
            
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center md:justify-between">
                    {#each datasets as {title, url}}
                        <DatasetGridItem {title} {url}/>
                    {/each}
                </div>
                                
            </div>
        </div>
    </section>
 
    <section class="flex flex-col items-center mx-auto max-w-5xl pb-16" id="publications">
        
        <div class="mx-auto flex flex-col pt-4 pb-6">
            <h2 class="text-4xl flex justify-center mb-2 font-serif">Publications</h2>
            <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
        </div>


        <div class="flex gap-10 justify-center items-center">
            <button on:click={toggleRecentFolder} class="relative flex items-center justify-center">
                <img src="{base}/pictures/folder.webp" alt="folder" class="w-40 h-auto">
                <span class="absolute text-xl">Recent</span>
            </button>
            <button on:click={toggleOldFolder} class="relative flex items-center justify-center">
                <img src="{base}/pictures/folder.webp" alt="folder" class="w-40 h-auto">
                <span class="absolute text-xl">All</span>
            </button>
        </div>

        {#if recentFolderOpen}
            <div>
                <ul>
                {#each publications as {doi, title, year, authors, journal}}
                <li class="m-2 relative">
                    <a href={doi}>
                    <div class="text-[8px] my-2">{title}</div>
                    <div class="text-[6px] mb-1">{authors}</div>
                    <div class="text-[6px] mb-1">{journal}</div>
                    <div class="text-lg text-center absolute bottom-0 left-0 right-0">{year}</div>
                    </a>
                </li>  
                {/each}
                </ul>
            </div>
        {/if}

        {#if oldFolderOpen}
            <PublicationsList/>
        {/if}
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl py-14" id="timeSeries">
        <div class="mb-8">
            <div class="mx-auto flex flex-col px-6 pt-4">
                <h2 class="text-4xl flex justify-center mb-2 font-serif">Time Series</h2>
                <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-8 mt-4">
            <div class="flex flex-1 flex-col items-start">
                <h3 class="text-2xl mb-4">Radiation: Model Validation</h3>
                <p class="mb-4">The energy we receive from the sun, or <span class="italic">shortwave radiation</span>, depends on a lot of factors, including latitude, time of day, time of year, and how reflective the surface is. We also receive <span class="italic">longwave radiation</span> through the greenhouse effect. Clouds complicated the picture - they reflect shortwave radiation but trap longwave radiation.</p>
                <!-- <p class="mr-8 mb-4">The amount of radiation that makes it to the surface therefore depends on a huge set of variables, some of which are fixed like location, date, and time, and some of which vary, like cloudiness and how reflective the surface is. 
                </p> -->
                <p class="mb-4">The figure shows the amount of radiation reaching the surface over a summer week in Antarctica. The figure packs in a lot of information. Measurements are shown in light blue, while results from two different models (ERA5 and Polar WRF) are shown in black and orange. The dashed line shows what we would expect to measure if there were no clouds; the difference between the  blue line and the dashed line is called the cloud forcing. In the top panel we can see how the shortwave radiation rises and falls over the course of a day.
                    
                <p class="mb-4">To compare the measurements to the models, we average each over a fixed time period. The box-and-whiskers summarize the statistics over the time period highlighted in white, allowing us to compare the mean, median, interquartile, and range between measurements and models.
                </p>
                
            </div>
            <div class="flex flex-1 items-start justify-center">
                <img class="w-full max-w-[500px] object-contain border rounded-xl shadow-2xl" src="pictures/flux_timeseries.png" 
                alt="Time series of downwelling radiation."/>
            </div>
        </div>

        <!-- Working with colleagues at the Chilean
                    <a href="http://antarctica.cl/"> Antarctic Research Group</a>, we have been measuring radiation and clouds at Escudero Station, 
                    on King George Island just north of the Antarctic Peninsula, since 2017. The goal of this research 
                    is to improve our understanding of cloud and radiation processes, particularly during extreme events. This work is part of the Year of Polar Prediction (YOPP) for the Southern Hemisphere. -->

        <div class="flex flex-col md:flex-row gap-8 mt-10">
            <div class="flex flex-1 flex-col items-start">
                <h2 class="text-2xl mb-4">Determining the Annual Cycle</h2>
                <p class="mr-8 mb-4">To see the how radiation varies over a year we average first over each month and then over a span of years in order to smooth out variations due to as many other factors as possible.</p>

                <p class="mr-8 mb-4"> The figure to the right shows the monthly average radiation over the years 2017-2023 at the Chilean Antarctic research station Escudero. Like the previous figure, a lot of information is condensed into the this figure.</p>

                <p class="mr-8 mb-4"> Focussing on just the lower right hand corner, this panel shows the influence of clouds on the net radiation at the surface. Positive means clouds are causing a warming and negative means clouds are cooling. We can see that clouds cool overall in the Antarctic summer and warm overall in the winter. Because of gaps in the measurements, a model was used here. This model was corrected for a bias that was found by comparing to the measurements, as shown by the purple curve.</p>

            </div>
            <div class="flex flex-1 items-start justify-center">
                <img class="w-full max-w-[500px] object-contain border rounded-xl shadow-2xl" src="pictures/forcing_components.png" 
                alt="Time series of downwelling radiation."/>
            </div>
        </div>

        <!-- Pyrgeometers and pyranometers are used to measure downwelling longwave radiation
            (infrared) and shortwave radiation (sunlight). The pyranometer shown here measures shortwave radiation every minute year-round at
            Escudero Station, just north of the Antarctic Peninsula. 
        -->
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl" id="penguin">
        <div class="mx-auto max-w-4xl flex flex-col px-6 pt-20 pb-4 mt-6">
            <h2 class="text-4xl flex justify-center mb-2 font-serif">
                Survey Analysis
            </h2>
            <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
        </div>

        <!-- <div>
            <img src="pictures/penguin_modules.png"
            alt="PENGUIN modules" 
            class="w-full border rounded-xl">
        </div> -->

        <div>
            <p class="m-10">Polar ENgagement through GUided INquiry (PENGUIN) is an NSF-funded project to develop modules that teach polar research to undergraduate students in a variety of courses. In this project students were surveyed before and after completing the module. The surveys were analyzed to measure changes in students self-assessment of knowledge gains and determine whether they made quantitative knowledge gains.
            </p>
        </div>

        <div class="flex flex-col max-w-lg">
            <div class="w-full max-w-lg">
                <img src="pictures/linear_regression_survey_question.png"
                    alt="Plot of correct and incorrect responses to statistics module survey question" 
                    class="w-full border rounded-xl shadow-2xl"
                >
                <p class="mt-2">
                    Example of aggregated student responses to a survey question for students in statistics classes before and after taking the module (dark blue and gray in top and bottom panels), as well as for statistics students who did not work through the modules (light blue and gray in top and bottom panels). Blue indicates the correct response while gray indicates incorrect responses.
                </p>
            </div>
        </div>

        <div class="flex flex-col justify-center">
            <div>
                <div class="flex-1 text-center py-4">
                    <p class="px-10 py-2 text-xl font-bold">Check out the modules:</p>
                    <div class="py-1">
                        <a href="https://serc.carleton.edu/penguin/index.html" class="rounded-md px-10 py-2 text-xl hover:underline">PENGUIN Modules</a>
                    </div>
                    <div class="py-1">
                        <a href="https://www.kaggle.com/code/pennyrowe/penguin/notebook" class="rounded-md px-10 py-2 text-xl hover:underline">Jupyter Notebooks</a>
                    </div>
                    <div class="py-1">
                        <a href="https://penguin-19615f.gitlab.io/" class="rounded-md py-2 text-xl hover:underline">PENGUIN modules for High School</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- w-full max-w-[500px] object-contain border rounded-xl shadow-2xl" -->
        <div class="m-10 flex flex-col">
            <div class="w-full max-w-lg">
                <img src="pictures/infrared_spectra.png"
                    alt="Plot of infrared downwelling radiance spectra for Oklahoma summer and Polar winter" 
                    class="w-full border rounded-xl shadow-2xl"
                >
                <p class="mt-2">
                    A figure from a PENGUIN module taught in Quantum Mechanics. Students examine rotational vibrational transitions in spectra and plot the greenhouse effect.
                </p>
            </div>
        </div>
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl" id="bayesian">
        <div class="prose mt-4">
            <div class="mx-auto flex flex-col px-6 pt-4">
                <h2 class="text-4xl flex text-center justify-center mb-2 font-serif">Bayesian Statistics</h2>
                <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-10 mt-4">
            <div class="flex flex-1 flex-col items-start">
                <h3 class="text-2xl mb-4">Cloud Property Retrievals</h3>
                <p class="mr-8 mb-4"> An iterative form of the Levenberg-Marquardt algorithm in a Bayesian framework is used to retrieve cloud
                properties from measured downwelling infrared radiation.
                </p>
                <p>
                    The figure to the right illustrates the path of a retrieval on the contour surface starting from an initial guess for several iterations. The retrieved variables are effective radius (re), related to ice crystal size, and optical depth, related to how well the crystals transmit light. The retrieval converges at the minimium.
                </p>
            </div>
            <div class="flex flex-1 items-start justify-center">
                <img class="w-full h-auto object-contain border rounded-xl shadow-2xl" src="pictures/clarra.jpg" 
                alt="Retrieval of effective radius and optical depth using optimal estimation."/>
            </div>
        </div>

        <!-- <p class="mr-8 mb-4">Algorithms such as optimal estimation for retrieving cloud properties are sensitive to instrumental
            considerations such as calibration and instrument responsivity, sources of error such as biases,
            noise and error in knowledge of the atmospheric state, and limited spectral resolution. </p>
         -->

        <!-- <hr class="hr2">
        <div class="row">
            <div class="column">
                <img src="pictures/Fig4_scatterErrsPt5.jpg"s
                    alt="" style="width:90%">
            </div>
        </div>

        <hr class="hr2">
        <div class="row">
            <div class="column">
                <img src="pictures/Fig7_bubbleplot4.jpg"
                    alt="Cloud signal and error with height" style="width:90%">
            </div>
        </div>

        <hr class="hr2">
        <div class="row">
            <div class="column">
            <img src="pictures/bayes.png"
                alt="Plot of 2D probability distribution P(x,y), together with P(x), P(y), and P(y|x)" style="width:90%">
            </div>
        </div>     -->
    </section>

    <section class="flex flex-col items-center mx-auto max-w-5xl" id="indexOfRefraction">
        <div class="mx-auto max-w-4xl flex flex-col px-6 pt-20 pb-4 mt-6">
            <h2 class="text-4xl flex justify-center mb-2 font-serif">
                Data Fusion
            </h2>
            <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
        </div>
        
        <div class="max-w-xl">
        <!-- <div class="prose mt-4"> -->
            <div>
                <h3 class="text-2xl mb-4">Index of Refraction</h3>
                <p>Radiative transfer calculations of supercooled liquid cloud
                    absorption and emission of infrared radiation relies on incorporating the temperature
                    dependence of the 
                    <a href="http://webspace.pugetsound.edu/facultypages/nesh/supercooled_water_optical_constants/">
                        complex refractive indices of supercooled water</a>.
    
                    <div>
                        <img src="pictures/fig5_k_RFN240K.jpg" alt="Imaginary part of complex refractive index of liquid water at 240 K" style="width:90%" class="border rounded-xl shadow-2xl">
                    </div>
                    <div>
                        <p>The figure shows the imaginary part of the complex-valued index of refraction of liquid water,
                            at 240 K. This result was created by interpolating and extrapolating the results from 
                            laboratory studies at varying frequencies and temperatures.
                        </p>
                    </div>
            </div>
        </div>
    </section>
   
    <section class="flex flex-col items-center mx-auto max-w-5xl" id="blackcarbon">
        <div class="prose mt-4">
            <div class="mx-auto flex flex-col px-6 pt-4">
                <h2 class="text-4xl flex justify-center mb-2 font-serif">Data Extrapolation</h2>
                <hr class="h-[2px] w-20 mx-auto bg-firebrick border-0">
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-10 mt-4">
            <div class="flex flex-1 flex-col items-start">
                <h2 class="text-2xl mb-4">Black Carbon</h2>
                <p class="mr-8 mb-4"> Black carbon is an anthropogenic pollutant that decreases the albedo of ice and snow, leading to increased melting in a positive feedback loop. In the Chilean Andes, black carbon on glaciers enhances the melt rate. Because glacier melt is an important source of water for households, agriculture, and energy, understanding the timing of melt as well as glacier loss is an important topic. Snow samples from the Chilean Andes, in the Antarctic, and on Mt. Rainier were used to quantify light absorption by impurities.
                </p>
                <p class="sm:mr-8 mb-4">The resulting point measurements were extrapolated over the broader region, requiring estimates of the snow area and location-dependent average insolation and cloud cover.
                </p>
                <p>
                    Snow sampling involved first digging a snow pit and then collecting 
                    samples successively deeper, as shown to the right.
                </p>

            </div>

            <div class="flex flex-1 items-start justify-center">
                <img class="w-full h-auto object-center border rounded-xl shadow-2xl" src="pictures/black-carbon-2016-antartic-research-group_-_5_square-scaled2.jpg" 
                alt="Snow sampling."/>
            </div>
        </div>
    </section>

    <div class="pb-20">
    </div>
    
</main>


<!-- TODO: convert to Tailwind -->
<style>
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    ul li a{
        text-decoration:none;
        color:#000;
        background:rgb(239, 237, 233);
        display:block;
        width: 8.5em;
        height: 11em;
        padding: .4em;
        box-shadow: -5px 1px 7px rgba(33,33,33,.7);
        transition: transform .15s linear;
    }
    
    ul li:nth-child(4n) a{
        transform:rotate(.5deg);
        position:relative;
        top: 1px;
        background:rgb(216, 219, 214);
    }
    
    ul li:nth-child(6n) a{
        transform:rotate(1.2deg);
        position:relative;
        top: .4px;
    }
    
    ul li:nth-child(5n) a{
        transform:rotate(.4deg);
        position:relative;
        top: -2px;
        background:rgb(237, 220, 223);
    }


    ul li:nth-child(9n) a{
        transform:rotate(-.8deg);
        position:relative;
        top: -.8px;
        background:rgb(195, 195, 216);
    }
    
    ul li a:hover,ul li a:focus{
        box-shadow: -2px -1px 7px rgba(0,0,0,.7);
        transform: scale(1.5);
        position:relative;
        z-index:5;
    }
    
</style>


