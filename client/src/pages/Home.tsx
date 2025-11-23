import { type Component } from "solid-js";
import { A } from "@solidjs/router";

const Home: Component = () => {
	return (
		<div class="page-wrapper">
			<section class="hero-section">
				<div class="hero-content">
					<h1 class="hero-title">Welcome to Luxe Dining</h1>
					<p class="hero-subtitle">
						Experience culinary excellence with our handcrafted
						dishes, prepared with passion and served with elegance
					</p>
					<div class="hero-actions">
						<A href="/order">
							<button class="btn-primary">View Menu</button>
						</A>
						<A href="/bookings">
							<button class="btn-outline">
								Make Reservation
							</button>
						</A>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
