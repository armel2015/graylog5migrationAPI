/**
 * This files group global application types that are not domain-specific.
 * Put domain-specific types in src/<domain-name>/types.js
 */
import { keyValues } from './config.js';

export const Environment = 'dev' | 'tst' | 'acc' | 'prd';

export const RouteName = (keyValues.routeName)[Number];
