import { Injectable } from '@nestjs/common'
import { PersonDto } from './dto/person.dto'

@Injectable()
export class HelloService {
  async welcome(person: PersonDto): Promise<string> {
    const { year, name } = person

    if (year) {
      const age = new Date().getFullYear() - year
      return `Welcome ${name} - your are ${age} years old!`
    }

    return `Welcome ${name} - your birthday is Undefined!!!`
  }
}
