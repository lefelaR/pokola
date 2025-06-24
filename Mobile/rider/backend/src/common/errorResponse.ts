import ResponseModel, { StatusCode } from "./response.model";

export default function errorResponse(error: any) {
	const response =
		error instanceof ResponseModel
			? error
			// : new ResponseModel(null, StatusCode.ERROR, error.message);
			: new ResponseModel({}, StatusCode.ERROR, error.message);
	return response.generate();
}
