import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ default: null })
  public artistId?: string;

  @Column({ default: null })
  public albumId?: string;

  @Column()
  public duration: number;
}
