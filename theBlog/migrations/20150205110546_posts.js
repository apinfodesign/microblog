'use strict';

exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', function(table){
	  	table.increments('id').primary();	
	  	table.integer('author_id');
		table.string('text');
	});
};

 

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
 };
