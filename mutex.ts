import { Mutex, MutexInterface } from 'async-mutex';

export class PaymentService {

	private locks : Map<string, MutexInterface>;

	constructor() {
		this.locks = new Map();
	}

	public async participateInFreeEvent(user: {id: 'o'}, eventId: number): Promise<void> {
        if (!this.locks.has(user.id)) {
          this.locks.set(user.id, new Mutex());
        }
        
        this.locks
            .get(user.id)
            .acquire()
            .then(async (release) => {
                try {
                    const existOrder = await findOrder(eventId, user.id);
                    if (!existOrder) {
                        const order = buildNewOrder(eventId, user.id);
                        createOrder(order.id, eventId, user.id);
                    }
                } catch (error) {
                } finally {
                    release();
                }
            },
        );
    }

}