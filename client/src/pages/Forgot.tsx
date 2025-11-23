import { createSignal, Show, type Component } from "solid-js";
import { useFlash } from "../contexts/FlashContext";
import Form from "../components/common/Form";
import { A } from "@solidjs/router";

const Forgot: Component = () => {
	const { setFlash } = useFlash();
	const [resetToken, setResetToken] = createSignal<string | null>(null);
	const [email, setEmail] = createSignal("");

	const formDetails = {
		Email: {
			Type: "email",
			Label: "Email",
		},
	};

	const onSubmit = (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const emailVal = (
			target.elements.namedItem("Email") as HTMLInputElement
		).value;

		setEmail(emailVal);

		fetch("/api/password/forgot", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: emailVal,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					setFlash("Password reset email sent");
				}
				return res.json();
			})
			.then((json) => {
				console.log(json);
				if (json.token) {
					setResetToken(json.token);
				}
				if (json.message) {
					// setFlash(json.message);
				}
			});
	};

	return (
		<>
			<Form FormDetails={formDetails} SubmitCallback={onSubmit} />

			<Show when={resetToken()}>
				<div>
					<p>Reset link (prototype mode):</p>
					<A href={`/reset?email=${email()}&token=${resetToken()}`}>
						Reset Your Password
					</A>
				</div>
			</Show>

			<A href="/login">Back to Sign In</A>
		</>
	);
};

export default Forgot;
