export enum UserDropdownItemType {
  INFO,
  ACTION,
}

export enum UserDropdownButtonType {
  PRIMARY,
  NORMAL,
}

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum TagAction {
  ADD,
  EDIT,
  DELETE,
}

export const StatusCode: Record<0 | 1 | 2, string> = {
  0: "Pending",
  1: "Success",
  2: "Failed",
};
