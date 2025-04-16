<div class='popover__wrapper'>
	<div class='popover__title'>
		<slot name='item'/>
	</div>
	<div class='popover__content'>
		<slot name='popover'/>
	</div>
</div>

<style>

	.popover__wrapper {
		position: relative;
		display: inline-block;
		cursor: pointer;
}
	.popover__content {
		visibility: hidden;
		position: absolute;
		left: 50%;
		width: auto;
		--tw-translate-y: 0px;
		--tw-translate-x: -50%;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
		border-radius: 0.25rem;
		--tw-bg-opacity: 1;
		background-color: rgb(176 210 220 / var(--tw-bg-opacity, 1));
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		text-align: center;
		opacity: 0;
		--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
		visibility: visible;
		z-index: 40;
		--tw-translate-y: 0.5rem;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
		opacity: 1;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
}

</style>
