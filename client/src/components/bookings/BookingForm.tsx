import { For, type Component } from "solid-js";

interface BookingFormProps {
	onSubmit: (data: any) => void;
	onCancel: () => void;
}

const BookingForm: Component<BookingFormProps> = (props) => {
	const getMinDate = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split("T")[0];
	};

	const generateTimeOptions = () => {
		const times = [];
		for (let hour = 0; hour < 24; hour++) {
			const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
			const period = hour < 12 ? "AM" : "PM";
			const hourStr = hour.toString().padStart(2, "0");
			times.push({
				value: `${hourStr}:00`,
				label: `${displayHour}:00 ${period}`,
			});
		}
		return times;
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const date = formData.get("date");
		const time = formData.get("time");
		const datetime = `${date}T${time}`;

		const data = {
			people_count: parseInt(formData.get("people_count") as string),
			table_number: parseInt(formData.get("table_number") as string),
			datetime: datetime,
			special_instructions: formData.get("special_instructions") || "",
		};

		props.onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit} autocomplete="off">
			<div>
				<label for="people_count">Number of People</label>
				<input
					type="number"
					name="people_count"
					id="people_count"
					min="1"
					max="20"
					required
				/>
			</div>

			<div>
				<label for="table_number">Table Number</label>
				<input
					type="number"
					name="table_number"
					id="table_number"
					min="1"
					required
				/>
			</div>

			<div>
				<label for="date">Date</label>
				<input
					type="date"
					name="date"
					id="date"
					min={getMinDate()}
					required
				/>
			</div>

			<div>
				<label for="time">Time</label>
				<select name="time" id="time" required>
					<option value="">Select a time</option>
					<For each={generateTimeOptions()}>
						{(time) => (
							<option value={time.value}>{time.label}</option>
						)}
					</For>
				</select>
			</div>

			<div>
				<label for="special_instructions">
					Special Instructions (Optional)
				</label>
				<textarea
					name="special_instructions"
					id="special_instructions"
					rows={4}
				/>
			</div>

			<button type="submit">Create Booking</button>
			<button
				type="button"
				class="btn-secondary"
				onClick={props.onCancel}
			>
				Cancel
			</button>
		</form>
	);
};

export default BookingForm;
