import { Column, Entity } from 'typeorm';

@Entity()
export class Favorites {
  @Column({ default: [] })
  public artists: string[];

  @Column({ default: [] })
  public albums: string[];

  @Column({ default: [] })
  public tracks: string[];
}
