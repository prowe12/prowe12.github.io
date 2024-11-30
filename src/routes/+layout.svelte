<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<div class="font-custom">
	{@render children()}
</div>

<div class="p-4 m-4">
	<p>Page created by Penny Rowe.</p>
</div>



