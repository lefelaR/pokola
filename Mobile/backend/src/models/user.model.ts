export default class User {
	id: string = "";
	name: string = "";
    phoneNumber: string = "";
	createdAt: number = 0;
	lastLoggedIn: number = 0;

	constructor(id:string) {
		this.id = id;
	}
}
