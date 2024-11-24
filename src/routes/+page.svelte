
<script>
    import ResearchItem from '$lib/components/ResearchItem.svelte';
    import ResearchGridItem from '$lib/components/ResearchGridItem.svelte';
    import { researchItems } from '../researchItems';


    let projectItems = [
        {   title:"Sudoku Solver",
            description:"An interactive sudoku solver. ",
            image: "/pictures/sudoku_original_crop.jpg",
            imageAlt: "Sudoku puzzle",
            url: "/projects/sudoku"
        },
        {   title:"Cambio",
            description:"A Webapp for modeling climate change. ",
            image: "pictures/cambio4.jpg",
            imageAlt: "Cambio Webapp dashboard where users select inputs and plot outputs.",
            url: "https://cambio.fly.dev"
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
        {#each researchItems as {image, imageAlt, title, description, url}}
                <ResearchGridItem {image} {imageAlt} {title} {url}/>
        {/each}
    </div>

    <div>
        <div class="mx-auto max-w-4xl flex flex-col px-6 py-10 mt-20">
        <h2 class="text-4xl flex justify-center mb-10">Software Engineering</h2>

        {#each projectItems as {image, imageAlt, title, description, url}}
            <ResearchItem {image} {imageAlt} {title} {description} {url}/>
        {/each}
    </div>
    
</main>
