var header=document.createElement('header')
h1=document.createElement('h1')
h1.textContent="Student Details"
header.appendChild(h1)
document.body.appendChild(header)

let label1=document.createElement('label')
label1.setAttribute('for','inputname')
label1.textContent="Name:"
document.body.appendChild(label1)

let inputname=document.createElement('input')
document.body.appendChild(inputname)
document.write('<br><br>')

let label2=document.createElement('label')
label2.setAttribute('for','inputclass')
label2.textContent='Class:'
document.body.appendChild(label2)

let inputclass=document.createElement('input')
document.body.appendChild(inputclass)
document.write('<br><br>')

let submitbtn=document.createElement('input')
submitbtn.type='submit'
document.body.appendChild(submitbtn)

        const addNames = (ev)=>{
            let name = {
                id: Date.now(),
                name: inputname.value,
                class: inputclass.value
            }

            //for display purposes only
            console.log('added' , {name} );
            window.onload = () =>{
            let pre = document.querySelector('#msg pre');
            pre.textContent = '\n' + JSON.stringify(name, '\t', 2);
            }

            //saving to localStorage
            localStorage.setItem('MyList', JSON.stringify(name) );
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            submitbtn.addEventListener('click', addNames);
        });
