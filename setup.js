
const mysql = require('mysql2');
var config = {
    host: 'ww-data-host.mysql.database.azure.com',
    user: 'database@ww-data-host',
    password: 'uJHeCu3P!',
    port: 3306,
    ssl: true
};
const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");

            var sql = "DROP DATABASE IF EXISTS calendarDb;";

            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });


            sql = "CREATE Database calendarDb;"
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "USE calendarDb"
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `Calendar` (`id` varchar(50) NOT NULL ,`name` TEXT NOT NULL, `description` TEXT NOT NULL,PRIMARY KEY (`id`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `Notification` (`id` varchar(50) NOT NULL,`appointmentId` varchar(50) NOT NULL UNIQUE,`notification` TEXT NOT NULL,`time` TIMESTAMP NOT NULL,PRIMARY KEY (`id`,`appointmentId`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `Appointment` (`id` varchar(50) NOT NULL,`calendarID` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`Name` TEXT NOT NULL,`description` TEXT NOT NULL,`location` TEXT NOT NULL,`startDate` DATE NOT NULL,`endDate` DATE NOT NULL,PRIMARY KEY (`id`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `UserAppointment` (`id` varchar(50) NOT NULL, `userId` varchar(50) NOT NULL,`appointmentId` varchar(50) NOT NULL,`state` varchar(50) NOT NULL,PRIMARY KEY (`userId`,`appointmentId`, `id`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "ALTER TABLE `Notification` ADD CONSTRAINT `Notification_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_fk0` FOREIGN KEY (`calendarID`) REFERENCES `Calendar`(`id`);";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "ALTER TABLE `UserAppointment` ADD CONSTRAINT `UserAppointment_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
                conn.end();
            });
        }
    });

