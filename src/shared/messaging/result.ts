export class OkResult<ResultData> {
  constructor(public readonly data: ResultData) {}
}

export class FailureResult {
  // TODO: rename reason to error, add stack and error name
  constructor(public readonly reason: string) {}
}

export type Result<ResultData> = OkResult<ResultData> | FailureResult;
