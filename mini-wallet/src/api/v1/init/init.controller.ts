import { Controller, Post } from '@nestjs/common';

@Controller()
export class InitController {
  constructor() {}

  @Post()
  init() {}
}
