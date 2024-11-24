
<script>
    import ResearchItem from '$lib/components/ResearchItem.svelte';
    import ResearchGridItem from '$lib/components/ResearchGridItem.svelte';

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

    let projectItems = [
        {   title:"Sudoku Solver",
            description:"An interactive sudoku solver. ",
            image: "/pictures/sudoku_original_crop.jpg",
            imageAlt: "Sudoku puzzle",
        },
        {   title:"Cambio",
            description:"A Webapp for modeling climate change. ",
            image: "pictures/cambio4.jpg",
            imageAlt: "Cambio Webapp dashboard where users select inputs and plot outputs.",
        },
    ];
            
</script>


<svelte:head>
    <meta charset="utf-8" />
    <title>Rowe Home Page</title>
</svelte:head>


<main>

    <div>
        <img src="pictures/escudero_2017_antartic_research_group_crop.jpg" alt="Escudero">
        <div class="absolute top-40 left-14">
            <h1 class="text-4xl mb-4">Dr. Penny Rowe</h1>
            <p class="text-2xl"> Data Scientist / Software Engineer </p>
        </div>
    </div>

    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-10 mt-20">
        <h2 class="text-4xl flex justify-center mb-10">Data Science</h2>
    </div>


    <div class="mx-auto max-w-6xl flex flex-wrap justify-center">
        {#each researchItems as {image, imageAlt, title, description}}
                <ResearchGridItem {image} {imageAlt} {title}/>
        {/each}
    </div>

    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-10 mt-20">
        <h2 class="text-4xl flex justify-center mb-10">Software Engineering</h2>

        {#each projectItems as {image, imageAlt, title, description}}
            <ResearchItem {image} {imageAlt} {title} {description}/>
        {/each}
    </div>
    
</main>
