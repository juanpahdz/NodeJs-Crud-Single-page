const hbs = require('hbs')
const fs = require('fs')

courseList = []
userList = []

list = () => {
    try {
        courseList = require('../coursedb.json')
        userList = require('../userdb.json')
    } catch (error) {
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
        nombre, id, intensidad, descripcion, modalidad, valor, estado: 'Disponible'
    }

    let Duplicado = courseList.find((cours) => cours.id == id)
    if (!Duplicado) {
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
hbs.registerHelper('createUser', (primerNombre, segundoNombre, identificacion, email, curso, telefono) => {
    list()
    let user = {
        primerNombre, segundoNombre, identificacion, email, curso, telefono
    }

    let Duplicado = userList.find((user) => user.identificacion == identificacion && user.curso == curso)
    if (!Duplicado) {
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

hbs.registerHelper('courseOptions', () => {
    list()
    let options = ''
    courseList.map(element => {
        options = options + `<option> ${element.nombre} </option>`
        console.log(element.nombre)
    });

    return options
})

hbs.registerHelper('showCourse', () => {
    list()
    let showCourse = ''
    if (courseList.length >= 1) {
        courseList.map(element => {
            showCourse = showCourse + `<tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>${element.intensidad}</td>
                <td>${element.descripcion}</td>
                <td>${element.modalidad}</td>
                <td>${element.valor}</td>
                <td>${element.estado}</td>
            </tr>`
            console.log(element.nombre)
        });
    }
    else {
        showCourse = `<tr >
        <td style="text-align:center;" colspan="7">No hay cursos disponibles por el momento. vuelve luego</td>
    </tr>`
    }

    return showCourse
})

hbs.registerHelper('showCoursesAspirant', () => {
    list()
    let Courses = ''
    courseList.map(element => {
        Courses = Courses + `<div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Curso de ${element.nombre}</span>
            <p>${element.descripcion}</p>
            <ul>
              <li> <strong>valor:</strong> $ ${element.valor}</li>
              <li> <strong>Intensidad</strong> ${element.intensidad} horas</li>
              <li> <strong>Modalidad:</strong> ${element.modalidad}</li>
            </ul>
          </div>
          <div class="card-action">
            <a href="userregistration">Inscribirse</a>
          </div>
        </div>
        </div>`
    });

    return Courses
})

hbs.registerHelper('courseUpdate', (modalidad, estado) => {
    list()
    curso = courseList.find((nom) => nom.nombre == modalidad)
    text = ''

    if (estado) {
        curso.estado == 'Cerrado'
        saveCourse()
        text = text + ` <tr>
            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.intensidad} horas</td>
            <td>${curso.descripcion}</td>
            <td>${curso.modalidad}</td>
            <td>${curso.valor}</td>
            <td>${curso.estado}</td>
          </tr>`
        return text
    }
    else {

        curso.estado == 'Cerrado'
        saveCourse()
        text = text + ` <tr>
            <td>${curso.id}</td>
            <td>${curso.nombre}</td>
            <td>${curso.intensidad} horas</td>
            <td>${curso.descripcion}</td>
            <td>${curso.modalidad}</td>
            <td>${curso.valor}</td>
            <td>${curso.estado}</td>
          </tr>`
        return text
    }

})

hbs.registerHelper('showCollapse', () => {
    list()
    collapse = ''
    courseList.map(elm => {
        let inscritos = userList.filter( est => est.curso == elm.nombre )
        console.log(inscritos)
        let aspirants = ''
        collapse = collapse + `
        <li>
        <div class="collapsible-header">${elm.nombre}</div>
        <div class="collapsible-body">
             <table>
        <thead>
          <tr>
              <th>Nombre</th>
              <th>Identificacion</th>
              <th>Celular</th>
              <th>email</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody>` +
        
        inscritos.map( asp => {
            aspirants = aspirants + 
            `<tr>
                 <td>${asp.primerNombre + ' ' + asp.segundoNombre}</td>
                 <td>${asp.identificacion}</td>
                 <td>${asp.telefono}</td>
                 <td>${asp.email}</td>
                 <td>
                     <button class="btn waves-effect waves-light" type="submit" name="action">
                         Eliminar
                     </button>
                 </td>
               </tr>`

            return aspirants
        }) +
        
        //   <tr>
        //     <td>Juan Pablo</td>
        //     <td>100411381</td>
        //     <td>3052611730</td>
        //     <td>juanpahdz01@gmail.com</td>
        //     <td>
        //         <button class="btn waves-effect waves-light" type="submit" name="action">
        //             Eliminar
        //         </button>
        //     </td>
        //   </tr>

        // </tbody>
        `
      </table>
        </div>
    </li>
        `
    })

    return collapse
})