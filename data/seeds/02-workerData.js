exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("workerData")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("workerData").insert([
        {
          worker_id: 1,
          time: "9 months",
          tagline: "Service, Just The Best.",
          job_title: "server",
          company: "Applebee's",
          tip_total: "88.42"
        },
        {
          worker_id: 2,
          time: "4 months",
          tagline: "I wish I had luggage.",
          job_title: "bellhop",
          company: "Marriott",
          tip_total: "26.54"
        },
        {
          worker_id: 4,
          time: "1 year 2 months",
          tagline: "Behold the power of cool.",
          job_title: "waiter",
          company: "Olive Garden",
          tip_total: "512.42"
        }
      ]);
    });
};
