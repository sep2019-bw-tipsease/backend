exports.up = function(knex) {
  return knex.schema
    .createTable("customers", customers => {
      customers.increments();
      customers
        .string("username", 128)
        .notNullable()
        .unique();
      customers.string("password", 128).notNullable();
      customers.string("first_name", 128).notNullable();
      customers.string("last_name", 128).notNullable();
      customers.string("image", 256);
    })
    .createTable("workers", workers => {
      workers.increments();
      workers
        .string("username", 128)
        .notNullable()
        .unique();
      workers.string("password", 128).notNullable();
      workers.string("first_name", 128).notNullable();
      workers.string("last_name", 128).notNullable();
      workers.string("image", 256);
      workers.string("time", 128).notNullable();
      workers.string("tagline").notNullable();
      workers.string("job_title").notNullable();
      workers.string("company").notNullable();
      workers.decimal("tip_total").defaultTo(0);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("customers")
    .dropTableIfExists("workers");
};
