<div class='popover__wrapper'>
	<div class='popover__title'>
		<slot name='item'/>
	</div>
	<div class='popover__content'>
		<slot name='popover'/>
	</div>
</div>

<style lang='postcss'>

	.popover__wrapper {
		@apply relative inline-block cursor-pointer;
	}
	.popover__content {
		@apply opacity-0 invisible absolute translate-y-0 bg-[#B0D2DC] rounded px-2 text-center shadow w-auto left-[50%] translate-x-[-50%];
	}
	.popover__content:before {
		position: absolute;
		z-index: -1;
		content: "";
		right: calc(50% - 10px);
		top: -8px;
		border-style: solid;
		border-width: 0 10px 10px 10px;
		border-color: transparent transparent #B0D2DC transparent;
		transition-duration: 0.3s;
		transition-property: transform;
	}
	.popover__wrapper:hover .popover__content {
		@apply z-40 opacity-100 visible translate-y-2 transition-all;
	}

</style>
