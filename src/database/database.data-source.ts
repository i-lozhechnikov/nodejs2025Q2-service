import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artists.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from '../favorites/entities/favorites.entity';
import * as path from 'node:path';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Album, Artist, Track, Favorites],
  migrations: [path.join('dist', 'migrations', '*.js')],
  synchronize: false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
