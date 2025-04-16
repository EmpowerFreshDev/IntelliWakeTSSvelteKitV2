<script>import {
  TimeZoneOlsons,
  TimeZoneOlsonsAmerica,
  TimeZoneOlsonsAmericaCommon,
  IANADescription
} from "@empowerfresh/intelliwake";
export let value = null;
export let id = void 0;
export let name = void 0;
export let timezoneList = "AmericaCommon";
export let hideIANA = false;
export let forDate = "2000-01-01";
export let showPrefix = false;
$: removePrefix = !showPrefix && timezoneList !== "All";
$: timezones = timezoneList === "AmericaCommon" ? TimeZoneOlsonsAmericaCommon() : timezoneList === "America" ? TimeZoneOlsonsAmerica() : TimeZoneOlsons();
</script>

<select {id}
        {name}
        bind:value>
	<option value={null}>(None)</option>
	{#each timezones as timezone (timezone)}
		<option value={timezone}>{IANADescription(timezone, {removePrefix, hideIANA, forDate})}</option>
	{/each}
</select>
