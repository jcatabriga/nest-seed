import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseQueryNumberPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata) {
    if (!value) {
      return undefined;
    }

    const parsed = Number(value);

    if (isNaN(parsed)) {
      throw new BadRequestException(`Invalid Query '${metadata.data}'`);
    }
    return parsed;
  }
}
