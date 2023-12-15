<script lang='ts'>
	import MultiSelect from "$lib/MultiSelect.svelte";
	import DropDownControl from "$lib/DropDownControl.svelte";

	type TPoss = {name: string}

	let possibles: TPoss[] = [
		{name: 'Dennis'},
		{name: 'Isaac'},
		{name: 'Jordan'},
		{name: 'Alan'},
		{name: 'Kerry'},
		{name: '<span style="color: red;">Kerstyn</span>'},
	]

	let selected = possibles.slice(3)

	let existing: TPoss[] = []
	let created: TPoss[] = []
</script>

<div>
	<p>
		These nesting fixed items don't work
	</p>
	<div class='text-center mt-5'>
		<DropDownControl position='CenterForce'
		                 bubble>
			<button slot='toggle'
			        type='button'
			        class='cursor-pointer'>
				Send Message
			</button>
			<div slot='body'>
				<MultiSelect {possibles}
				             name='user_ids'
				             bind:selected
				             create={(val) => ({name: val})}
				             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
				             bind:existing
				             bind:created/>
			</div>
		</DropDownControl>
	</div>
	<div class='text-center mt-5'>
		<DropDownControl position='CenterForce'
		                 bubble>
			<button slot='toggle'
			        type='button'
			        class='cursor-pointer'>
				Send Message
			</button>
			<div slot='body'>
				<DropDownControl position='CenterForce'
				                 bubble
				                 zIndex={50}>
					<button slot='toggle'
					        type='button'
					        class='cursor-pointer'>
						Send Message
					</button>
					<div slot='body'>
						<MultiSelect {possibles}
						             name='user_ids'
						             bind:selected
						             create={(val) => ({name: val})}
						             createValid={(val) => val.length >= 3 ? true : 'Must be at least 3 characters'}
						             bind:existing
						             bind:created/>
					</div>
				</DropDownControl>
				<p>More Text</p>
			</div>
		</DropDownControl>
	</div>

</div>
