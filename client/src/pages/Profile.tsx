import { createSignal, createEffect, type Component } from "solid-js";
import { useAuth } from "../contexts/AuthContext";
import { A, useNavigate } from "@solidjs/router";

const Profile: Component = () => {
	const [userData, setUserData] = createSignal<any>({});
	const { authenticated, loading } = useAuth();
	const navigate = useNavigate();

	createEffect(() => {
		if (!loading()) {
			if (!authenticated()) {
				navigate("/", { replace: true });
			}
		}
	});

	createEffect(() => {
		fetch("/api/auth/check", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				if (json.userId) {
					setUserData({ id: json.userId });
				}
			});
	});

	return (
		<>
			<h1>Welcome to your profile</h1>
			<h2>Your user Id is {userData().id}</h2>

			<A href="/logout">Logout</A>
			<A href="/delete">Delete Account</A>
		</>
	);
};

export default Profile;
