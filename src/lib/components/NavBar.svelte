<script lang="ts">
  import { base } from '$app/paths';

  let showMenu = false;
</script>

<main class="bg-base px-8">
  <nav class="max-w-5xl mx-auto">
      <div class="mx-auto hidden sm:block">
        <div class="relative flex h-16 items-center justify-between">

          <!-- LHS tabs -->
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex shrink-0 items-center">
                  <a href="{base}/" class="rounded-md py-2 text-xl pr-4 font-medium  hover:underline" aria-current="page">
                  Home</a>
              </div>
          </div>
  
          <!-- RHS tabs -->
          <div class="absolute inset-y-0 right-0 hidden sm:flex ml-6 items-center">
            <a href="{base}/#projects" class="rounded-md px-4 py-2 text-xl font-medium hover:underline">Projects</a>    
            <a href="{base}/#resume" class="rounded-md pl-4 py-2 text-xl font-medium  hover:underline">Resume</a>
          </div>
        </div>
      </div>
    
      <!-- Mobile menu -->
      <div class="flex flex-col py-4 sm:hidden text-right items-end">
        <button aria-label="hamburger menu" on:click={()=>showMenu = !showMenu}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          </svg>
        </button>

        {#if showMenu}
          <ul role="menu" class="absolute mt-10 z-10 py-4 px-8 shadow bg-base rounded-xl font-bold text-left leading-[3rem]">
            <li> <a href="{base}/" class="rounded-md text-xl font-medium hover:underline" aria-current="page">
              Home</a>
            </li>
            <li><a href="{base}/#projects" class="rounded-md text-xl font-medium hover:underline">Projects</a>  
            </li>
            <li><a href="{base}/#resume" class="rounded-md text-xl font-medium  hover:underline">Resume</a>
            </li>
          </ul>
        {/if}
      </div>
                
                
  </nav>
</main>




<!-- <a href="#datasets" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Datasets</a>
<a href="/publications" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Publications</a>
<a href="CV_Rowe_med.pdf" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">CV</a> -->
