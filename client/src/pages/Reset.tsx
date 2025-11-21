import { type Component } from "solid-js";
import { useFlash } from "../contexts/FlashContext";
import Form from "../components/common/Form";
import { useNavigate, useSearchParams, A } from "@solidjs/router";

const Reset: Component = () => {
	const { setFlash } = useFlash();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const formDetails = {
		Password: {
			Type: "password",
			Label: "New Password",
		},
		ConfirmPassword: {
			Type: "password",
			Label: "Confirm Password",
		},
	};

	const onSubmit = (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const password = (
			target.elements.namedItem("Password") as HTMLInputElement
		).value;
		const confirmPassword = (
			target.elements.namedItem("ConfirmPassword") as HTMLInputElement
		).value;

		if (password !== confirmPassword) {
			setFlash("Passwords do not match");
			return;
		}

		const token = searchParams.token;

		if (!token) {
			setFlash("Invalid reset token");
			return;
		}

		fetch("/api/password/reset", {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				resetToken: token,
				newPassword: password,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					setFlash("Password reset successful!");
					navigate("/login");
				} else if (res.status === 400) {
					setFlash("Invalid or expired reset token");
				}
				return res.json();
			})
			.then((json) => {
				console.log(json);
				if (json.message) {
					setFlash(json.message);
				}
			});
	};

	return (
		<>
			<h2>Reset Password for: {searchParams.email}</h2>
			<Form FormDetails={formDetails} SubmitCallback={onSubmit} />
			<A href="/forgot">Request new reset link</A>
		</>
	);
};

export default Reset;
