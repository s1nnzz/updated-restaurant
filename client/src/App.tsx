import { createSignal, createEffect, type Component } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { AuthContext } from "./contexts/AuthContext";
import { FlashProvider } from "./contexts/FlashContext";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import Logout from "./pages/Logout";
import Delete from "./pages/Delete";
import Bookings from "./pages/Bookings";

import Nav from "./components/common/Nav";
import Flash from "./components/common/Flash";

import "./design-system.css";
import "./components.css";
import Order from "./pages/Order";

const App: Component = () => {
	const [auth, setAuth] = createSignal(false);
	const [authLoading, setAuthLoading] = createSignal(true);

	const checkAuth = () => {
		setAuthLoading(true);
		fetch("/api/auth/check", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				setAuth(json.status);
				setAuthLoading(false);
				console.log(`Auth status: ${json.status}`);
			});
	};

	createEffect(() => {
		checkAuth();
	});

	function AddToCart(itemName: string) {
		// TODO: Implement cart functionality
		console.log(`Added ${itemName} to cart`);
	}

	return (
		<FlashProvider>
			<AuthContext.Provider
				value={{
					authenticated: auth,
					loading: authLoading,
					reload: checkAuth,
				}}
			>
				<Router
					root={(props) => (
						<>
							<Nav />
							<Flash />
							{props.children}
						</>
					)}
				>
					<Route path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/profile" component={Profile} />
					<Route path="/reset" component={Reset} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/logout" component={Logout} />
					<Route path="/delete" component={Delete} />
					<Route path="/bookings" component={Bookings} />
					<Route
						path="/order"
						component={() => <Order addToCart={AddToCart} />}
					/>
					<Route path="*404" component={NotFound} />
				</Router>
			</AuthContext.Provider>
		</FlashProvider>
	);
};

export default App;
