import type { Access } from 'payload'

/** Anyone (the public website) can read. */
export const anyone: Access = () => true

/** Only signed-in admin users. */
export const loggedIn: Access = ({ req }) => Boolean(req.user)
