<script lang="ts">
    import { Toasts } from 'svoast';

    import Blurrer from '$lib/Blurrer.svelte';

    import './styles.css';
    import { onMount } from 'svelte';

    let wp: string;

    onMount(async () => {
        wp = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/','_')
    });
</script>


<div class="app">
    <Blurrer />
    
	<main data-path={wp}>
		<slot />
	</main>
</div>

<Toasts />
<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 20px auto;
		box-sizing: border-box;

        text-align: center;
        
        background-color: #FFFFFF88;
        border-radius: 3em;

	}
</style>