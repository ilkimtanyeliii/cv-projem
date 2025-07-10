document.getElementById("cv-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const linkedin = document.getElementById("linkedin").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;
  const photoFile = document.getElementById("photo").files[0];

  const createCV = (photoHTML = "") => {
    const output = `
      ${photoHTML}
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>E-Posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ""}
      <p><strong>Eğitim:</strong><br>${education.replace(/\n/g, "<br>")}</p>
      <p><strong>Deneyim:</strong><br>${experience.replace(/\n/g, "<br>")}</p>
      <p><strong>Beceriler:</strong> ${skills}</p>
    `;
    document.getElementById("cv-output").innerHTML = output;
    document.getElementById("cv-preview").style.display = "block";
  };

  // Fotoğraf varsa yükle ve sonra CV'yi oluştur
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const photoHTML = `<img src="${event.target.result}" alt="Fotoğraf" style="max-width:150px; border-radius:10px; margin-bottom:10px;" />`;
      createCV(photoHTML);
    };
    reader.readAsDataURL(photoFile);
  } else {
    createCV(); // Fotoğraf yoksa
  }
});

// PDF oluşturma
document.getElementById("download-pdf").addEventListener("click", function () {
  const cv = document.getElementById("cv-output").innerHTML;
  const newWindow = window.open("", "", "width=800,height=600");
  newWindow.document.write("<html><head><title>CV</title></head><body>");
  newWindow.document.write(cv);
  newWindow.document.write("</body></html>");
  newWindow.document.close();
  newWindow.print();
});

// Tema işlemleri
const themeBtn = document.getElementById("toggle-theme");
const currentTheme = localStorage.getItem("theme");

// Tema başlatılırken
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️ Açık Mod";
}

// Sistem temasını algıla
if (!currentTheme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Açık Mod";
  }
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️ Açık Mod" : "🌙 Karanlık Mod";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


