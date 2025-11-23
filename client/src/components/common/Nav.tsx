import { Show, type Component } from "solid-js";
import { A } from "@solidjs/router";
import { useAuth } from "../../contexts/AuthContext";

const Nav: Component = () => {
	const { authenticated } = useAuth();

	return (
		<nav class="nav-container">
			<div class="nav-content">
				<A href="/" class="nav-brand">
					Luxe Dining
				</A>
				<div class="nav-links">
					<Show
						when={authenticated()}
						fallback={
							<A href="/login" class="nav-link">
								Sign In
							</A>
						}
					>
						<A href="/bookings" class="nav-link">
							Reservations
						</A>
						<A href="/profile" class="nav-link">
							Account
						</A>
					</Show>
					<A href="/order" class="nav-link">
						Menu
					</A>
					<A href="/about" class="nav-link">
						About
					</A>
					<A href="/contact" class="nav-link">
						Contact
					</A>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
