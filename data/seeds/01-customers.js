exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("customers").insert([
        {
          id: 1,
          username: "bob1965",
          password: "password123",
          first_name: "Bob",
          last_name: "Odenkirk",
          image: "https://randomuser.me/api/portraits/men/64.jpg"
        },
        {
          id: 2,
          username: "bmac5465",
          password: "pass555",
          first_name: "Brandon",
          last_name: "McCoy",
          image: "https://randomuser.me/api/portraits/men/60.jpg"
        },
        {
          id: 3,
          username: "letitgo76",
          password: "booooo123",
          first_name: "Juana",
          last_name: "Perez",
          image: "https://randomuser.me/api/portraits/women/19.jpg"
        },
        {
          id: 4,
          username: "professorX",
          password: "magneto",
          first_name: "James",
          last_name: "Coan",
          image: "https://randomuser.me/api/portraits/men/68.jpg"
        }
      ]);
    });
};
