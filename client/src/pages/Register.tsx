import type { Component } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Form from "../components/common/Form";
import { useFlash } from "../contexts/FlashContext";

const Register: Component = () => {
	const navigate = useNavigate();
	const { setFlash } = useFlash();

	const formDetails = {
		Email: {
			Type: "email",
			Label: "Email",
		},
		ConfirmEmail: {
			Type: "email",
			Label: "Confirm Email",
		},
		Password: {
			Type: "password",
			Label: "Password",
		},
		ConfirmPassword: {
			Type: "password",
			Label: "Confirm Password",
		},
	};

	const onSubmit = (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const email = (target.elements.namedItem("Email") as HTMLInputElement)
			.value;
		const confirmemail = (
			target.elements.namedItem("ConfirmEmail") as HTMLInputElement
		).value;
		const password = (
			target.elements.namedItem("Password") as HTMLInputElement
		).value;
		const confirmpassword = (
			target.elements.namedItem("ConfirmPassword") as HTMLInputElement
		).value;

		if (email !== confirmemail) {
			setFlash("Email not the same as confirm email");
			return;
		}

		if (password !== confirmpassword) {
			setFlash("Password not the same as confirm password");
			return;
		}

		fetch("/api/auth/register", {
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
				console.log(res.status);
				if (res.status === 200) {
					setFlash("Registration successful! Please log in.");
					navigate("/login", { replace: true });
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
			<Form FormDetails={formDetails} SubmitCallback={onSubmit} />
			<A href="/login">Already registered? Click here to log in.</A>
		</>
	);
};

export default Register;
