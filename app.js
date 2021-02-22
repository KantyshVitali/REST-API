const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();

let CONTACTS = [
	{	id: v4(), name: "Vitali", value: "+375-xx-xxx-xx-xx", noted: false },
]

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
	res.status(200).json(CONTACTS);
});

//POST
app.post('/api/contacts', (req, res) => {
	const contact = {...req.body, id: v4(), noted: false};	
	CONTACTS.push(contact);
	res.status(201).json(contact);
})

//DELETE 
app.delete('/api/contacts/:id', (req, res) => {
	CONTACTS = CONTACTS.filter(x => x.id !== req.params.id);
	res.status(200).json({message: 'Contact was Deleted'});
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
	const putIndex = CONTACTS.findIndex(c => c.id === req.params.id);
	CONTACTS[putIndex] = req.body;
	res.status(200).json(CONTACTS[putIndex]);
})


app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.listen(8000, () => console.log('Server has been started on port 8000...'));
