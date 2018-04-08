//import uuid
const uuidv4 = require('uuid/v4');

//Azure Bus
var azure = require('azure');
var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);

//MySQL stuff
const mysql = require('mysql2');
var config =
    {
        host: 'icon-db.mysql.database.azure.com',
        user: 'wolf@icon-db',
        password: 'EJ6chESAmK',
        port: 3306,
        database: 'groupPermissionDb',
        ssl: true
    };
const conn = new mysql.createConnection(config);
const queureName = "calendar";


serviceBusService.receiveQueueMessage((queureName + '-recieve'), function (error, receivedMessage) {
    if (!error) {
        // Message received and deleted
        switch (receivedMessage.type) {
            //TODO
        }
    }
});


function notificationGetAppointmentId(notificationId) {
    var sql = "SELECT appointmentId FROM Notification WHERE id == " + notificationId;

    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function notificationGetNotification(notificationId) {
    var sql = "SELECT notification WHERE id == " + notificationId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function notificationGetTime(notificationId) {
    var sql = "SELECT time FROM Notification WHERE id == " + notificationId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function createNotification(appointmentId, notification) {
    var sql = "INSERT INTO Notification (id, appointmentId, notification, time) WHERE (?, ?, ?, ?)";
    var values = [uuidv4, appointmentId, notification, Math.floor(Date.now() / 1000)];
    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function createAppointment(calendarId, name, description, location, startDate, endDate) {
    var sql = "INSERT INTO Appointment (id, calendarId, creatorId, Name, description, location, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [uuidv4, calendarId, Name, description, location, startDate, endDate];
    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function getCalendarId(appointmentId) {
    var sql = "SELECT calendarId FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getCreator(appointmentId) {
    var sql = "SELECT creator FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getAppointmentName(appointmentId) {
    var sql = "SELECT Name FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getAppointmentDescription(appointmentId) {
    var sql = "SELECT description FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getAppointmentLocation(appointmentId) {
    var sql = "SELECT location FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getAppointmentStartDate(appointmentId) {
    var sql = "SELECT startDate FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getAppointmentEndDate(appointmentId) {
    var sql = "SELECT endDate FROM Appointments WHERE id == " + appointmentId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}

function createUserAppointment() {

}
function userAppointmentState() {

}
function getCalendarname() {

}
function getCalendardescription() {

}




function addIssueMilestone(issueId, milestoneId) {
    var sql = "INSERT INTO IssueMilestone (issueId, milestoneId) VALUES (?, ?)";
    var values = [issueId, milestoneId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function getIssueIdMilestone(milestoneId) {
    var sql = "SELECT issueId FROM IssueMilestone WHERE milestoneId == " + milestoneId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function removeIssueMilestone(issueId, milestoneId) {
    var sql = "DELETE FROM IssueMilestone WHERE issueId == " + issueId + " AND milestoneId == " + milestoneId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}

function createMilestone(projectId) {
    var sql = "INSERT INTO Milestone (id, projectId) VALUES (?, ?);";
    var values = [uuidv4, projectId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function removeMilestone(milestoneId) {
    var sql = "DELETE FROM Milestone WHERE milestoneId == " + milestoneId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}

function createProject(creatorId, iconId, name, description) {
    var sql = "INSERT INTO Project (id, creatorId, iconId, name, description, creationDate) VALUES (?, ?, ?, ?, ?, ?);";
    var values = [uuidv4, creatorId, iconId, name, description, this.date];
    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}

function getIcon(projectId) {
    var sql = "SELECT iconId FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function setIcon(projectId, iconId) {
    //TODO
}
function getName(projectId) {
    var sql = "SELECT name FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getDescription(projectId) {
    var sql = "SELECT name FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getCreationDate(projectId) {
    var sql = "SELECT creationDate FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}



//send message
function send(message) {
    serviceBusService.sendQueueMessage((queureName + '-send'), message, function (error) {
    });
}

//loop (request new messages)
function requestMessage() {
    asbService.receiveQueueMessage((queureName + '-recieve'), handleMessage);
}

function handleMessage(error, receivedMessage) {
    if (error) {
        requestMessage();
        return;
    }

    processMessage(receivedMessage);
    requestMessage();
}

function processMessage(message) {