import { Migration } from '@mikro-orm/migrations';

export class Migration20220215075742 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "uuid" varchar(255) not null;');
    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql('alter table "post" drop column "id";');
    this.addSql('alter table "post" add constraint "post_pkey" primary key ("uuid");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "id" serial;');
    this.addSql('alter table "post" drop constraint "post_pkey";');
    this.addSql('alter table "post" drop column "uuid";');
    this.addSql('alter table "post" add constraint "post_pkey" primary key ("id");');
  }

}
