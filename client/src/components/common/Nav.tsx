import { Show, type Component } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../../contexts/AuthContext";

const Nav: Component = () => {
	const { authenticated } = useAuth();

	return (
		<nav>
			<div id="nav-left">
				<A href="/">
					<h1>Restaurant</h1>
				</A>
			</div>
			<div id="nav-right">
				<Show
					when={authenticated()}
					fallback={<A href="/login">Login</A>}
				>
					<A href="/bookings">Bookings</A>
					<A href="/profile">Profile</A>
				</Show>
				<A href="/about">About</A>
				<A href="/contact">Contact</A>
			</div>
		</nav>
	);
};

export default Nav;
