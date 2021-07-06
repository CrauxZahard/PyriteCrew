module.exports = (client, database) => {
  const db = new database({
  path: './databases/',
  tables: [{name: 'cooldown'}, {name: 'main'}]
  })
  db.on('ready', () => console.log('database is ready'))
  db.connect()
  client.db = db
}
