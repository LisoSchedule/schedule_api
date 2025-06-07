export default {
  CREATED: { message: "CREATED", statusCode: 201 },

  DELETED: { message: "DELETED", statusCode: 200 },

  FETCHED: { message: "FETCHED", statusCode: 200 },

  GROUP_FETCHED: { message: "GROUP_FETCHED", statusCode: 200 },
  GROUPS_FETCHED: { message: "GROUPS_FETCHED", statusCode: 200 },

  NOTE_ADDED: { message: "NOTE_ADDED", statusCode: 201 },
  NOTIFICATION_SCHEDULED: { message: "NOTIFICATION_SCHEDULED", statusCode: 200 },

  OK: { message: "OK", statusCode: 200 },

  SCHEDULE_FETCHED: { message: "SCHEDULE_FETCHED", statusCode: 200 },

  TEACHER_FETCHED: { message: "TEACHER_FETCHED", statusCode: 200 },
  TEACHERS_FETCHED: { message: "TEACHERS_FETCHED", statusCode: 200 },

  UPDATED: { message: "UPDATED", statusCode: 200 },
  USER_CREATED: { message: "USER_CREATED", statusCode: 201 },
  USER_DELETED: { message: "USER_DELETED", statusCode: 200 },
  USER_FETCHED: { message: "USER_FETCHED", statusCode: 200 },
  USER_UPDATED: { message: "USER_UPDATED", statusCode: 200 },
  USER_SETTINGS_UPDATED: { message: "USER_SETTINGS_UPDATED", statusCode: 200 },
} as const;
