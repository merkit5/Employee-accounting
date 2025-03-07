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

document.addEventListener('DOMContentLoaded', getEmployees);