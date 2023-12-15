<script>
	import ChatBubble from "$lib/ChatBubble.svelte";
</script>

<div class='grid grid-rows-[auto_1fr]'>
	<h1>Chat Bubble</h1>
	<div>
		<div class='bg-red-200 inline-block relative'>
			<ChatBubble pointerPosition='Top'>
				Top Pointer
			</ChatBubble>
		</div>
		<div class='bg-red-200 inline-block relative'>
			<ChatBubble pointerPosition='Bottom'>
				Bottom Pointer
			</ChatBubble>
		</div>
		<div class='bg-red-200 inline-block relative'>
			<ChatBubble pointerPosition='Left'>
				Left Pointer
			</ChatBubble>
		</div>
		<div class='bg-red-200 inline-block relative'>
			<ChatBubble pointerPosition='Right'>
				Right Pointer
			</ChatBubble>
		</div>
		<div class='grid grid-cols-4 h-[5em]'>
			<div class='text-center relative bg-yellow-200'>
				<ChatBubble pointerPosition='Top'>
					Top Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Bottom'>
					Bottom Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Left'>
					Left Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Right'>
					Right Pointer
					<br/>
					Another Line
				</ChatBubble>
			</div>
		</div>
		<div class='grid grid-cols-4 h-[5em]'>
			<div class='text-center relative bg-orange-300'>
				<ChatBubble pointerPosition='Top'
				            pointerWidthRatio={1.2}>
					Top Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Top'
				            pointerWidthRatio={1}>
					Top Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Top'
				            pointerWidthRatio={0.8}>
					Top Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Top'
				            pointerWidthRatio={0.5}>
					Top Pointer
				</ChatBubble>
			</div>
		</div>
		<div class='grid grid-cols-4 h-[5em]'>
			<div class='text-center relative bg-green-300'>
				<ChatBubble pointerPosition='Bottom'
				            pointerWidthRatio={1.2}>
					Bottom Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Bottom'
				            pointerWidthRatio={1}>
					Bottom Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Bottom'
				            pointerWidthRatio={0.8}>
					Bottom Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Bottom'
				            pointerWidthRatio={0.5}>
					Bottom Pointer
				</ChatBubble>
			</div>
		</div>
		<div class='grid grid-cols-4 h-[5em]'>
			<div class='text-center relative bg-blue-300'>
				<ChatBubble pointerPosition='Left'
				            pointerWidthRatio={1.2}>
					Left Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Left'
				            pointerWidthRatio={1}>
					Left Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Left'
				            pointerWidthRatio={0.8}>
					Left Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Left'
				            pointerWidthRatio={0.5}>
					Left Pointer
				</ChatBubble>
			</div>
		</div>
		<div class='grid grid-cols-4 h-[5em]'>
			<div class='text-center relative bg-gray-400'>
				<ChatBubble pointerPosition='Right'
				            pointerWidthRatio={1.2}>
					Right Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Right'
				            pointerWidthRatio={1}>
					Right Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Right'
				            pointerWidthRatio={0.8}>
					Right Pointer
				</ChatBubble>
			</div>
			<div class='text-center relative'>
				<ChatBubble pointerPosition='Right'
				            pointerWidthRatio={0.5}>
					Right Pointer
				</ChatBubble>
			</div>
		</div>
	</div>
</div>
