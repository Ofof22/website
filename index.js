const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bot = require('./bot.js')
// views klasörünü statik olarak sunmak için
app.use(express.static(path.join(__dirname, 'views')));

// Tüm .html dosyalarını views klasöründen almak için
app.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'views', `${filename}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Dosya bulunamadı');
  }
});

app.get('/blog/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'views', 'blog', `${filename}.html`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Dosya bulunamadı');
  }
});

// Admin Paneli için form sayfasını sunmak için
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Blog oluşturma işlemini işlemek için POST yönlendirmesi
app.post('/admin/create', (req, res) => {
  const templatePath = path.join(__dirname, 'views', 'blog', 'şablon.txt');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const blogCount = fs.readdirSync(path.join(__dirname, 'views', 'blog')).length;

  const newBlogName = `blog${blogCount + 1}`;
  const newBlogPath = path.join(__dirname, 'views', 'blog', `${newBlogName}.html`);

  const description = req.body.description; // Burada gerçek veri girişi veya formdan veri alma mekanizması kullanmanız gerekebilir

  const newBlogContent = template.replace('{{description}}', description);
  fs.writeFileSync(newBlogPath, newBlogContent);

  res.send('Blog oluşturuldu!');
});

// Sunucuyu dinlemek için
app.listen(3000, () => {
  console.log('Sunucu çalışıyor...');
});
