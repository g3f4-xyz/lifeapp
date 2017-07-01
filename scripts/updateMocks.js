#!/usr/bin/env babel-node --optional es7.asyncFunctions
import fs from 'fs';
import path from 'path';
import mocks from '../server/mocks';

fs.writeFileSync(
  // mocks destiny file
  path.join(__dirname, '../server/mocks/data.json'),
  // stringifing mocks object to write in JSON file
  JSON.stringify(mocks, null, 2)
);

console.log(['DONE']);