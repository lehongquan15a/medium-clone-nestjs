import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  findAll(): string[] {
    return ['Le', 'Hong', 'Quan', '+', 'Nguyen', 'Thi', 'Anh'];
  }
}
