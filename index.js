import express from 'express';
import cors from 'cors';

// Подключение необходимых модулей
const sqlite3 = 'sqlite3';
// Инициализация приложения Express
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Создаем подключение к базе данных в памяти
let db = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    }
});

// Создание таблицы (если не существует)
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY,
      day_of_week TEXT, 
      week_type TEXT,
      group_name TEXT,
      subject TEXT,
      teacher TEXT,
      classroom TEXT,
      time TEXT,
      subgroup TEXT,
      specification TEXT
    )
  `);
});

app.post('/schedule/classroom', (req, res) => {
    const { classroom, group_name } = req.body;
    let sql;
    let params;

    sql = `
            SELECT * FROM schedule  
            WHERE classroom LIKE ? AND group_name LIKE ?
        `;
    params = [`%${classroom}%`, `%${group_name}%`]; // Используем LIKE и добавляем символы подстановки %

    // Выполняем SQL запрос с переданными параметрами
    db.all(sql, params, (err, rows) => {
        if (err) {
            return console.error('48 ' + err.message);
        }
        console.log(rows);
        res.json(rows); // Отправляем результаты пользователю
    });
});

app.post('/schedule/filter', (req, res) => {
    const { day_of_week, group_name, week_type } = req.body;
    let sql;
    let params;

    sql = `
            SELECT * FROM schedule  
            WHERE day_of_week = ? AND group_name LIKE ? AND week_type = ?
        `;
    params = [day_of_week, `%${group_name}%`]; // Используем LIKE и добавляем символы подстановки %

    if (week_type === '-') {
        sql = `
            SELECT * FROM schedule 
            WHERE day_of_week = ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Верхняя' OR week_type = 'Нижняя')
        `;
        params = [day_of_week, `%${group_name}%`, week_type];
    } else if (week_type === 'Нижняя') {
        sql = `
            SELECT * FROM schedule 
            WHERE day_of_week = ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Нижняя')
        `;
        params = [day_of_week, `%${group_name}%`, week_type];
    } else if (week_type === 'Верхняя') {
        sql = `
            SELECT * FROM schedule 
            WHERE day_of_week = ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Верхняя')
        `;
        params = [day_of_week, `%${group_name}%`, week_type];
    } else {
        sql = `
            SELECT * FROM schedule 
            WHERE day_of_week = ? AND group_name LIKE ? AND week_type = ?
        `;
        params = [day_of_week, `%${group_name}%`, week_type];
    }

    // Выполняем SQL запрос с переданными параметрами
    db.all(sql, params, (err, rows) => {
        if (err) {
            return console.error('48 ' + err.message);
        }
        console.log(rows);
        res.json(rows); // Отправляем результаты пользователю
    });
});

app.post('/schedule/teacher', (req, res) => {
    const { teacher, week_type, group_name } = req.body;

    if (week_type === '-') {
        sql = `
            SELECT * FROM schedule 
            WHERE teacher LIKE ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Верхняя' OR week_type = 'Нижняя')
        `;
        params = [`%${teacher}%`, `%${group_name}%`, week_type];
    } else if (week_type === 'Нижняя') {
        sql = `
            SELECT * FROM schedule 
            WHERE teacher LIKE ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Нижняя')
        `;
        params = [`%${teacher}%`, `%${group_name}%`, week_type];
    } else if (week_type === 'Верхняя') {
        sql = `
            SELECT * FROM schedule 
            WHERE teacher LIKE ? AND group_name LIKE ? AND (week_type = ? OR week_type = 'Верхняя')
        `;
        params = [`%${teacher}%`, `%${group_name}%`, week_type];
    } else {
        sql = `
            SELECT * FROM schedule 
            WHERE teacher LIKE ? AND group_name LIKE ? AND week_type = ?
        `;
        params = [`%${teacher}%`, `%${group_name}%`, week_type];
    }

    // Выполняем SQL запрос с переданными параметрами
    db.all(sql, params, (err, rows) => {
        if (err) {
            return console.error('48 ' + err.message);
        }
        console.log(rows);
        res.json(rows); // Отправляем результаты пользователю
    });
});

//
// Обработчик POST запроса для добавления записи
app.post('/schedule/records', (req, res) => {
    const records = req.body;

    if (!Array.isArray(records)) {
        return res.status(400).json({ error: 'Request body should be an array of objects' });
    }

    const insertQuery = `INSERT INTO schedule (day_of_week, week_type, group_name, subject, teacher, classroom, time, subgroup, specification) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Используем транзакцию для вставки всех записей в одном запросе
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        records.forEach((record) => {
            const {
                day_of_week,
                week_type,
                group_name,
                subject,
                teacher,
                classroom,
                time,
                subgroup,
                specification,
            } = record;
            db.run(
                insertQuery,
                [
                    day_of_week,
                    week_type,
                    group_name,
                    subject,
                    teacher,
                    classroom,
                    time,
                    subgroup,
                    specification,
                ],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                },
            );
        });

        db.run('COMMIT', (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Records added successfully' });
        });
    });
});

// Обработчик POST запроса для поиска записи в расписании
app.post('/schedule', (req, res) => {
    // Получение значений полей из тела запроса
    const { day_of_week, week_type, group_name } = req.body;

    // Поиск записи в расписании с заданными параметрами
    const scheduleEntry = scheduleData.find(
        (entry) =>
            entry.day_of_week === day_of_week &&
            entry.week_type === week_type &&
            entry.group_name === group_name,
    );

    // Если запись найдена, вернуть её
    if (scheduleEntry) {
        res.json(scheduleEntry);
    } else {
        // Если запись не найдена, вернуть сообщение об ошибке
        res.status(404).json({ error: 'Schedule entry not found' });
    }
});

// Обработчик GET запроса для получения расписания
app.get('/schedule', (req, res) => {
    // Выборка всего расписания из базы данных
    db.all('SELECT * FROM schedule', (err, rows) => {
        if (err) {
            return console.error('107 ' + err.message);
        }
        console.log(rows);
        res.json(rows);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
