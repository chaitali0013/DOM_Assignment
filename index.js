// Accessing the input fields and display section
const stdname = document.querySelector("#stdname");
const stdid = document.querySelector("#stdid");
const stdemail = document.querySelector("#stdemail");
const stdno = document.querySelector("#stdno");
const displaysection = document.querySelector(".displaysection");
const button = document.querySelector(".buttoninput");

// Event listeners
button.addEventListener("click", addStdDetails);
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

// Function to load student details from local storage
function loadFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student) => {
        displayStudent(student);
    });
}

// Function to add student details
function addStdDetails() {
    if (stdname.value === '' || stdid.value === '' || stdemail.value === '' || stdno.value === '') {
        alert("Please fill all fields before adding a student.");
        return;
    }

    const student = {
        name: stdname.value,
        id: stdid.value,
        email: stdemail.value,
        contact: stdno.value,
    };

    saveToLocalStorage(student);
    displayStudent(student);

    // Clear input fields
     stdname.value = '';
     stdid.value = '';
     stdemail.value = '';
     stdno.value = '';
}

// Function to save student details in local storage
function saveToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to display student details
function displayStudent(student) {
    const table = document.querySelector(".table");

    // tbody - for details
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Creating table row for details
    const row = document.createElement("tr");
    tbody.appendChild(row);

    // Add student details in td
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td><button class="trash-button">Del</button></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    // Delete button functionality
    const deleteButton = row.querySelector(".trash-button");
    deleteButton.addEventListener("click", () => {
        deleteFromLocalStorage(student.id);
        row.remove();
    });

    // Edit button functionality
    const editButton = row.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
        if (editButton.innerText === "Edit") {
            row.contentEditable = "true";
            editButton.innerText = "Save";
        } else {
            row.contentEditable = "false";
            editButton.innerText = "Edit";

            const updatedStudent = {
                name: row.children[0].innerText,
                id: row.children[1].innerText,
                email: row.children[2].innerText,
                contact: row.children[3].innerText,
            };

            updateLocalStorage(updatedStudent);
        }
    });
}

// Function to delete a student from local storage
function deleteFromLocalStorage(id) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter((student) => student.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to update student details in local storage
function updateLocalStorage(updatedStudent) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
    );
    localStorage.setItem("students", JSON.stringify(students));
}
