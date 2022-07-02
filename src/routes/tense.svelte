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
	let field: HTMLInputElement;
	$: choice = 'present';

	const buttons = [
		{ text: 'past', type: 'past', id: 'btnPast'},
		{ text: 'present', type: 'present', id: 'btnPresent'},
		{ text: 'future', type: 'future',id: 'btnFuture'}
	]
	async function handleTenseButton(stringType: string) {
		field.focus();
		let sliceChoice = stringType;
		choice = sliceChoice;
		console.log({choice});

		return choice;
	}

	
	
	const handleFormInput = async () => {
		let doc = nlp(input);
		const userChoice = choice;
		console.log(userChoice);
		

		doc.verbs().toFutureTense();
		doc.verbs().toPresentTense();
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
		<super>Tensifier (<a href="http://ipa-reader.xyz/?text=t%C4%95nsi%CB%88fa%C9%AA.%C9%99&voice=Joanna">tĕnsiˈfaɪ.ə</a>   pronounced ten-see-fire)</super> is a text tense converter with minamal effort and no compromises.
		
		
		<div class="tense-buttons-options flex gap-1 text-center items-center justify-center">
			{#each buttons as {id, text, type}}
			<button  on:click|preventDefault={() => handleTenseButton(type)} class="bg-slate-50 p-1 px-3 w-20 rounded-full my-4 focus-within:bg-red-400" {id}>{text}</button>
			{/each}
		</div>
		
		<p>
			<i
				>Convert a sentence to any tense using <abbr title="Natural Language Processing">NLP</abbr
				></i
			>
		</p>

		<input bind:value={input} bind:this={field} on:input={handleFormInput} type="text" name="sentence" autocomplete="off" placeholder="I am nobody. Who are you?"  />
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
