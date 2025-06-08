export default {
  AUDIENCE_NOT_FOUND: { message: "AUDIENCE_NOT_FOUND", statusCode: 404 },
  AUDIENCE_ALREADY_EXISTS: { message: "AUDIENCE_ALREADY_EXISTS", statusCode: 409 },

  BAD_REQUEST: { message: "BAD_REQUEST", statusCode: 400 },

  CHAT_ID_REQUIRED: { message: "CHAT_ID_REQUIRED", statusCode: 400 },

  GROUP_NOT_FOUND: { message: "GROUP_NOT_FOUND", statusCode: 404 },

  INTERNAL_SERVER_ERROR: { message: "INTERNAL_SERVER_ERROR", statusCode: 500 },
  INVALID_DATA: { message: "INVALID_DATA", statusCode: 400 },

  LESSON_NOT_FOUND: { message: "LESSON_NOT_FOUND", statusCode: 404 },

  NOT_FOUND: { message: "NOT_FOUND", statusCode: 404 },

  RECURRENCE_NOT_FOUND: { message: "RECURRENCE_NOT_FOUND", statusCode: 404 },

  SUBJECT_NOT_FOUND: { message: "SUBJECT_NOT_FOUND", statusCode: 404 },

  TEACHER_NOT_FOUND: { message: "TEACHER_NOT_FOUND", statusCode: 404 },
  TOO_MANY_REQUESTS: { message: "TOO_MANY_REQUESTS", statusCode: 429 },

  UNAUTHORIZED: { message: "UNAUTHORIZED", statusCode: 401 },
  USER_ALREADY_EXISTS: { message: "USER_ALREADY_EXISTS", statusCode: 409 },
  USER_NOT_FOUND: { message: "USER_NOT_FOUND", statusCode: 404 },
} as const;
