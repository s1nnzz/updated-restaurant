import { Show, type Component } from "solid-js";
import { useFlash } from "../../contexts/FlashContext";

const Flash: Component = () => {
	const { flash } = useFlash();

	return (
		<Show when={flash() !== ""}>
			<div class="flash-holder">
				<h3 class="flash-text">{flash()}</h3>
			</div>
		</Show>
	);
};

export default Flash;
