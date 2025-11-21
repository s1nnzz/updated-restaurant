import { For, Show, type Component } from "solid-js";

interface FormField {
	Type?: string;
	Label?: string;
}

interface FormDetails {
	[key: string]: FormField | string | undefined;
	$submit?: string;
}

interface FormProps {
	FormDetails: FormDetails;
	SubmitCallback?: (e: Event) => void;
}

const Form: Component<FormProps> = (props) => {
	const doNothing = (e: Event) => {
		e.preventDefault();
	};

	return (
		<form
			onSubmit={props.SubmitCallback ? props.SubmitCallback : doNothing}
			autocomplete="off"
		>
			<For each={Object.entries(props.FormDetails)}>
				{([key, val]) => (
					<Show when={key !== "$submit"}>
						<div>
							<Show when={(val as FormField).Label}>
								<label for={key}>
									{(val as FormField).Label}
								</label>
							</Show>
							<input
								type={(val as FormField).Type || "text"}
								name={key}
								id={key}
							/>
						</div>
					</Show>
				)}
			</For>
			<button type="submit">
				{(props.FormDetails["$submit"] as string) || "Submit"}
			</button>
		</form>
	);
};

export default Form;
