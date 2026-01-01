const express = require('express');
const path = require('path');

const app = express();
const root = path.join(__dirname, 'dist');

app.use(express.static(root));

// ✅ REGEX fallback (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

