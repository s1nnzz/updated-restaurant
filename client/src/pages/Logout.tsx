import { createEffect, type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useFlash } from "../contexts/FlashContext";
import { useAuth } from "../contexts/AuthContext";

const Logout: Component = () => {
	const navigate = useNavigate();
	const { setFlash } = useFlash();

	const { reload } = useAuth();

	createEffect(() => {
		fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				setFlash("You have been logged out successfully");
				navigate("/", { replace: true });
				reload();
			});
	});

	return (
		<>
			<h1>Logging you out...</h1>
		</>
	);
};

export default Logout;
