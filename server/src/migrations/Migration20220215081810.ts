import { Migration } from '@mikro-orm/migrations';

export class Migration20220215081810 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
