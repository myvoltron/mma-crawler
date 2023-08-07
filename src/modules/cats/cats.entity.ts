import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  name: string;

  @Column()
  kind: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
