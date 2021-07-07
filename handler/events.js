const fs = require('fs');
module.exports = client => {
  const events = fs.readdirSync('./events/')
for (let event of events) {
	let eventFile = require(`../events/${event}`)
	client.on(event.split('.')[0], (...args) => eventFile(client, ...args))
}
  
}
