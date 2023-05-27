import axios from "axios";

export class ContactService{
	static serverUrl = `http://localhost:9000`;

	static getAllContacts(){
		let dataURL = `${this.serverUrl}/contacts`;
		return axios.get(dataURL);
	}

	static getContact(contactId){
		let dataURL = `${this.serverUrl}/contacts/${contactId}`;
		return axios.get(dataURL);
	}

	static createContact(contact){
		let dataURL = `${this.serverUrl}/contacts/`;
		return axios.post(dataURL,contact);
	}

	static updateContact(contact, contactId){
		let dataURL = `${this.serverUrl}/contacts/${contactId}`;
		return axios.put(dataURL,contact);
	}

	static deleteContact(contactId){
		let dataURL = `${this.serverUrl}/contacts/${contactId}`;
		return axios.delete(dataURL);
	}

	static getAllGroups(){
		let dataURL = `${this.serverUrl}/groups`;
		return axios.get(dataURL);
	}

	static getGroup(contact){
		let groupId = contact.groupId;
		let dataURL = `${this.serverUrl}/groups/${groupId}`;
		return axios.get(dataURL);
	}
}