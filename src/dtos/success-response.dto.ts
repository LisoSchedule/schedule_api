export class SuccessResponseDto<T> {
  constructor(data: T, message?: string) {
    Object.assign(this, { success: true, message, data });
  }

  success!: boolean;
  data!: T;
}
