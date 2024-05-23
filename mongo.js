const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://atte:${password}@phonebookcluster.ic95lk8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=PhoneBookCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  //This retrieves all existing persons in the Phone Book
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length>4){
  //This generates new notes
  person.save().then(result => {
    console.log('Added '+person.name+" number "+person.number+" to phonebook ")
    mongoose.connection.close()
  })
}



