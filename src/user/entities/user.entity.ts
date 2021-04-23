import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Book } from '../../book/entities/book.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column({ length: 500 })
  username: string

  @Column({ length: 500 })
  password: string

  // 1:n relation with bookEntity
  @OneToMany(() => Book, book => book.user)
  books: Book[]
}
