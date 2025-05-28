import { Artist } from '../../artists/entities/artists.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

export class FavoritesResponse {
  public artists: Artist[];

  public albums: Album[];

  public tracks: Track[];
}
