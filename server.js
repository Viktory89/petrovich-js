const express = require("express");
const Petrovich = require("petrovich");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/sklonenie", (req, res) => {
    const { fio } = req.query;
    if (!fio) {
        return res.status(400).json({ error: "Укажите ФИО в параметре fio" });
    }

    const parts = fio.split(" ");
    if (parts.length < 2) {
        return res.status(400).json({ error: "Введите минимум фамилию и имя" });
    }

    const lastName = Petrovich.lastname(parts[0], "genitive");
    const firstName = Petrovich.firstname(parts[1], "genitive");
    const middleName = parts[2] ? Petrovich.middlename(parts[2], "genitive") : "";

    res.json({ rod: `${lastName} ${firstName} ${middleName}`.trim() });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
