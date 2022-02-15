import { Migration } from '@mikro-orm/migrations';

export class Migration20220215082309 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" rename column "uuid" to "id";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql('alter table "post" rename column "uuid" to "id";');
    this.addSql('alter table "post" add constraint "post_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" rename column "id" to "uuid";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');

    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql('alter table "post" rename column "id" to "uuid";');
    this.addSql('alter table "post" add constraint "post_pkey" primary key ("uuid");');
  }

}
