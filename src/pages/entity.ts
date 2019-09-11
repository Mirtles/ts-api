import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'

// creating table in DB
@Entity()
export default class Page extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
// must have string as title with length between 5- 25
  @IsString()
  @Length(5,25)
  @Column('text')
  title: string

  @IsString()
  @MinLength(10)
  @Column('text')
  content: string
}