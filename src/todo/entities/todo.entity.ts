import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm'
import { Item } from './item.entity'
import { Tag } from './tag.entity'
import { Category } from './category.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 1000, nullable: true })
  description: string

  @OneToMany(() => Item, item => item.todo)
  items: Item[]

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

  @ManyToOne(() => Category, category => category.todos)
  category: Category

  @ManyToOne(() => User, user => user.todos)
  user: User
}
