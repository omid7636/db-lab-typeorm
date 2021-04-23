import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Todo } from './todo.entity'
import { Category } from './category.entity'

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 1000 })
  description: string

  @ManyToOne(() => Todo, todo => todo.items)
  todo: Todo

  @ManyToOne(() => Category, category => category.items)
  category: Category
}
