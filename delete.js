te_path>c:/Users/Admin/Desktop/testing/delete.js</absolute_path>
<parameter name="content">const fs = require('fs');
try {
  fs.unlinkSync('c:/Users/Admin/Desktop/testing/dist/index.html');
  console.log('File deleted');
} catch(e) {
  console.log('Error:', e.message);
}
