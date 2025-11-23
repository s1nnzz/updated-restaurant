import type { Component } from "solid-js";

const About: Component = () => {
	return (
		<div class="page-wrapper">
			<div class="container-narrow">
				<div class="text-center spacer-lg">
					<h1 class="hero-title">About Us</h1>
					<p class="body-text">
						Crafting unforgettable dining experiences since 2025
					</p>
				</div>

				<div class="glass-card spacer-md animate-in stagger-1">
					<h2 class="section-header">Our Story</h2>
					<p class="body-text">
						At Luxe Dining, we believe that exceptional food is an
						art form. Our passion for culinary excellence drives us
						to create memorable experiences for every guest who
						walks through our doors.
					</p>
				</div>

				<div class="glass-card spacer-md animate-in stagger-2">
					<h2 class="section-header">Our Philosophy</h2>
					<p class="body-text">
						We source only the finest ingredients, work with
						talented chefs, and maintain the highest standards of
						service. Every dish is carefully crafted to delight your
						senses and exceed your expectations.
					</p>
				</div>

				<div class="glass-card spacer-md animate-in stagger-3">
					<h2 class="section-header">Experience the Difference</h2>
					<p class="body-text">
						From intimate dinners to grand celebrations, we're here
						to make every moment special. Join us and discover why
						Luxe Dining is more than just a restaurant—it's a
						destination.
					</p>
				</div>

				<div class="text-center spacer-lg">
					<p
						class="body-text"
						style="font-size: 0.9rem; opacity: 0.7;"
					>
						Website crafted by a T Level Student
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
