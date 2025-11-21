import { createEffect, type Component } from "solid-js";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";
import { useNavigate, A } from "@solidjs/router";

const Delete: Component = () => {
	const { authenticated, loading, reload } = useAuth();
	const { setFlash } = useFlash();
	const navigate = useNavigate();

	createEffect(() => {
		if (!loading() && !authenticated()) {
			navigate("/", { replace: true });
		}
	});

	const handleDelete = () => {
		if (
			!confirm(
				"Are you sure you want to delete your account? This cannot be undone."
			)
		) {
			return;
		}

		fetch("/api/user", {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 204) {
					setFlash("Account deleted successfully");
					navigate("/", { replace: true });
					reload();
					// return a consistent shape so downstream code can inspect .message
					return { message: "Account deleted successfully" };
				}
				return res.json();
			})
			.then((json) => {
				console.log(json);
				if (
					json.message &&
					json.message !== "Account deleted successfully"
				) {
					setFlash(json.message);
				}
			});
	};

	return (
		<>
			<h1>Delete Account</h1>
			<p>
				This action cannot be undone. Your account and all data will be
				permanently deleted.
			</p>
			<button
				onClick={handleDelete}
				style={{ "background-color": "red", color: "white" }}
			>
				Delete My Account
			</button>
			<br />
			<A href="/profile">Go Back</A>
		</>
	);
};

export default Delete;
