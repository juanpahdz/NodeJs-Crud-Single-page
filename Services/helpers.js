const hbs = require('hbs')
const fs = require('fs')

courseList = []

list = () => {
    try {
        courseList = require('../coursedb.json')
        userList = require('../userdb.json')
    } catch(error) {
       courseList = []
       userList = []
    }    
}

saveCourse = () => {
    let data = JSON.stringify(courseList)

    fs.writeFile('./coursedb.json', data, (err) => {
        if (err) throw (err)
        console.log("archivo creado")
    })
}
    
saveUser = () => {
    let data = JSON.stringify(userList)

    fs.writeFile('./userdb.json', data, (err) => {
        if (err) throw (err)
        console.log("archivo creado")
    })
}
    

hbs.registerHelper('createCourse', (id, nombre, intensidad, descripcion, modalidad, valor) => {
    list()
    let course = {
        nombre, id, intensidad, descripcion, modalidad, valor,
    }

    let Duplicado = courseList.find( (cours) => cours.id == id)
    if (!Duplicado){
        courseList.push(course)
        saveCourse()

        text = `<h1> Curso Inscrito correctamente </h1>
        <p> acabas de inscribir un curso. Tus estudiantes estaran felices con el curso de ${nombre}!</p>`
        return text
    }
    else {
        text = `<h1> No es posible actualizar </h1>
        <p> El id del curso ya existe. Por esa razón el curso de ${nombre} no podrá ser remitido los datos que aparecen abajo no serán aceptados!</p>`

        return text
    }
}
)
hbs.registerHelper('createUser', (primerNombre, segundoNombre, identificacion, email, curso) => {
    list()
    let user = {
        primerNombre, segundoNombre, identificacion, email, curso
    }

    let Duplicado = userList.find( (user) => user.identificacion == identificacion && user.curso == curso)
    if (!Duplicado){
        userList.push(user)
        saveUser()

        text = `<h1> Aspirate pre-matriculado </h1>
        <p> acabas de inscribir un estudiante. ${primerNombre} estará muy contento en el curso de ${curso}!</p>`
        return text
    }
    else {
        text = `<h1> No es posible actualizar </h1>
        <p> El usuario con esa C.C ya está registrado. Por esa razón este estudiante no será listado en el curso de ${curso}</p>`

        return text
    }
})

