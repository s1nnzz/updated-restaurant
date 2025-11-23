import { createSignal, createEffect, Show, type Component } from "solid-js";
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

	const getInitial = () => {
		return userData().id
			? String(userData().id).charAt(0).toUpperCase()
			: "?";
	};

	return (
		<div class="page-wrapper">
			<div class="container-narrow">
				<Show
					when={!loading()}
					fallback={
						<div class="flex-center">
							<p class="body-text">Loading...</p>
						</div>
					}
				>
					<div class="profile-container animate-in">
						<div class="profile-header">
							<div class="profile-avatar">{getInitial()}</div>
							<div class="profile-info">
								<h1 class="section-header">Your Account</h1>
								<p class="body-text">
									Member since 2025 • ID #{userData().id}
								</p>
							</div>
						</div>

						<div class="profile-grid">
							<div class="profile-card">
								<h2 class="section-header">Quick Actions</h2>
								<div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
									<A href="/bookings">
										<button
											class="btn-glass"
											style="width: 100%;"
										>
											My Reservations
										</button>
									</A>
									<A href="/order">
										<button
											class="btn-glass"
											style="width: 100%;"
										>
											Browse Menu
										</button>
									</A>
								</div>
							</div>

							<div class="profile-card">
								<h2 class="section-header">Account Status</h2>
								<div class="body-text">
									<p style="margin: 0.75rem 0;">
										<strong>Status:</strong> Active
									</p>
									<p style="margin: 0.75rem 0; opacity: 0.7;">
										All systems operational
									</p>
								</div>
							</div>

							<div class="profile-card">
								<h2 class="section-header">Preferences</h2>
								<div class="body-text">
									<p style="margin: 0.75rem 0;">
										<strong>Theme:</strong> Dark Mode
									</p>
									<p style="margin: 0.75rem 0; opacity: 0.7;">
										Personalized experience
									</p>
								</div>
							</div>

							<div class="profile-card">
								<h2 class="section-header">Activity</h2>
								<div class="body-text">
									<p style="margin: 0.75rem 0;">
										<strong>Last Login:</strong> Today
									</p>
									<p style="margin: 0.75rem 0; opacity: 0.7;">
										Welcome back!
									</p>
								</div>
							</div>
						</div>

						<div class="profile-actions">
							<A href="/logout" style="flex: 1;">
								<button
									class="btn-outline"
									style="width: 100%;"
								>
									Sign Out
								</button>
							</A>
							<A href="/delete" style="flex: 1;">
								<button class="btn-danger" style="width: 100%;">
									Delete Account
								</button>
							</A>
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default Profile;
