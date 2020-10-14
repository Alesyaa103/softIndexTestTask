const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080/';

interface RequestArgs {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	query?: Record<string, any>;
	body?: any;
}

const throwIfResponseFailed= async (res: Response) => {
	if (!res.ok) {
		const exception = {
			status: res.status,
			message: res.statusText,
			clientException: null,
		};

		try {
			console.log(res)
			exception.clientException = await res.json();
		} catch {}
		throw exception;
	}
}

const getArgs = (args: RequestArgs): RequestInit => {
	const headers: Headers | string[][] | Record<string, string> | undefined = {};

	let body;

  if (args.body) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support request body.');
		}
		body = JSON.stringify(args.body);
		headers['Content-Type'] = 'application/json';
		headers.Accept = 'application/json';
	}

	return {
		method: args.method,
		headers,
		...(args.method === 'GET' ? {} : { body }),
	};
};

const getUrl = (args: RequestArgs) => `${BASE_URL}api${args.endpoint}${args.query ? `?${JSON.stringify(args.query)}` : ''}`

export default async function callApi(args: RequestArgs): Promise<Response> {
	try {
		const res: Response = await fetch(getUrl(args), getArgs(args));
		await throwIfResponseFailed(res);
		return res;
	} catch (err) {
		throw err;
	}
}