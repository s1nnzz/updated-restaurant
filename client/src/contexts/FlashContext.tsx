import {
	createContext,
	useContext,
	createSignal,
	createEffect,
	onCleanup,
	ParentComponent,
	Accessor,
	Setter,
} from "solid-js";

interface FlashContextType {
	flash: Accessor<string>;
	setFlash: Setter<string>;
}

export const FlashContext = createContext<FlashContextType>({
	flash: () => "",
	setFlash: () => {},
});

export const useFlash = () => useContext(FlashContext);

export const FlashProvider: ParentComponent = (props) => {
	const [flash, setFlash] = createSignal("");

	createEffect(() => {
		const msg = flash();
		if (msg !== "") {
			const timer = setTimeout(() => {
				setFlash("");
			}, 5000);
			onCleanup(() => clearTimeout(timer));
		}
	});

	return (
		<FlashContext.Provider value={{ flash, setFlash }}>
			{props.children}
		</FlashContext.Provider>
	);
};
