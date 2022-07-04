const knex = require("../db/connection")

async function list(student){
    return knex("student")
        .select("*");
}

async function read(student_id){
    return knex("student")
        .select("*")
        .where({student_id})
        .first();
}

async function create(student){
    return knex("student")
        .insert(student)
        .returning("*").then((createdRecord) => createdRecord[0]);
}

module.exports = {
    list,
    read,
    create
}