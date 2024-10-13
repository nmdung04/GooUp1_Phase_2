document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-student');
    const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const formContainer = document.getElementById('form-container');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('form-title');
    const searchInput = document.getElementById('searchInput');
    let students = [
        { name: "Nguyễn Thị Lan", studentId: "SV001", email: "nguyenthilan@example.com", faculty: "cntt", gender: "nu", birthdate: "2000-01-01" },
        { name: "Trần Văn Hải", studentId: "SV002", email: "tranvanhai@example.com", faculty: "kinh-te", gender: "nam", birthdate: "2001-02-15" },
        { name: "Lê Thị Hương", studentId: "SV003", email: "lethihuong@example.com", faculty: "co-khi", gender: "nu", birthdate: "1999-12-10" },
        { name: "Phạm Văn Long", studentId: "SV004", email: "phamvanlong@example.com", faculty: "dien-tu", gender: "nam", birthdate: "2000-07-22" },
        { name: "Hoàng Thị Mai", studentId: "SV005", email: "hoangthimai@example.com", faculty: "xay-dung", gender: "nu", birthdate: "2001-05-30" },
        { name: "Ngô Văn Bình", studentId: "SV006", email: "ngovanbinh@example.com", faculty: "cntt", gender: "nam", birthdate: "1999-09-18" },
        { name: "Đặng Thị Linh", studentId: "SV007", email: "dangthilinh@example.com", faculty: "kinh-te", gender: "nu", birthdate: "2000-11-05" },
        { name: "Bùi Văn Phúc", studentId: "SV008", email: "buivanphuc@example.com", faculty: "co-khi", gender: "nam", birthdate: "2001-03-25" },
        { name: "Trương Thị Hồng", studentId: "SV009", email: "truongthihong@example.com", faculty: "dien-tu", gender: "nu", birthdate: "1999-08-14" },
        { name: "Lý Văn Tùng", studentId: "SV010", email: "lyvantung@example.com", faculty: "xay-dung", gender: "nam", birthdate: "2000-06-07" }
    ];
    

    function renderTable(studentsToRender = students) {
        table.innerHTML = '';
        studentsToRender.forEach((student, index) => {
            addStudentToTable(student, index);
        });
    }

    function addStudentToTable(student, index) {
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

        const actionCell = row.insertCell();
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Chỉnh sửa';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => editStudent(index);
        actionCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteStudent(index);
        actionCell.appendChild(deleteBtn);
    }

    function editStudent(index) {
        const student = students[index];
        document.getElementById('editIndex').value = index;
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('faculty').value = student.faculty;
        document.getElementById('gender').value = student.gender;
        document.getElementById('birthdate').value = student.birthdate;

        formTitle.textContent = 'Chỉnh sửa Sinh viên';
        formContainer.style.display = 'block';
        window.scrollTo(0, 0);
    }

    function deleteStudent(index) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            students.splice(index, 1);
            renderTable();
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const editIndex = document.getElementById('editIndex').value;
        const student = {
            name: document.getElementById('name').value,
            studentId: document.getElementById('studentId').value,
            email: document.getElementById('email').value,
            faculty: document.getElementById('faculty').value,
            gender: document.getElementById('gender').value,
            birthdate: document.getElementById('birthdate').value
        };

        if (editIndex !== '') {
            students[editIndex] = student;
        } else {
            students.push(student);
        }

        renderTable();
        form.reset();
        formContainer.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        form.reset();
        formContainer.style.display = 'none';
    });

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

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const debouncedSearch = debounce(function(searchTerm) {
        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderTable(filteredStudents);
    }, 300);

    searchInput.addEventListener('input', function(e) {
        debouncedSearch(e.target.value);
    });

    // Initial render
    renderTable();
});