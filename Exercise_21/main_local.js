document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-student');
    const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const formContainer = document.getElementById('form-container');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('form-title');
    const searchInput = document.getElementById('searchInput');
    const filterForm = document.getElementById('filter-form');
    const filterBtn = document.getElementById('filterBtn');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const filterFaculty = document.getElementById('filter-faculty');
    const filterGender = document.getElementById('filter-gender');
    const filterYear = document.getElementById('filter-year');
    const paginationList = document.querySelector('.pagination-list');
    const sortButtons = document.querySelectorAll('.sort-btn');
    let students = [
        // 15 sinh viên ban đầu
        { name: "Nguyễn Văn An", studentId: "SV001", email: "nguyenvanan@example.com", faculty: "cntt", gender: "nam", birthdate: "2000-01-01" },
        { name: "Trần Thị Bình", studentId: "SV002", email: "tranthibinh@example.com", faculty: "kinh-te", gender: "nu", birthdate: "2001-02-15" },
        { name: "Lê Văn Cường", studentId: "SV003", email: "levancuong@example.com", faculty: "co-khi", gender: "nam", birthdate: "1999-12-10" },
        { name: "Phạm Thị Diễm", studentId: "SV004", email: "phamthidiem@example.com", faculty: "dien-tu", gender: "nu", birthdate: "2000-07-22" },
        { name: "Hoàng Văn Em", studentId: "SV005", email: "hoangvanem@example.com", faculty: "xay-dung", gender: "nam", birthdate: "2001-05-30" },
        { name: "Ngô Thị Phương", studentId: "SV006", email: "ngothiphuong@example.com", faculty: "cntt", gender: "nu", birthdate: "1999-09-18" },
        { name: "Đặng Văn Giàu", studentId: "SV007", email: "dangvangiau@example.com", faculty: "kinh-te", gender: "nam", birthdate: "2000-11-05" },
        { name: "Bùi Thị Hoa", studentId: "SV008", email: "buithihoa@example.com", faculty: "co-khi", gender: "nu", birthdate: "2001-03-25" },
        { name: "Trương Văn Inh", studentId: "SV009", email: "truonngvaninh@example.com", faculty: "dien-tu", gender: "nam", birthdate: "1999-08-14" },
        { name: "Lý Thị Kim", studentId: "SV010", email: "lythikim@example.com", faculty: "xay-dung", gender: "nu", birthdate: "2000-06-07" },
        { name: "Mai Văn Lâm", studentId: "SV011", email: "maivanlam@example.com", faculty: "cntt", gender: "nam", birthdate: "2001-01-19" },
        { name: "Võ Thị Mỹ", studentId: "SV012", email: "vothimy@example.com", faculty: "kinh-te", gender: "nu", birthdate: "1999-10-31" },
        { name: "Đinh Văn Năm", studentId: "SV013", email: "dinhvannam@example.com", faculty: "co-khi", gender: "nam", birthdate: "2000-04-02" },
        { name: "Hồ Thị Oanh", studentId: "SV014", email: "hothioanh@example.com", faculty: "dien-tu", gender: "nu", birthdate: "2001-08-11" },
        { name: "Dương Văn Phú", studentId: "SV015", email: "duongvanphu@example.com", faculty: "xay-dung", gender: "nam", birthdate: "1999-12-28" },
    
        // 40 sinh viên mới
        { name: "Lê Thị Quỳnh", studentId: "SV016", email: "lethiquynh@example.com", faculty: "cntt", gender: "nu", birthdate: "2000-03-15" },
        { name: "Trần Văn Rồng", studentId: "SV017", email: "tranvanrong@example.com", faculty: "kinh-te", gender: "nam", birthdate: "2001-07-22" },
        { name: "Phạm Thị Sương", studentId: "SV018", email: "phamthisuong@example.com", faculty: "co-khi", gender: "nu", birthdate: "1999-11-30" },
        { name: "Hoàng Văn Tâm", studentId: "SV019", email: "hoangvantam@example.com", faculty: "dien-tu", gender: "nam", birthdate: "2000-09-05" },
        { name: "Ngô Thị Uyên", studentId: "SV020", email: "ngothiuyen@example.com", faculty: "xay-dung", gender: "nu", birthdate: "2001-02-18" },
        { name: "Đặng Văn Vũ", studentId: "SV021", email: "dangvanvu@example.com", faculty: "cntt", gender: "nam", birthdate: "1999-06-27" },
        { name: "Bùi Thị Xuân", studentId: "SV022", email: "buithixuan@example.com", faculty: "kinh-te", gender: "nu", birthdate: "2000-12-10" },
        { name: "Trương Văn Yến", studentId: "SV023", email: "truongvanyen@example.com", faculty: "co-khi", gender: "nam", birthdate: "2001-04-03" },
        { name: "Lý Thị Zara", studentId: "SV024", email: "lythizara@example.com", faculty: "dien-tu", gender: "nu", birthdate: "1999-08-20" },
        { name: "Mai Văn Anh", studentId: "SV025", email: "maivananh@example.com", faculty: "xay-dung", gender: "nam", birthdate: "2000-01-25" },
        { name: "Nguyễn Thị Ánh", studentId: "SV026", email: "nguyenthianh@example.com", faculty: "cntt", gender: "nu", birthdate: "2001-06-12" },
        { name: "Trần Văn Bằng", studentId: "SV027", email: "tranvanbang@example.com", faculty: "kinh-te", gender: "nam", birthdate: "1999-09-15" },
        { name: "Phạm Thị Bích", studentId: "SV028", email: "phamthibich@example.com", faculty: "co-khi", gender: "nu", birthdate: "2000-05-28" },
        { name: "Hoàng Văn Cảnh", studentId: "SV029", email: "hoangvancanh@example.com", faculty: "dien-tu", gender: "nam", birthdate: "2001-10-01" },
        { name: "Ngô Thị Chi", studentId: "SV030", email: "ngothichi@example.com", faculty: "xay-dung", gender: "nu", birthdate: "1999-07-25" },
        { name: "Đặng Văn Chung", studentId: "SV031", email: "dangvanchung@example.com", faculty: "cntt", gender: "nam", birthdate: "2000-02-20" },
        { name: "Bùi Thị Dung", studentId: "SV032", email: "buithidung@example.com", faculty: "kinh-te", gender: "nu", birthdate: "2001-08-15" },
        { name: "Trương Văn Duy", studentId: "SV033", email: "truongvanduy@example.com", faculty: "co-khi", gender: "nam", birthdate: "1999-10-12" },
        { name: "Lý Thị E", studentId: "SV034", email: "lythie@example.com", faculty: "dien-tu", gender: "nu", birthdate: "2000-11-22" },
        { name: "Mai Văn Giang", studentId: "SV035", email: "maivangi@example.com", faculty: "xay -dung", gender: "nam", birthdate: "2001-03-01" },
        { name: "Nguyễn Thị Hà", studentId: "SV036", email: "nguyenthinha@example.com", faculty: "cntt", gender: "nu", birthdate: "1999-05-15" },
        { name: "Trần Văn Hậu", studentId: "SV037", email: "tranvanhau@example.com", faculty: "kinh-te", gender: "nam", birthdate: "2000-09-28" },
        { name: "Phạm Thị Hồng", studentId: "SV038", email: "phamthihong@example.com", faculty: "co-khi", gender: "nu", birthdate: "2001-01-05" },
        { name: "Hoàng Văn Hưng", studentId: "SV039", email: "hoangvanhung@example.com", faculty: "dien-tu", gender: "nam", birthdate: "1999-08-10" },
        { name: "Ngô Thị Hương", studentId: "SV040", email: "ngothihu@example.com", faculty: "xay-dung", gender: "nu", birthdate: "2000-06-25" },
        { name: "Đặng Văn Huy", studentId: "SV041", email: "dangvanhuy@example.com", faculty: "cntt", gender: "nam", birthdate: "2001-02-01" },
        { name: "Bùi Thị Huyền", studentId: "SV042", email: "buithihuyen@example.com", faculty: "kinh-te", gender: "nu", birthdate: "1999-09-20" },
        { name: "Trương Văn Khánh", studentId: "SV043", email: "truongvankhanh@example.com", faculty: "co-khi", gender: "nam", birthdate: "2000-10-15" },
        { name: "Lý Thị Lan", studentId: "SV044", email: "lythilan@example.com", faculty: "dien-tu", gender: "nu", birthdate: "2001-04-10" },
        { name: "Mai Văn Lân", studentId: "SV045", email: "maivanlan@example.com", faculty: "xay-dung", gender: "nam", birthdate: "1999-07-01" },
        { name: "Nguyễn Thị Linh", studentId: "SV046", email: "nguyenthilinh@example.com", faculty: "cntt", gender: "nu", birthdate: "2000-03-20" },
        { name: "Trần Văn Long", studentId: "SV047", email: "tranvanlong@example.com", faculty: "kinh-te", gender: "nam", birthdate: "2001-09-25" },
        { name: "Phạm Thị Mai", studentId: "SV048", email: "phamthimai@example.com", faculty: "co-khi", gender: "nu", birthdate: "1999-11-15" },
        { name: "Hoàng Văn Minh", studentId: "SV049", email: "hoangvanminh@example.com", faculty: "dien-tu", gender: "nam", birthdate: "2000-05-10" },
        { name: "Ngô Thị Nga", studentId: "SV050", email: "ngothinga@example.com", faculty: "xay-dung", gender: "nu", birthdate: "2001-01-15" },
        { name: "Đặng Văn Ninh", studentId: "SV051", email: "dangvanninh@example.com", faculty: "cntt", gender: "nam", birthdate: "1999-06-01" },
        { name: "Bùi Thị Oanh", studentId: "SV052", email: "buithioanh@example.com", faculty: "kinh-te", gender: "nu", birthdate: "2000-08-20" },
        { name: "Trương Văn Phong", studentId: "SV053", email: "truongvanphong@example.com", faculty: "co-khi", gender: "nam", birthdate: "2001-03-25" },
        { name: "Hồ Thị Linh", studentId: "SV054", email: "hothilinh@example.com", faculty: "dien-tu", gender: "nu", birthdate: "2001-11-07" },
        { name: "Dương Văn Minh", studentId: "SV055", email: "duongvanminh@example.com", faculty: "xay-dung", gender: "nam", birthdate: "1999-09-30" }
    ];
    let filteredStudents = [...students];
    let currentPage = 1;
    const studentsPerPage = 10;
    let currentSortColumn = '';
    let currentSortOrder = 'asc';

    // Load students and filters from localStorage
    function loadStudentsFromSession() {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            students = JSON.parse(storedStudents);
        }
        filteredStudents = [...students];
    }

    function loadFiltersFromSession() {
        const storedFilters = localStorage.getItem('filters');
        if (storedFilters) {
            const filters = JSON.parse(storedFilters);
            filterFaculty.value = filters.faculty || 'all';
            filterGender.value = filters.gender || 'all';
            filterYear.value = filters.year || 'all';
            searchInput.value = filters.search || '';
            currentPage = filters.currentPage || 1;
        }
    }

    // Save students and filters to localStorage
    function saveStudentsToSession() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function saveFiltersToSession() {
        localStorage.setItem('filters', JSON.stringify({
            faculty: filterFaculty.value,
            gender: filterGender.value,
            year: filterYear.value,
            search: searchInput.value,
            currentPage: currentPage
        }));
    }

    // Render the student table
    function renderTable() {
        const startIndex = (currentPage - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;
        const studentsToRender = filteredStudents.slice(startIndex, endIndex);

        table.innerHTML = '';
        studentsToRender.forEach((student, index) => {
            addStudentToTable(student, startIndex + index);
        });

        updatePagination();
    }

    // Add student row to table
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

    // Delete student
    let studentToDeleteIndex = null;
    function deleteStudent(index) {
        studentToDeleteIndex = index;
        document.getElementById('deleteModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
    }

    document.getElementById('confirmDeleteBtn').onclick = function() {
        if (studentToDeleteIndex !== null) {
            students.splice(studentToDeleteIndex, 1);
            saveStudentsToSession();
            applyFilters();
            studentToDeleteIndex = null;
        }
        document.getElementById('deleteModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    };

    document.getElementById('cancelDeleteBtn').onclick = function() {
        document.getElementById('deleteModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
        studentToDeleteIndex = null;
    };

    // Update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        paginationList.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = 'pagination-item';
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.className = 'paginate-link';
        prevLink.innerHTML = '&laquo;';
        prevLink.onclick = (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        };
        prevLi.appendChild(prevLink);
        paginationList.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = 'pagination-item';
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'paginate-link';
            a.textContent = i;
            if (i === currentPage) {
                a.classList.add('active');
            }
            
            //Hide the link if it's not in the current page
            if (i === 1 || i === totalPages) {
                a.classList.remove('hide');
                
            }
            else if (i >= currentPage - 1 && i <= currentPage + 1) {
                a.classList.remove('hide');
            } 
            else {
                a.classList.add('hide');
                if (i === currentPage - 2 || i === currentPage + 2) {
                    a.textContent = '...';
                    a.classList.remove('hide');  
                }
            }
            a.onclick = (e) => {
                e.preventDefault();
                currentPage = i;
                renderTable();
            };
            li.appendChild(a);
            if (li.children[0].classList.contains('hide')) {
                li.style.margin = 0;
            }
            if (a.textContent ==='...')
            {
                a.style.pointerEvents = 'none';
                // link.classList.add('no-select');
            }
            paginationList.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = 'pagination-item';
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.className = 'paginate-link';
        nextLink.innerHTML = '&raquo;';
        nextLink.onclick = (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        };
        nextLi.appendChild(nextLink);
        paginationList.appendChild(nextLi);
    }

    // Apply filters
    function applyFilters() {
        const faculty = filterFaculty.value;
        const gender = filterGender.value;
        const year = filterYear.value;
        const searchText = searchInput.value.toLowerCase();

        filteredStudents = students.filter(student => {
            const matchFaculty = faculty === 'all' || student.faculty === faculty;
            const matchGender = gender === 'all' || student.gender === gender;
            const matchYear = year === 'all' || new Date(student.birthdate).getFullYear().toString() === year;
            const matchSearch = student.name.toLowerCase().includes(searchText) || student.studentId.includes(searchText);
            return matchFaculty && matchGender && matchYear && matchSearch;
        });

        currentPage = 1;
        saveFiltersToSession();
        renderTable();
    }

    // Handle form submit
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

        saveStudentsToSession();
        applyFilters();
        form.reset();
        formContainer.style.display = 'none';
    });

    // Edit student
    function editStudent(index) {
        const student = students[index];
        formTitle.textContent = 'Chỉnh sửa sinh viên';
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('faculty').value = student.faculty;
        document.getElementById('gender').value = student.gender;
        document.getElementById('birthdate').value = student.birthdate;
        document.getElementById('editIndex').value = index;
        formContainer.style.display = 'block';
    }

    // Cancel form
    cancelBtn.onclick = function() {
        form.reset();
        formContainer.style.display = 'none';
    };

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }

    // Get faculty and gender names
    function getFacultyName(facultyValue) {
        switch (facultyValue) {
            case 'cntt':
                return 'Công nghệ thông tin';
            case 'kinh-te':
                return 'Kinh tế';
            case 'co-khi':
                return 'Cơ khí';
            case 'dien-tu':
                return 'Điện tử';
            case 'xay-dung':
                return 'Xây dựng';
            default:
                return '';
        }
    }

    function getGenderName(genderValue) {
        switch (genderValue) {
            case 'nam':
                return 'Nam';
            case 'nu':
                return 'Nữ';
            default:
                return '';
        }
    }

    // Initial load
    loadStudentsFromSession();
    loadFiltersFromSession();
    applyFilters();
    renderTable();

    // Handle filter apply and reset
    filterBtn.addEventListener('click', function() {
        applyFilters();
    });

    resetFilterBtn.addEventListener('click', function() {
        filterForm.reset();
        filteredStudents = [...students];
        currentPage = 1;
        saveFiltersToSession();
        renderTable();
    });

    // Handle search input change
    searchInput.addEventListener('input', function() {
        applyFilters();
    });
});
