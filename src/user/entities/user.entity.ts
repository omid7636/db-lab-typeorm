import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Todo } from '../../todo/entities/todo.entity'

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

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[]
}
