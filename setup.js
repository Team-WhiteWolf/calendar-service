
const mysql = require('mysql2');
var config = {
    host: 'icon-db.mysql.database.azure.com',
    user: 'wolf@icon-db',
    password: 'EJ6chESAmK',
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

            var sql = "DROP DATABASE calendarDb;";

            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql = [
                "CREATE Database calendarDb;",
                "USE calendarDb CREATE TABLE `Calendar` (`id` varchar(50) NOT NULL AUTO_INCREMENT,`name` TEXT NOT NULL, `description` TEXT NOT NULL,PRIMARY KEY (`id`));",
                "USE calendarDb CREATE TABLE `Notification` (`id` varchar NOT NULL,`appointmentId` varchar(50) NOT NULL UNIQUE,`notification` TEXT NOT NULL UNIQUE,`time` TIMESTAMP NOT NULL,PRIMARY KEY (`id`,`appointmentId`));",
                "USE calendarDb CREATE TABLE `Appointment` (`id` varchar(50) NOT NULL,`calendarID` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`Name` TEXT NOT NULL,`description` TEXT NOT NULL,`location` TEXT NOT NULL,`startDate` DATE NOT NULL,`endDate` DATE NOT NULL,PRIMARY KEY (`id`));",
                "USE calendarDb CREATE TABLE `UserAppointment` (`userId` varchar(50) NOT NULL,`appointmentId` varchar(50) NOT NULL,`state` varchar(50) NOT NULL,PRIMARY KEY (`userId`,`appointmentId`));",
                "ALTER TABLE `Notification` ADD CONSTRAINT `Notification_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);",
                "ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_fk0` FOREIGN KEY (`calendarID`) REFERENCES `Calendar`(`id`);",
                "ALTER TABLE `UserAppointment` ADD CONSTRAINT `UserAppointment_fk0` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`);",
            ];
            for (i in sql) {
                conn.query(i, function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
    });

