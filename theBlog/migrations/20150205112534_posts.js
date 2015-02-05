'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function (table) {
		table.increments('id');
		table.integer('author_id').references('id').inTable('users');
		table.string('text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
