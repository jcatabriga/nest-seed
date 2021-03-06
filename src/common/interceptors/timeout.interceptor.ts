import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TimeoutInterceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const [req] = context.getArgs();
    const { url, method } = req;

    const timeoutTime = Number(process.env.TIMEOUT) || 8000;

    const timeoutPhrase = `${timeoutTime}ms timeout on ${method} ${url}`;

    return next.handle().pipe(
      timeout(timeoutTime),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this.logger.error(timeoutPhrase);
          throw new RequestTimeoutException(timeoutPhrase);
        }
        if (err.status >= 400 || err.status < 500) {
          throw new BadRequestException(err.response.message);
        }
        throw new InternalServerErrorException(err);
      }),
    );
  }
}
