export type User = {
	_id: string;
	email: string;
	password?: string;
	nickname?: string;
	friends?: object;
	invites?: object;
	findOne: any;
};
