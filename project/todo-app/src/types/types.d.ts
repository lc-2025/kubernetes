import 'express-session';
import { TTodos } from './Todo';

declare module 'express-session' {
  interface SessionData {
    todos?: TTodos,
  }
}
