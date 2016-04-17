# ml-bitemporal-example

Bitemporal examples using the MarkLogic Node.js API and REST API.

## Requirements

- MarkLogic
- Node.js

## Running the Examples

1. Install dependencies:

   ```npm install```

2. Copy `config_sample.js` to `config.js` and then edit `config.js` for your environment (username, password).

3. Set up the temporal database, axes, collection, and LSQT:

   ```node setup```

4. Run steps 1 through 4:

   ```node step [1-4]```

   The steps perform temporal inserts and a delete, displaying the temporal documents in the database after each step. (You can also run the steps in Query Console. Import the workspace file `workspace.xml`.)

5. To undo the setup step and start over:

   ```node teardown```
