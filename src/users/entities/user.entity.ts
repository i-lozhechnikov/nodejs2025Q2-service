import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @Column({ default: 1 })
  public version: number;

  @CreateDateColumn()
  public createdAt: number;

  @UpdateDateColumn()
  public updatedAt: number;
}
