type HttpResponse = {
  statusCode: number;
  body?: any;
};

type HttpError = Error & {
  code?: string;
};

function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  };
}

function noContent(): HttpResponse {
  return {
    statusCode: 204,
    body: undefined,
  };
}

function created<T = undefined>(body: T): HttpResponse {
  return {
    statusCode: 201,
    body,
  };
}

function accepted<T = undefined>(body?: T): HttpResponse {
  return {
    statusCode: 202,
    body,
  };
}

function clientError(error: HttpError, items?: any[]): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
      code: error.code,
      items,
    },
  };
}

function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

function notFound(error: Error, items?: string[]): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
      items,
    },
  };
}

function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  };
}

function unprocessable(error: Error): HttpResponse {
  return {
    statusCode: 422,
    body: {
      error: error.message,
    },
  };
}

function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  };
}

function fail(error: Error, items?: any[]) {
  return {
    statusCode: 500,
    body: {
      error: error.message,
      items,
    },
  };
}

function genericError({ httpCode, message }: genericErrorProps) {
  return {
    statusCode: Number(httpCode || 500),
    body: {
      error: message || 'Internal server error',
    },
  };
}

type genericErrorProps = {
  httpCode?: number;
  message?: string;
};

export {
  HttpResponse,
  ok,
  created,
  accepted,
  clientError,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  tooMany,
  fail,
  unprocessable,
  genericError,
  noContent,
};
