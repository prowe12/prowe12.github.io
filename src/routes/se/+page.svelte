
<script>
    import ResearchItem from '$lib/components/ResearchItem.svelte';

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
      <div class="mx-auto max-w-4xl flex flex-col px-6 py-4 mt-6">
      <h2 class="text-4xl flex justify-center mb-10">Software Engineering</h2>

      {#each projectItems as {image, imageAlt, title, description}}
          <ResearchItem {image} {imageAlt} {title} {description}/>
      {/each}
  </div>

</main>