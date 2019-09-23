exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users.string("first_name", 128).notNullable();
      users.string("last_name", 128).notNullable();
      users.string("role", 128).notNullable();
      users.string("image", 256);
    })
    .createTable("workerData", wData => {
      wData
        .integer("worker_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      wData.string("time", 128).notNullable();
      wData.string("tagline").notNullable();
      wData.string("job_title").notNullable();
      wData.string("company").notNullable();
      wData.decimal("tip_total");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("workerData").dropTableIfExists("users");
};
