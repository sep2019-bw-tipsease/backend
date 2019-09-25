exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("workers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("workers").insert([
        {
          id: 1,
          username: "kayla44",
          password: "password123",
          first_name: "Kayla",
          last_name: "Brown",
          time: "9 months",
          tagline: "Service, Just The Best.",
          job_title: "server",
          company: "Applebee's",
          tip_total: "88.42"
        },
        {
          id: 2,
          username: "susano",
          password: "password123",
          first_name: "Susan",
          last_name: "Omelet",
          time: "4 months",
          tagline: "I wish I had luggage.",
          job_title: "bellhop",
          company: "Marriott",
          tip_total: "26.54"
        },
        {
          id: 3,
          username: "bmac5465",
          password: "pass555",
          first_name: "Brandon",
          last_name: "McCoy",
          time: "1 year 2 months",
          tagline: "Behold the power of cool.",
          job_title: "waiter",
          company: "Olive Garden",
          tip_total: "52.42"
        }
      ]);
    });
};
