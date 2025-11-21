import { For, Show, type Component } from "solid-js";
import BookingCard from "./BookingCard";

interface BookingListProps {
	bookings: any[];
	onDelete: (id: number) => void;
	onCreateNew: () => void;
}

const BookingList: Component<BookingListProps> = (props) => {
	return (
		<div>
			<div
				style={{
					display: "flex",
					"justify-content": "space-between",
					"align-items": "center",
				}}
			>
				<h1>My Bookings</h1>
				<button onClick={props.onCreateNew} class="btn-primary">
					Create New Booking
				</button>
			</div>

			<Show
				when={props.bookings.length > 0}
				fallback={<p>You have no bookings yet.</p>}
			>
				<div class="bookings-list">
					<For each={props.bookings}>
						{(booking) => (
							<BookingCard
								booking={booking}
								onDelete={props.onDelete}
							/>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
};

export default BookingList;
