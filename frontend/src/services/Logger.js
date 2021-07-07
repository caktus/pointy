import { LOGGING_ENABLED } from './config';

export default message => {
    if (LOGGING_ENABLED) console.log(`${Date()} --- ${message}`)
}