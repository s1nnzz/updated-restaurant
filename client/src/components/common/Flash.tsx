import { Show, type Component } from "solid-js";
import { useFlash } from "../../contexts/FlashContext";

const Flash: Component = () => {
	const { flash } = useFlash();

	return (
		<Show when={flash() !== ""}>
			<div class="notification-glass">
				<p class="notification-text">{flash()}</p>
			</div>
		</Show>
	);
};

export default Flash;
