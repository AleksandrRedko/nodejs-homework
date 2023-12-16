const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contacts = require("./db/contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const contactsById = await contacts.getContactById(id);
      return console.table(contactsById);

    case "add":
      const addContacts = await contacts.addContact({ name, email, phone });
      return console.table(addContacts);

    case "remove":
      const removeContacts = await contacts.removeContact(id);
      return console.table(removeContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const argv = yargs(hideBin(process.argv)).argv;
invokeAction(argv);
