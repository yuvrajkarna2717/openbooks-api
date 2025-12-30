export const up = function(knex) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.boolean('stock').notNullable();
    table.integer('rating').notNullable();
    table.text('link').notNullable();
    table.string('stockInfo');
    table.text('imageLink');
    table.timestamps(true, true);
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('books');
};