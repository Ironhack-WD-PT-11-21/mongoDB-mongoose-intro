const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Cat = require('./models/Cat');

const app = express();


mongoose.connect('mongodb://localhost/myAnimals')
    .then(response => console.log(`Connected to ${response.connections[0].name}`))
    .catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('yo');
});

app.get('/cats', (req, res) => {
    Cat.find()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
});

app.get('/users', (req, res) => {
    User.find()
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            console.log(error)
        })
});


const createCat = (name, color, age) => {
    const newCat = new Cat({ name, color, age });
    newCat.save()
        .then(newCreatedCat => console.log(newCreatedCat))
        .catch(error => console.log(error));
}

// createCat('Misty', 'white', 4);
// createCat('Pipou', 'brown', 2);
// createCat('Masha', 'black', 3);


const getMisty = () => {
    Cat.findOne({ name: 'Misty' })
        .then(match => console.log(match))
        .catch(error => console.log(error))
}

const get4yearsOld = () => {
    Cat.find(
        { age: { $lt: 6 } },    // filter
        { _id: 0, age: 1 },    // projection
        { sort: { age: 1 } }             // sort
    )
        .then(match => console.log(match))
        .catch(error => console.log(error))
}

const changeCatName = (oldName, newName) => {
    Cat.updateOne({ name: oldName }, { name: newName })
        .then(updatedCat => console.log(updatedCat))
        .catch(error => console.log(error))
};

// changeCatName('Misty', 'Lili');

const deleteCat = (name) => {
    Cat.deleteOne({ name })
        .then(deletedCat => console.log(deletedCat))
        .catch(error => console.log(error))
};

// deleteCat('Lili');


const deleteOldCats = (age) => {
    Cat.deleteMany({ age: { $gt: age } })
        .then(deletedCats => console.log(deletedCats))
        .catch(error => console.log(error))
}

deleteOldCats(4);

app.listen(3000, () => console.log('listening on 3000...'));