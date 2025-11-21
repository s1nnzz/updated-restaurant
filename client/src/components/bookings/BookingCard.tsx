import { Show, type Component } from "solid-js";

interface Booking {
	booking_id: number;
	booking_dt: string;
	table_number: number;
	people_count: number;
	special_instructions?: string;
}

interface BookingCardProps {
	booking: Booking;
	onDelete: (id: number) => void;
}

const BookingCard: Component<BookingCardProps> = (props) => {
	const formatDateTime = (datetime: string) => {
		return new Date(datetime).toLocaleString();
	};

	return (
		<div class="booking-card">
			<div class="booking-info">
				<h3>Booking #{props.booking.booking_id}</h3>
				<p>
					<strong>Date & Time:</strong>{" "}
					{formatDateTime(props.booking.booking_dt)}
				</p>
				<p>
					<strong>Table Number:</strong> {props.booking.table_number}
				</p>
				<p>
					<strong>People Count:</strong> {props.booking.people_count}
				</p>
				<Show when={props.booking.special_instructions}>
					<p>
						<strong>Special Instructions:</strong>{" "}
						{props.booking.special_instructions}
					</p>
				</Show>
			</div>
			<button
				onClick={() => props.onDelete(props.booking.booking_id)}
				class="btn-danger"
			>
				Delete
			</button>
		</div>
	);
};

export default BookingCard;
