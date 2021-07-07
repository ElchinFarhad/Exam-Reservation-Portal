//----------User req
async function isAuthenticated(){
        const response = await fetch('/api/teacher/auth');
        const userJson = await response.json();
        if(response.ok){
            return userJson;
        } else {
            let err = {status: response.status, errObj:userJson};
            throw err;  // An object with the error coming from the server
        }
    }



async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}



async function userLogout() {
    return new Promise((resolve, reject) => {
        fetch('/api/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{error_msg: "Cannot parse server response" }], err }) }); // something else
            }
        });
    });
}

//-----------------------Teacher
async function getTeacher() {
    const response = await fetch('/api/teacher/portal');
    const result = await response.json();
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}
// async function getPublicStudent() {
//     const response = await fetch('/api/student/portal');
//     const result = await response.json();
//     if(response.ok){
//         return result;
//     } else{
//         throw {error: result}
//     }
// }



//POST checked Students list (update Teacher_Student table)
async function insertSlot(slots) {
    return new Promise((resolve, reject) => {
        fetch('/api/teacher/insertSlot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slots)
        }).then((response) => {
            if (response.ok) {
                // response.json()
                // .then((SID) => {
                     resolve(slots);
                // });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    }


async function getStudentByTID(tid) {
    const response = await fetch('/api/teacher/allStudentlist/'+tid);
    const result = await response.json();
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}
async function getCheckedStudentByTID(tid) {
    const response = await fetch('/api/teacher/checkedStudentlist/'+tid);
    const result = await response.json();
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

async function getTeacherId(name) {
    const response = await fetch('/api/teacher/getTeacherId/'+name);
    const result = await response.json();
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

/////////////////////////////STUDENTS
async function studentLogin(sid) {
    const response = await fetch('/api/studentLogin/'+sid);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

//GET student name
async function getStudentName(SID) {
    const response = await fetch('/api/student/getStudentName/'+SID);
    const result = await response.json();
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

/// GET  Execute Exam - list of reserved slots 
async function listReservedSlots(TID) {
    const response = await fetch('/api/teacher/listReservedSlots/'+TID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

/// GET  Overview Exam - list of reserved slots 
async function overviewReservedSlots(TID) {
    const response = await fetch('/api/teacher/overviewReservedSlots/'+TID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

/// GET  Execute Exam - list of available slots 
async function listAvailableSlots(TID) {
    const response = await fetch('/api/student/listAvailableSlots/'+TID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}

/// GET  Execute Exam - list of available slots 
async function checkStudentBookAccess(TID, SID) {
    const response = await fetch('/api/student/checkStudentBookAccess/'+TID+"/"+SID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {result}
    }
}

//POST student book available slot
async function bookAvailableSlot(ReservedStudent, SlotID) {
    return new Promise((resolve, reject) => {
        fetch('/api/student/bookAvailableSlot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ReservedStudent: ReservedStudent, SlotID: SlotID})
        }).then((response) => {
            if (response.ok) {
                     resolve(SlotID);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    }

   
//POST student book available slot
async function cancelBookedSlot(SlotID) {
    return new Promise((resolve, reject) => {
        fetch(' /api/student/cancelBookedSlot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({SlotID: SlotID})
        }).then((response) => {
            if (response.ok) {
                     resolve(SlotID);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    }



//POST checked Students list (update Teacher_Student table)
async function updateCheckedStudents(Students, TID) {
    return new Promise((resolve, reject) => {
        fetch('/api/teacher/updateCheckedStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({SID: Students, TID: TID})
        }).then((response) => {
            if (response.ok) {
                // response.json()
                // .then((SID) => {
                     resolve(Students);
                // });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    }

 //update student grade in Slot
 async function updateStudentGrade(Grade, Attendance, TeacherID, ReservedStudent) {
    return new Promise((resolve, reject) => {
        fetch('/api/teacher/updateStudentGrade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Grade: Grade, Attendance: Attendance, TeacherID: TeacherID, ReservedStudent: ReservedStudent})
        }).then((response) => {
            if (response.ok) {
                     resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => {  reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

                }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    }
   

async function listRegisteredSlots(SID) {
    const response = await fetch('/api/student/listRegisteredSlots/'+SID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}


/// GET  Student - list of all registered Exams 
async function getRegisteredCourses(SID) {
    const response = await fetch('/api/student/getRegisteredCourses/'+SID);
    const result = await response.json();
    if(response[0] === null){
        throw {error: result}
    }
    if(response.ok){
        return result;
    } else{
        throw {error: result}
    }
}



const API = {insertSlot, getStudentName, cancelBookedSlot, bookAvailableSlot, overviewReservedSlots, updateStudentGrade, getRegisteredCourses, updateCheckedStudents, checkStudentBookAccess, getCheckedStudentByTID, listRegisteredSlots, listAvailableSlots, listReservedSlots, studentLogin,getStudentByTID, isAuthenticated, userLogin, userLogout, getTeacher, getTeacherId} ;
export default API;
