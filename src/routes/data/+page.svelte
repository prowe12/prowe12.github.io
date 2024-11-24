
<script>
    import ResearchItem from '$lib/components/ResearchItem.svelte';

    let researchItems = [
        {
            title: "Time Series",
            description: "Time series of infrared and shortwave radiation are used to characterize the Antarctic surface energy budget.",
            image: "/pictures/escudero_2017-antartic-research-group_-_7.jpg",
            imageAlt: "Pyranometer at Escudero Station, Antarctica"
        },
        {
            title: "Bayesian statistics",
            description: "Bayesian statistics is used to retrieve cloud properties from infrared spectra.",
            image: "/pictures/bayes.png",
            imageAlt: "Plot of 2D probability distribution P(x,y), together with P(x), P(y), and P(y|x)",
        },
        {
            title: "Survey Statistics",
            description: `Student surveys tested statistics knowledge gains, comparing students who
                          took statistics with and without working through an educational module.`,
            image: "/pictures/linear_regression_survey_question.png",
            imageAlt: "Correct and incorrect responses to statistics module survey question",
        },
        {
            title: "Data Fusion",
            description: `The temperature-dependent index of refraction of liquid water is compiled from laboratory
                          measurements at a wide variety of temperatures and frequencies.`,
            image: "/pictures/fig5_k_RFN240K.jpg",
            imageAlt: "Imaginary part of complex refractive index of liquid water at 240 K",
        },
        {   
            title: "Data Extrapolation",
            description: `Black carbon amounts over the Southern Andean snowpack are determined from extrapolating from measurements.`,
            image: "pictures/black-carbon-2016-antartic-research-group_-_5_square-scaled2.jpg",
            imageAlt: "Image of snow sampling",
        },
        {   title:"Constraint Satisfaction",
            description:"A Sudoku Solver that uses backtracking and AC3 to solve sudoku puzzles. ",
            image: "/pictures/sudoku_original_crop.jpg",
            imageAlt: "Sudoku puzzle",
        }
    ];
            
</script>


<svelte:head>
    <meta charset="utf-8" />
    <title>Rowe Home Page</title>
</svelte:head>


<main>

    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-4 mt-6">
        <h2 class="text-4xl flex justify-center mb-10">Data Science</h2>

        {#each researchItems as {image, imageAlt, title, description}}
            <ResearchItem {image} {imageAlt} {title} {description}/>
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
