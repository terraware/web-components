const fs = require('fs');

const data = `${process.env.JIRA} ${process.env.DESCRIPTION}\n\n${process.env.DESCRIPTION}`;

fs.writeFile('/tmp/commit-message', data, (err) => {
  if (err) {
    process.stderr.write(err);
  }
});
