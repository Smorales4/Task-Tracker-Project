
window.addEventListener('load', () => {

    var jsonData = ["toShop", "name", "newFormShop"];

    toShop = JSON.parse(localStorage.getItem('toShop')) || [];
    const nameInput = document.querySelector('#name');
    const newFormShop = document.querySelector('#newFormShop');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newFormShop.addEventListener('submit', e => {
        e.preventDefault();


        
        const shop = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done:false,
            createdAt: new Date().getTime()
        }

        toShop.push(shop);
        const shopItem = JSON.stringify(toShop);
        localStorage.setItem('toShop', shopItem);
        console.log(shopItem);
        DisplayShopList();
    })

    function DisplayShopList () {
        const shopList = document.querySelector('#shopList');
        shopList.innerHTML = '';
        console.log(toShop)

            toShop.forEach(shop => {
                const shopItem = document.createElement('div');
                shopItem.classList.add('toShopItem')
    
                const label = document.createElement('label');
                const input = document.createElement('input');
                const span = document.createElement('span');
                const content = document.createElement('div');
                const actions = document.createElement('div');
                const edit = document.createElement('button');
                const deleteButton = document.createElement('button');
    
                input.type = 'checkbox';
                input.checked = shop.done;
                span.classList.add('bubble')
    
                if (shop.category == 'personalItems') {
                    span.classList.add('personalItems');
                } else {
                    span.classList.add('food')
                }
    
                content.classList.add('shoppingContent');
                actions.classList.add('actions');
                edit.classList.add('edit');
                deleteButton.classList.add('delete');
    
                content.innerHTML = `<input type="text" value="${shop.content}" readonly>`;
                edit.innerHTML = 'Edit';
                deleteButton.innerHTML = 'Delete';
    
                label.appendChild(input);
                label.appendChild(span);
                actions.appendChild(edit);
                actions.appendChild(deleteButton);
                shopItem.appendChild(label);
                shopItem.appendChild(content);
                shopItem.appendChild(actions);
                console.log(shopItem)
    
                shopList.appendChild(shopItem);
            
                if(shop.done) {
                    shopItem.classList.add('done');
                }
    
                input.addEventListener('click', e => {
                    shop.done = e.target.checked;
                    localStorage.setItem('toShop', JSON.stringify(toShop));
                    
                    if(shop.done){
                        shopItem.classList.add('done');
                    } else {
                        shopItem.classList.remove('done');
                    }
    
                    DisplayShopList();
                })
    
                edit.addEventListener('click', e => {
                    const input = content.querySelector('input');
                    input.removeAttribute('readonly');
                    input.focus();
                    input.addEventListener('blur', e => {
                        input.setAttribute('readonly', true);
                        shop.content = e.target.value;
                        localStorage.setItem('toShop', JSON.stringify(toShop))
                        DisplayShopList();
                    })
                })
                
                deleteButton.addEventListener('click', e => {
                    toShop = toShop.filter(t => t != shop);
                    localStorage.setItem('toShop', JSON.stringify(toShop));
                    DisplayShopList();
                })
            
            })
    }
})

//* Code for TimeGreeting *//
const greeting = document.getElementById("timeGreeting");
const hour = new Date().getHours();
const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
let welcomeText = "";

if (hour < 12) welcomeText = welcomeTypes[0];
else if (hour < 18) welcomeText = welcomeTypes[1];
else welcomeText = welcomeTypes[2];

greeting.innerHTML = welcomeText;