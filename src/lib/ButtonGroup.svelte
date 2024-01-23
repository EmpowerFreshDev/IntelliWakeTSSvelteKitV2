<script lang='ts'>
	import {tick} from 'svelte'

	type T = $$Generic

	export let value: T | null = null
	export let options: (string | {
		key: T,
		name: string,
		disabled?: boolean
		hidden?: boolean
	})[]
	let clazz = ''
	export {clazz as class}
	export let name: string | undefined = undefined
	export let readonly = false

	let inputElement: HTMLInputElement

	$: useOptions = options
		.map(option => typeof option === 'string' ? {
			key: option as T,
			name: option
		} : option)
		.filter(option => !option.hidden)

	function keydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft': {
				let idx = useOptions.findIndex(option => option.key == value)
				while (idx > 0) {
					const prev = useOptions.at(idx - 1)
					if (!prev) break
					if (!prev.disabled) {
						value = prev.key
						break
					}

					idx--
				}
			}
				break
			case 'ArrowRight': {
				let idx = useOptions.findIndex(option => option.key == value)
				while (idx < useOptions.length - 1) {
					const next = useOptions.at(idx + 1)
					if (!next) break
					if (!next.disabled) {
						value = next.key
						break
					}

					idx++
				}
			}
				break
		}
	}

</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class='buttonGroup {clazz}'
     {...$$restProps}
     tabindex={0}
     role='group'
     on:keydown={keydown}>
	{#each useOptions as option (option)}
		{@const isActive = value == option.key}
		<button type='button'
		        class:active={isActive}
		        disabled={readonly || option.disabled}
		        tabindex={-1}
		        on:click={() => {
					if (!readonly && !option.disabled) {
							value = option.key
							tick().then(() => {
							if (inputElement) {
								inputElement.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}))
								inputElement.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
							}
						})
					}}
					}>
			{option.name}
		</button>
	{/each}
</div>

{#if name}
	<input type='hidden'
	       bind:this={inputElement}
	       {value}
	       {name}/>
{/if}
