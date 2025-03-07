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

    console.log(data);

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

document.getElementById('addEmpForm').addEventListener('submit', addEmployee);
document.addEventListener('DOMContentLoaded', getEmployees);
