import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1749489978029 implements MigrationInterface {
  name = 'Version1749489978029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites_artists_artist" ("favoritesId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_a6aeacbfda85e00ccc625a84474" PRIMARY KEY ("favoritesId", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_663b6278dbd0f67925d1238ade" ON "favorites_artists_artist" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_albums_album" ("favoritesId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4caba2d65763821c7dd2db51558" PRIMARY KEY ("favoritesId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31b327b5a4f89d2eb722968982" ON "favorites_albums_album" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId") `,
    );
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "artists"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "albums"`);
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_663b6278dbd0f67925d1238ade2" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_31b327b5a4f89d2eb7229689829" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_31b327b5a4f89d2eb7229689829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_663b6278dbd0f67925d1238ade2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "albums" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "artists" text array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31b327b5a4f89d2eb722968982"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_663b6278dbd0f67925d1238ade"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_artists_artist"`);
  }
}
