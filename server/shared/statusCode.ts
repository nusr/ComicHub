/**
 * HTTP Status codes
 */
interface StatusCode {
  [key: string]: number;
}
const statusCode: StatusCode = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504,

  NOT_IMPLEMENTED: 501,
  REQUEST_TIMEOUT: 408,
};
export default statusCode;
