<script lang='ts'>

	import {
		TimeZoneOlsons,
		TimeZoneOlsonsAmerica,
		TimeZoneOlsonsAmericaCommon,
		IANADescription,
		type TDateAny
	} from '@empowerfresh/intelliwake'

	export let value: string | null = null
	export let id: string | undefined = undefined
	export let name: string | undefined = undefined
	export let timezoneList: 'AmericaCommon' | 'America' | 'All' = 'AmericaCommon'
	export let hideIANA = false
	export let forDate: TDateAny = '2000-01-01'
	export let showPrefix = false

	$: removePrefix = !showPrefix && timezoneList !== 'All'
	$: timezones = timezoneList === 'AmericaCommon' ? TimeZoneOlsonsAmericaCommon() : timezoneList === 'America' ? TimeZoneOlsonsAmerica() : TimeZoneOlsons()

</script>

<select {id}
        {name}
        bind:value>
	<option value={null}>(None)</option>
	{#each timezones as timezone (timezone)}
		<option value={timezone}>{IANADescription(timezone, {removePrefix, hideIANA, forDate})}</option>
	{/each}
</select>
