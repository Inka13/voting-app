const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
	var props = {
		response: "Welcome ",
		userName: "Inka",
		signIn: "Log Out",
		polls: ['Which is easier to use, SQL or MongoDB? Do you prefer PHP or Javascript?','Do you prefer PHP or Javascript?'],              
	}
  res.send(props);
});

app.listen(port, () => console.log(`Listening on port ${port}`));