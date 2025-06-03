import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { array: true, default: () => "'{}'" })
  public artists: string[];

  @Column('text', { array: true, default: () => "'{}'" })
  public albums: string[];

  @Column('text', { array: true, default: () => "'{}'" })
  public tracks: string[];
}
