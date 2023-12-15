<script lang='ts'>
	import {page} from '$app/stores'
	import {browser} from '$app/environment'
</script>

<h1>User ID {!browser ? '' : $page.params.user_id}</h1>
