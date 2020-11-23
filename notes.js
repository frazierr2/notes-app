const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
  const notes = loadNotes()
  // Find if notes have the same title that is being passed in.
  const duplicateNote = notes.find((note) => note.title === title)
  //if NO duplicate add, else throw error.
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    console.log(chalk.green('New Note Added!'))
    saveNotes(notes)
  } else {
    console.log(chalk.red('Note Title is already taken!'))
  }

}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  //if the notes we gather is bigger than the notesToKeep then removed.
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red('No note found!'))
  }

}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your Notes'))
  notes.forEach(note => console.log(chalk.blue.inverse(note.title)));
}

const readNote = (title) => {
  const notes = loadNotes()
  const selectedNote = notes.find((note) => note.title === title)

  if (selectedNote) {
    console.log('Title: ', chalk.whiteBright.inverse(selectedNote.title), ' Body: ', selectedNote.body)
  } else {
    console.log(chalk.red('No note found?'))
  }
}

// =============================================================================================================
//resuable
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}
//reusable
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}

