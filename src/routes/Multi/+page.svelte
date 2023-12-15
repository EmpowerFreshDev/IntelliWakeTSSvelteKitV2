<script lang='ts'>
	import MultiSelect from '$lib/MultiSelect.svelte'
	import {enhance} from '$app/forms'
	import {DownloadString, FormEnhance} from '$lib'
	import {ArrayRange} from '@solidbasisventures/intelliwaketsfoundation'

	type TPoss = {
		name: string
	}

	let possibles: TPoss[] = [
		{name: 'Dennis'},
		{name: 'Isaac'},
		{name: 'Jordan'},
		{name: 'Alan'},
		{name: 'Kerry'},
		{name: '<span style="color: red;">Kerstyn</span>'}
	]

	let longPossibles = [...possibles, ...(ArrayRange(200).map(number => ({name: `Name ${number + 1}`})))]

	let selected = possibles.slice(3)

	let existing: TPoss[] = []
	let created: TPoss[] = []

	let selectedIDs: (number | string)[] = []

	$: console.log(selectedIDs)
</script>

<div>
	<div class='text-center mt-5'>
		<div class='w-[40em]'>
			<input/>
		</div>
	</div>
	<form class='text-center mt-5 grid grid-rows-2'
	      method='POST'
	      action='?/send'
	      use:enhance={input => FormEnhance({
	            input,
				  validateObject: (val) => {
					  console.info('Validate Object', val)
					  if (!val.user_ids?.length) return 'Must have at least 1 item'
					  /* return val.user_ids?.length ? true : 'Must have at least 1 item' */
				  },
				  onStart: () => console.log('Start'),
				  onSuccess: response => console.log('Success', response),
				  onFailure: (action, response) => console.log('Failure', action, response),
				  onEnd: () => console.log('End')
		      })}>
		<div>
			<button type='button'
			        on:click={() => selectedIDs = ['Dennis', 'Isaac']}>
				Set
			</button>
		</div>
		<div class='inline-block w-[40em] overflow-hidden px-3'>
			<MultiSelect possibles={longPossibles}
			             bind:selectedIDs
			             bodyClass='!max-h-[50vh]'
			             name='user_ids'
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
		<div class='inline-block w-[40em] overflow-hidden px-3'>
			<button>Send</button>
		</div>
	</form>
	<form class='text-center mt-5 grid grid-rows-2'
	      method='POST'
	      action='?/send'
	      use:enhance={() => FormEnhance()}>
		<div class='text-center mt-5'>
			<div class='block w-[20em] overflow-hidden px-3 mx-auto'>
				<MultiSelect {possibles}
				             placeholder='Select items...'
				             bind:selected
				             create={(val) => ({name: val})}
				             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
				             bind:existing
				             bind:created/>
			</div>
		</div>
		<div class='inline-block w-[40em] overflow-hidden px-3'>
			<button>Send</button>
		</div>
	</form>
	<div class='text-center mt-5'>
		<div class='block w-[20em] overflow-hidden px-3 mx-auto'>
			<MultiSelect {possibles}
			             placeholder='Select items...'
			             disabled
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
	</div>
	<div class='text-center mt-5'>
		<div class='block w-[20em] overflow-hidden px-3 mx-auto'>
			<MultiSelect {possibles}
			             placeholder='Select items...'
			             readonly
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
	</div>
	<div class='text-center mt-5'>
		<div class='block w-[20em] overflow-hidden px-3 mx-auto'>
			<MultiSelect {possibles}
			             placeholder='Select items...'
			             required
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
	</div>
	<div class='text-center mt-5'>
		<div class='block w-[20em] overflow-hidden px-3 mx-auto'>
			<MultiSelect {possibles}
			             placeholder='Select items...'
			             required
			             invalid
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
	</div>
	<div class='text-center mt-5'>
		<div class='w-[10em] overflow-hidden px-3 mx-auto'>
			<MultiSelect {possibles}
			             bind:selected
			             create={(val) => ({name: val})}
			             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
			             bind:existing
			             bind:created/>
		</div>
	</div>
	<div class='mt-5'>
		Selected: {selected.map(s => s.name).join('; ')}
	</div>
	<div class='mt-5'>
		Existing: {existing.map(s => s.name).join('; ')}
	</div>
	<div class='mt-5'>
		Created: {created.map(s => s.name).join('; ')}
	</div>
	<div>
		<button type='button' on:click={() => DownloadString('test.txt', 'Hello world!')}>
			Download test.txt
		</button>
	</div>
</div>
