document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-student');
    const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const students = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const student = {
            name: document.getElementById('name').value,
            studentId: document.getElementById('studentId').value,
            email: document.getElementById('email').value,
            faculty: document.getElementById('faculty').value,
            gender: document.getElementById('gender').value,
            birthdate: document.getElementById('birthdate').value
        };

        students.push(student);
        addStudentToTable(student);
        form.reset();
    });

    function addStudentToTable(student) {
        const row = table.insertRow();
        const cells = [
            student.name,
            student.studentId,
            student.email,
            getFacultyName(student.faculty),
            getGenderName(student.gender),
            formatDate(student.birthdate)
        ];

        cells.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    }

    function getFacultyName(value) {
        const faculties = {
            'cntt': 'Công nghệ thông tin',
            'kinh-te': 'Kinh tế',
            'co-khi': 'Cơ khí',
            'dien-tu': 'Điện tử',
            'xay-dung': 'Xây dựng'
        };
        return faculties[value] || value;
    }

    function getGenderName(value) {
        const genders = {
            'nam': 'Nam',
            'nu': 'Nữ',
            'khac': 'Khác'
        };
        return genders[value] || value;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }
});