import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Genre } from '../../genre/entities/genre.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  // n:1 relation with books
  @ManyToOne(() => User, user => user.books)
  user: User

  // n:n relation with genre
  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[]
}
