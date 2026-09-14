import { handleContact } from '../../server/contact.js'

export const onRequest = context => handleContact(context)
