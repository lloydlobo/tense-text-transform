<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="ts">
	import nlp from 'compromise';
	let input = '';
	let output = '';

	const handleFormInput = async () => {
		let doc = nlp(input);
		doc.verbs().toPastTense();
		output = doc.text();
	};
</script>

<svelte:head>
	<title>Tense</title>
	<meta name="description" content="About this app" />
</svelte:head>

<article class="content">
	<div class="compromise">
		<h1>Tensifier</h1>
		<p>
			<i
				>Convert a sentence to any tense using <abbr title="Natural Language Processing">NLP</abbr
				></i
			>
		</p>
		<input bind:value={input} on:input={handleFormInput} type="text" name="sentence" />
		<!-- <p>{formInput}</p> -->
		<output id="output">{output}</output>

		<!-- Cannot use 'input' as a store. 'input' needs to be an object with a subscribe method on it. (When using $input)
 -->
	</div>
</article>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

	.compromise {
		text-align: center;
		margin-inline: auto;
		width: min (100% - 2rem, 80vw);
		flex-direction: column;
		display: flex;
		/* gap: 1rem; */
	}

	input[type='text'] {
		border-radius: 25px;
		border: none;
		padding-inline: 10px;
		padding-block: 10px;
		min-width: 100%;
		text-align: center;
		font-size: 1.25rem;
		place-self: center;
		width: min(90% - 2rem, 80vw);
	}

	h1 {
		line-height: 1;
		font-size: 2rem;
	}

	p {
		color: hsl(0, 1%, 19%);
		font-size: 0.8rem;
	}

	#output {
		margin-top: 10px;
		/* background-color: var(--background-without-opacity); */
		font-size: 1rem;
		font-family: monospace;
		border-radius: 25px;
	}
</style>
