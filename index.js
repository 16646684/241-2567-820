const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'; //default mode
let selectedId = ''

window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('id',id)
    if (id) {
        mode = 'EDIT'
        selectedId = id
        //1.ดึงข้อมูล user ที่ต้องการ edit มา
        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`)
            const user = response.data
            console.log('response',response.data)

    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let descriptionDOM = document.querySelector('textarea[name=description]')

    let genderDOM = document.querySelectorAll('input[name=gender]') 
    let interestDOMs = document.querySelectorAll('input[name=interest]')
    console.log('interrest',user.interest)
        for(let i = 0; i < interestDOMs.length; i++) {
            if (genderDOMs[i].value == user.gender) {
                genderDOMs[i].checked = true
            }
        }

        for(let i = 0; i < interestDOMs.length; i++) {
            if (user.interests.includes(interestDOMs[i].value == user.interests)) {
                interestDOMs[i].checked = true
            }
        }
    firstNameDOM.value = user.firstname
    lastNameDOM.value = user.lastname
    ageDOM.value = user.age
    descriptionDOM.value = user.description
    



        } catch (error) {
            console.error('error', error)
        }
        //2.นำข้อมูลที่ดึงมาไปแสดงใน input
    }


}

const validateData = (userData) => {
    let errors = []
    if(!userData.firstName) {
        errors.push('กรุณากรอกชื่อ')
    }
    if(!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if(!userData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if(!userData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    if(!userData.interests) {
        errors.push('กรุณาเลือกความสนใจ')
    }
    if(!userData.description) {
        errors.push('กรุณากรอกข้อมูลตัวเอง')
    }
    return errors
}
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked')|| {}
    let descriptionDOM = document.querySelector('textarea[name=description]')

    let messageDoM= document.getElementById('message')
    try{
    
    let interest = ''

    for(let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value
        if(i < interestDOMs.length -1){
            interest += ','
        }
    }

    let userData ={
        firstName : firstNameDOM.value,
        lastName : lastNameDOM.value,
        age : ageDOM.value,
        gender : genderDOM.value,
        description : descriptionDOM.value, 
        interests : interest

    }
    console.log('submitData',userData)

    const errors = validateData(userData)
    if(errors.length > 0) {
        //มี error
        throw{
            message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            errors: errors
        }
    }
    let message = 'บันทึกข้อมูลเรียบร้อย'
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/users`, userData)
            console.log('response',response.data)
            }else{
                const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
                message = 'แก้ไขข้อมูลเรียบร้อย'
                console.log('response',response.data)
            }
                messageDoM.innerText =  message
                messageDoM.className = 'message success'
        
        
    }catch (error){
        console.log('error message',error.message)
        console.log('error',error.errors)
        if (error.response){
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for(let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
    
        messageDoM.innerHTML = htmlData
        messageDoM.className = 'message danger'    
    }
}

