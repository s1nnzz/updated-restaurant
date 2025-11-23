import { For, Show, type Component } from "solid-js";
import BookingCard from "./BookingCard";

interface BookingListProps {
	bookings: any[];
	onDelete: (id: number) => void;
	onCreateNew: () => void;
}

const BookingList: Component<BookingListProps> = (props) => {
	return (
		<div class="page-wrapper">
			<div class="container-fluid">
				<div
					style={{
						display: "flex",
						"justify-content": "space-between",
						"align-items": "center",
						"margin-bottom": "3rem",
					}}
				>
					<h1 class="section-header">My Reservations</h1>
					<button onClick={props.onCreateNew} class="btn-glass">
						New Reservation
					</button>
				</div>

				<Show
					when={props.bookings.length > 0}
					fallback={
						<div class="glass-card text-center">
							<p class="body-text">
								You have no reservations yet
							</p>
						</div>
					}
				>
					<div class="bookings-showcase">
						<For each={props.bookings}>
							{(booking, index) => (
								<BookingCard
									booking={booking}
									onDelete={props.onDelete}
									index={index()}
								/>
							)}
						</For>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default BookingList;
