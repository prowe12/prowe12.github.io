<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<NavBar />
{@render children()}

<div class="p-4 m-4">
	<p>Page created by Penny Rowe.</p>
</div>

