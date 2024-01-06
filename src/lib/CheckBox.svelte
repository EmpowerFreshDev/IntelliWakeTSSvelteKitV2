<script lang="ts">
	/** Whether or not the input is checked */
	export let checked = false

	/** Allows for styling border */
	export let inputClass = ''

	/** Allows for styling the indicator box */
	export let indicatorClass = ''

	/** Changes appearance to radial for single option selections */
	export let radial = false

	/** Text label for checkbox */
	export let label = ""

	/** name for form actions */
	export let name = ""

	/** Allows for firing a input event */
	export let fireInputEvent = false

	export let stopPropagation = true

	export let preventDefault = true

	export let click: ((e: MouseEvent, checked: boolean) => void) = () => {}


	let namedInput: HTMLInputElement

	function handleClick() {
		checked = !checked

		if (name !== "" || fireInputEvent) {
			let event = new Event('input', {bubbles: true})
			namedInput.dispatchEvent(event)
		}
	}
</script>


<div class="flex">
	<div
		class={`relative w-4 h-4 border-2 border-blue-500 ${inputClass}`}
		class:rounded-full={radial}
		class:rounded={!radial}
	>
		<div
			class={`absolute inset-0 rounded-sm bg-blue-500 transition-all ${indicatorClass}`}
			class:rounded-sm={!radial}
			class:rounded-full={radial}
			class:scale-50={!checked}
			class:opacity-0={!checked}
			class:scale-[70%]={checked}
			class:opacity-100={checked}
		></div>

		{#if stopPropagation}
			<button
				class="absolute inset-0 btnClean bg-transparent"
				on:click|stopPropagation|preventDefault={handleClick}
				on:click|stopPropagation|preventDefault={e => click(e, checked)}
			></button>
		{:else}
			{#if preventDefault}
				<button
					class="absolute inset-0 btnClean bg-transparent"
					on:click|preventDefault={handleClick}
					on:click|preventDefault={e => click(e, checked)}
				></button>
			{:else}
				<button
					class="absolute inset-0 btnClean bg-transparent"
					on:click={handleClick}
					on:click={e => click(e, checked)}
				></button>
			{/if}
		{/if}
	</div>

	<input
		bind:this={namedInput}
		name={name === "" ? undefined : name}
		hidden
		value={checked}
	>

	<div class="ml-1.5 leading-4">{label}</div>
</div>
