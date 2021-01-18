let section = document.createElement('section');
header = document.createElement('header')
section.appendChild(header);

div1 = document.createElement('div');
div1.setAttribute('class', 'container mt-4')
header.appendChild(div1);

div2 = document.createElement('div');
div2.setAttribute('class', 'row');
div1.appendChild(div2);

div3 = document.createElement('div');
div3.setAttribute('class', 'col-md-4');
div2.appendChild(div3);

// header 
h4 = document.createElement('h4');
h4.textContent = "Students' Record";
div3.appendChild(h4);

hr = document.createElement('hr');
div3.appendChild(hr);

newline = document.createElement('br');
div3.appendChild(newline);

index_id = document.createElement('input');
index_id.id = 'index_id';
index_id.setAttribute('type', 'hidden');
index_id.setAttribute('class', 'form-control');
index_id.setAttribute('placeholder', 'Enter Class');
div3.appendChild(index_id);

// label for student
label_name = document.createElement('label');
label_name.textContent = 'Student Name:'
div3.appendChild(label_name);

Student_Name1 = document.createElement('input');
Student_Name1.id = 'student_name';
Student_Name1.setAttribute('class', 'form-control');
Student_Name1.setAttribute('placeholder', 'Enter Student Name');
div3.appendChild(Student_Name1);

div4 = document.createElement('div');
div4.setAttribute('class', 'text text-danger');
div4.setAttribute('id', 'student_name_error');
div3.appendChild(div4);

// label for class
label_class = document.createElement('label');
label_class.textContent = 'Class:'
div3.appendChild(label_class);

class1 = document.createElement('input');
class1.id = 'class_id';
class1.setAttribute('class', 'form-control');
class1.setAttribute('placeholder', 'Enter Class');
div3.appendChild(class1);

div5 = document.createElement('div');
div5.setAttribute('class', 'text text-danger');
div5.setAttribute('id', 'class_error');
div3.appendChild(div5);

div3.appendChild(newline); //Add new line

// submit button
submitbtn = document.createElement('button');
submitbtn.setAttribute('type', 'submit');
submitbtn.setAttribute('id', 'add');
submitbtn.setAttribute('class', 'btn btn-success');
submitbtn.textContent = 'Submit'
div3.appendChild(submitbtn);

// update button
submitbtn = document.createElement('button');
submitbtn.setAttribute('type', 'submit');
submitbtn.setAttribute('id', 'update');
submitbtn.setAttribute('class', 'btn btn-primary');
submitbtn.textContent = 'Update'
div3.appendChild(submitbtn).style.visibility = 'hidden';

// cancel button
submitbtn = document.createElement('button');
submitbtn.setAttribute('type', 'submit');
submitbtn.setAttribute('id', 'cancel');
submitbtn.setAttribute('class', 'btn btn-primary');
submitbtn.textContent = 'Cancel'
div3.appendChild(submitbtn).style.visibility = 'hidden';

// creating table
let div6 = document.createElement('div');
div6.setAttribute('class', 'col-md-4');
div2.appendChild(div6);

h4 = document.createElement('h4');
h4.textContent = 'Recorded Entries';
div6.appendChild(h4);

hr = document.createElement('hr');
div6.appendChild(hr);

div7 = document.createElement('table');
div6.appendChild(div7);

th = document.createElement('thead');
div7.appendChild(th);

th1 = document.createElement('th');
th1.textContent = 'S.No.'
th.appendChild(th1);

// colgap = document.createElement('normal');   // column gap
// th.appendChild(colgap); 

th2 = document.createElement('th');
th2.textContent = 'Name'
th.appendChild(th2);

th3 = document.createElement('th');
th3.textContent = 'Class'
th.appendChild(th3);

th4 = document.createElement('th');
th4.textContent = 'Edit'
th.appendChild(th4);

th5 = document.createElement('th');
th5.textContent = 'Delete'
th.appendChild(th5);

tb = document.createElement('tbody');
tb.setAttribute('id', 'tableBody');
div7.appendChild(tb);

span = document.createElement('span');
span.setAttribute('id', 'rt');
span.setAttribute('class', 'text text-danger');
div6.appendChild(span)

document.body.appendChild(section);

//function to add record
function add_student_record() {
    nameValue = document.getElementById('student_name').value;
    classValue = document.getElementById('class_id').value;
    if (nameValue == '') {
        document.getElementById('student_name_error').innerText = 'Student Name is Required.';
    } else if (classValue == '') {
        document.getElementById('class_error').innerText = 'Class is Required.';
    }

    //storing data in localstorage only first time
    else if (localStorage.getItem('myList') == null) {
        itemJsonArray = [];
        itemJsonArray.push([nameValue, classValue]);
        localStorage.setItem('myList', JSON.stringify(itemJsonArray))
            document.getElementById('student_name').value = '';
            document.getElementById('class_id').value = '';
            //Remove Record Not Found!
            let n = document.getElementById('rt');
            n.textContent = '';
    }
    //storing data in localstorage second and more time  
    else {
        itemJsonArrayStr = localStorage.getItem('myList')
        itemJsonArray.push([nameValue, classValue]);
        localStorage.setItem('myList', JSON.stringify(itemJsonArray))  //converting array formate
        document.getElementById('student_name').value = '';
        document.getElementById('class_id').value = '';
        //Remove Record Not Found!
        let n = document.getElementById('rt');
        n.textContent = '';
    }
    get();
}

function get() {
    if (localStorage.getItem('myList') == null) {
        let n = document.getElementById('rt');
        n.textContent = 'Record Not Found!';
    } else {
        itemJsonArrayStr = localStorage.getItem('myList')
        itemJsonArray = JSON.parse(itemJsonArrayStr); //converting to text format
    }

    // tableBody
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td> 
                    <td><button class="btn btn-sm btn-primary" onclick="updated(${index})">Edit</button></td> 
                    <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td> 
                    </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", add_student_record);
get();

// update
function updated(itemIndex) {
    console.log("Update", itemIndex);
    let index_id_v = [itemIndex];
    let nameValue = itemJsonArray[itemIndex][0];
    let classValue = itemJsonArray[itemIndex][1];
    document.getElementById('index_id').value = index_id_v;
    document.getElementById('student_name').value = nameValue;
    document.getElementById('class_id').value = classValue;

    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.visibility = 'visible';

}

// save
let update = document.getElementById("update");
update.addEventListener("click", function () {
    let add = document.getElementById("update");
    let webtask = localStorage.getItem("myList");
    // console.log(webtask);
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("index_id").value;
    let nameValue = document.getElementById("student_name").value;
    let classValue = document.getElementById("class_id").value;
    if (nameValue == '') {
        document.getElementById('student_name_error').innerText = 'Student Name is Required.';
    } else if (classValue == '') {
        document.getElementById('class_error').innerText = 'Class is Required.';
    } else {
        taskObj[saveindex] = {
            nameValue,
            classValue
        }
        update.style.display = "none";
        add.style.display = "block";
        localStorage.setItem("myList", JSON.stringify(taskObj));
        document.getElementById('index_id').value = '';
        document.getElementById('student_name').value = '';
        document.getElementById('class_id').value = '';
        location.reload();
    }
})

//delete
function deleted(itemIndex) {
    if (confirm('Are you sure! you want to delete.')) {
        console.log("Delete", itemIndex); //print str index
        itemJsonArrayStr = localStorage.getItem('myList')
        // Delete itemIndex element from the array
        itemJsonArray.splice(itemIndex, 1);
        localStorage.setItem('myList', JSON.stringify(itemJsonArray));
        get();
    }
}