import { createSignal, createEffect, Show, type Component } from "solid-js";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";
import { useNavigate } from "@solidjs/router";
import BookingList from "../components/bookings/BookingList";
import BookingForm from "../components/bookings/BookingForm";

const Bookings: Component = () => {
	const { authenticated, loading } = useAuth();
	const { setFlash } = useFlash();
	const navigate = useNavigate();
	const [bookings, setBookings] = createSignal<any[]>([]);
	const [loadingBookings, setLoadingBookings] = createSignal(true);
	const [view, setView] = createSignal("list");

	createEffect(() => {
		if (!loading() && !authenticated()) {
			navigate("/login");
		}
	});

	const fetchBookings = () => {
		setLoadingBookings(true);
		fetch("/api/booking", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				setBookings(json.bookings || []);
				setLoadingBookings(false);
			})
			.catch(() => {
				setFlash("Failed to load bookings");
				setLoadingBookings(false);
			});
	};

	createEffect(() => {
		if (authenticated()) {
			fetchBookings();
		}
	});

	const handleCreateBooking = (bookingData: any) => {
		fetch("/api/booking", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				date: bookingData.datetime.split("T")[0],
				time: bookingData.datetime.split("T")[1],
				guests: bookingData.people_count,
				table_number: bookingData.table_number,
				specialInstructions: bookingData.special_instructions,
			}),
		})
			.then((res) => {
				if (res.status === 201) {
					setView("list");
					fetchBookings();
				}
				return res.json();
			})
			.then((json) => {
				setFlash(json.message);
			});
	};

	const handleDeleteBooking = (bookingId: number) => {
		if (!confirm("Are you sure you want to delete this booking?")) {
			return;
		}

		fetch(`/api/booking/${bookingId}`, {
			method: "DELETE",
			credentials: "include",
		})
			.then((res) => {
				if (res.status === 200) {
					fetchBookings();
				}
				return res.json();
			})
			.then((json) => {
				setFlash(json.message);
			});
	};

	return (
		<main>
			<Show
				when={!loading() && !loadingBookings()}
				fallback={<main>Loading...</main>}
			>
				<Show
					when={view() === "list"}
					fallback={
						<div>
							<h1>Create New Booking</h1>
							<BookingForm
								onSubmit={handleCreateBooking}
								onCancel={() => setView("list")}
							/>
						</div>
					}
				>
					<BookingList
						bookings={bookings()}
						onDelete={handleDeleteBooking}
						onCreateNew={() => setView("create")}
					/>
				</Show>
			</Show>
		</main>
	);
};

export default Bookings;
