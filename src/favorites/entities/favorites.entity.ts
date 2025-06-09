import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';
import { Artist } from '../../artists/entities/artists.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToMany(() => Artist)
  @JoinTable()
  public artists: Artist[];

  @ManyToMany(() => Album)
  @JoinTable()
  public albums: Album[];

  @ManyToMany(() => Track)
  @JoinTable()
  public tracks: Track[];
}
