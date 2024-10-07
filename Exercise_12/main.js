document.addEventListener('DOMContentLoaded', function(){
    var form = document.getElementById('form-student')
    form.addEventListener('submit', function(event){
        event.preventDefault();
        var student = {
            name: form.name.value,
            mssv: form.studentId.value,
            email: form.email.value,
            faculty:  form.faculty.value,
            gender: form.gender.value,
            birthday: form.birthdate.value

        }
        console.log('Student : ', student);
        
    })
})