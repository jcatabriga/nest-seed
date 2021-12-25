import { appConfig } from '@config/app';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TimeoutInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();
    const { url, method } = req;

    const timeoutPhrase = `${appConfig.TIMEOUT}ms timeout on ${method} ${url}`;

    return next.handle().pipe(
      timeout(appConfig.TIMEOUT),
      catchError((err) => {
        this.logger.error(timeoutPhrase);
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException(timeoutPhrase);
        }
        return new err(timeoutPhrase);
      }),
    );
  }
}
