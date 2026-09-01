import { validationProfiles } from '../__tests__/fixtures/validationProfiles.js'
import { formatValidationReport, validateProfile } from './validateProfiles.js'

process.stdout.write(`${formatValidationReport(validationProfiles.map(validateProfile))}\n`)
