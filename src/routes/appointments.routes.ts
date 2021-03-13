import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual} from 'date-fns';

const appointmentsRouter = Router();

const appointments = [];

interface Appointment {
	id: stringi, 
	provider: string,
	date: Date,
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
 	const { provider, date } = request.body;	

	const parsedDate = startOfHour(parseISO(date));

	const appointment = {
		id :  uuid(),
		provider,
		date : parsedDate,
	};

	const findAppointmentInSameDate = appointments.find(appointment =>
		isEqual(parsedDate, appointment.date), 
	);

	if(findAppointmentInSameDate) {
		return response.status(400).json({ message: 'This appointment is already booked' });
	}


	appointments.push(appointment);
	
	return response.json({ message: appointment });
});

export default appointmentsRouter;
