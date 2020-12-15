import { Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Item } from './item.entity'
import { Todo } from './todo.entity'

@Entity()
export class Category {
  @PrimaryColumn({ length: 20 })
  name: string

  @OneToMany(() => Todo, todo => todo.category)
  todos: Todo[]

  @OneToMany(() => Item, item => item.category)
  items: Item[]
}
