import fs from "node:fs/promises";

const contactsPath = "db/contacts.json";

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filterContact = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterContact, null, 2));
    return filterContact;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}
