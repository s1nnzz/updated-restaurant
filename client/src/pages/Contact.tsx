import type { Component } from "solid-js";

const Contact: Component = () => {
	return (
		<div class="page-wrapper">
			<div class="container-narrow">
				<div class="text-center spacer-lg">
					<h1 class="hero-title">Get in Touch</h1>
					<p class="body-text">We'd love to hear from you</p>
				</div>

				<div class="glass-card spacer-md animate-in stagger-1">
					<h2 class="section-header">Visit Us</h2>
					<p class="body-text">
						<strong>Address:</strong>
						<br />
						123 Gourmet Street
						<br />
						Culinary District
						<br />
						London, UK
						<br />
						EC1A 1BB
					</p>
				</div>

				<div class="grid-2col spacer-md">
					<div class="glass-card animate-in stagger-2">
						<h2 class="section-header">Opening Hours</h2>
						<p class="body-text">
							<strong>Monday - Friday</strong>
							<br />
							12:00 PM - 10:00 PM
							<br />
							<br />
							<strong>Saturday - Sunday</strong>
							<br />
							11:00 AM - 11:00 PM
						</p>
					</div>

					<div class="glass-card animate-in stagger-3">
						<h2 class="section-header">Contact Info</h2>
						<p class="body-text">
							<strong>Phone:</strong>
							<br />
							+44 20 1234 5678
							<br />
							<br />
							<strong>Email:</strong>
							<br />
							hello@luxedining.co.uk
						</p>
					</div>
				</div>

				<div class="glass-card spacer-md animate-in stagger-4">
					<h2 class="section-header">Reservations</h2>
					<p class="body-text">
						For reservations and special occasions, please use our
						online booking system or call us directly. We recommend
						booking in advance, especially for weekend dining.
					</p>
				</div>

				<div class="glass-card spacer-md animate-in stagger-5">
					<h2 class="section-header">Follow Us</h2>
					<p class="body-text">
						Stay updated with our latest menu items and special
						events:
						<br />
						<br />
						<strong>Instagram:</strong> @luxedining
						<br />
						<strong>Twitter:</strong> @luxedining
						<br />
						<strong>Facebook:</strong> /luxedining
					</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
