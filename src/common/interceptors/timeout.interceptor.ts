import { appConfig } from '@config/app';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TimeoutInterceptor');

  intercept(context: ExecutionContext, next: CallHandler) {
    const [req] = context.getArgs();
    const { url, method } = req;

    const timeoutPhrase = `${appConfig.TIMEOUT}ms timeout on ${method} ${url}`;

    return next.handle().pipe(
      timeout(appConfig.TIMEOUT),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this.logger.error(timeoutPhrase);
          throw new RequestTimeoutException(timeoutPhrase);
        }
        if (err.status >= 400 || err.status < 500) {
          throw new BadRequestException(err.response.message);
        }
        throw new Error(err.message);
      }),
    );
  }
}
