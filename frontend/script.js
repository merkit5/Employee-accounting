async function getEmployees() {
    try {
        const response = await fetch('/api/employee');
        const employees = await response.json();
        const tbody = document.querySelector('.empTable tbody');

        tbody.innerHTML = employees.map(employee => 
            `<tr>
                <td>${employee.full_name}</td>
                <td>${new Date(employee.birth_date).toLocaleDateString()}</td>
                <td>${employee.passport}</td>
                <td>${employee.phone}</td>
                <td>${employee.address}</td>
                <td>${employee.department}</td>
                <td>${employee.post}</td>
                <td>${employee.salary}</td>
                <td>${new Date(employee.employment_date).toLocaleDateString()}</td>
                <td>
                    <button onclick="loadEmp(${employee.id})">Редактировать</button>
                </td>
            </tr>`
        ).join('');
    } catch (error) {
        console.error('Ошибка:', error);
    } 
}

async function addEmployee(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.salary = parseFloat(data.salary);

    try {
        const response = await fetch('/api/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        event.target.reset();

        await getEmployees();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


async function loadEmp(id) {
    try {
        const response = await fetch(`/api/employee/${id}`);
        const employee = await response.json();
        fillForm(employee);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function fillForm(employee) {
    const editForm = document.getElementById('editEmpForm');
    editForm.style.display = 'block';

    Object.keys(employee).forEach(key => {
        editForm.elements[key].value = key.includes('_date') ? employee[key].split('T')[0] : employee[key];
    });
}

async function saveEmployee(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.salary = parseFloat(data.salary);

    try {
        const response = await fetch(`/api/employee/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const editForm = document.getElementById('editEmpForm');
        editForm.style.display = 'none';
        await getEmployees();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

document.getElementById('addEmpForm').addEventListener('submit', addEmployee);
document.getElementById('editEmpForm').addEventListener('submit', saveEmployee);
document.getElementById('cancelEdit').addEventListener('click', () => {document.getElementById('editEmpForm').style.display = 'none';});
document.addEventListener('DOMContentLoaded', getEmployees);