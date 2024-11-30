<script lang="ts">
  import { base } from '$app/paths';
</script>

<main class="bg-base px-4">
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
          <div class="absolute inset-y-0 right-0 hidden md:flex ml-6 items-center">
            <a href="{base}/#projects" class="rounded-md px-4 py-2 text-xl font-medium hover:underline">Projects</a>    
            <a href="{base}/#resume" class="rounded-md pl-4 py-2 text-xl font-medium  hover:underline">Resume</a>
          </div>
        </div>
      </div>
    
      <!-- Mobile menu, show/hide based on menu state. -->
      <!-- <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
          <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
          <a href="/" class="rounded-md px-10 py-2 text-2xl font-medium text-white" aria-current="page">Home</a>
          <a href="/about" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About</a>
          <a href="/se" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Software Engineering</a>
          <a href="/data" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Data Science</a>    
          </div>
      </div> -->
  </nav>
</main>




<!-- <a href="#datasets" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Datasets</a>
<a href="/publications" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Publications</a>
<a href="CV_Rowe_med.pdf" class="rounded-md px-10 py-2 text-2xl font-medium text-gray-300 hover:bg-gray-700 hover:text-white">CV</a> -->
