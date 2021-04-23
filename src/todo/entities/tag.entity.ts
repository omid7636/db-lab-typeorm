import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryColumn({ length: 20 })
  name: string
}
