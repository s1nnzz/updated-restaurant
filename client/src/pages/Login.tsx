import type { Component } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Form from "../components/common/Form";
import { useFlash } from "../contexts/FlashContext";
import { useAuth } from "../contexts/AuthContext";

const Login: Component = () => {
	const navigate = useNavigate();
	const { setFlash } = useFlash();
	const { reload } = useAuth();

	const formDetails = {
		Email: {
			Type: "email",
			Label: "Email",
		},
		Password: {
			Type: "password",
			Label: "Password",
		},
	};

	const onSubmit = (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const email = (target.elements.namedItem("Email") as HTMLInputElement)
			.value;
		const password = (
			target.elements.namedItem("Password") as HTMLInputElement
		).value;

		console.log(email, password);

		fetch("/api/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					navigate("/", { replace: true });
				}
				reload();
				return res.json();
			})
			.then((json) => {
				setFlash(json.message);
			});
	};

	return (
		<div class="page-wrapper">
			<div class="flex-center">
				<div class="container-narrow">
					<div class="text-center spacer-md">
						<h1 class="section-header">Sign In</h1>
						<p class="body-text">Welcome back to Luxe Dining</p>
					</div>
					<Form FormDetails={formDetails} SubmitCallback={onSubmit} />
					<div class="text-center spacer-md">
						<p class="body-text">
							<A href="/register">No account? Register here</A>
						</p>
						<p class="body-text">
							<A href="/forgot">Forgot your password?</A>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
