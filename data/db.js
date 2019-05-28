const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  users: {
    find: findUsers,
    findById: findUsersById,
    insert: insertUsers,
    update: updateUsers,
    remove: removeUsers,
  }
};

let _users =  [
  {
  "name": "Jane Doe", // String, required
  "bio": "Not Tarzan's Wife, another Jane",  // String
  "created_at": Date(),// Date, defaults to current date
  "updated_at": Date()// Date, defaults to current date
  }
]
function findUsers() {
  return db('users');
}

function findUsersById(id) {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

function insertUsers(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function updateUsers(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

function removeUsers(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
