window.onload = function () {
    let filterAll = true;
    let filterId1 = false;
    let filterId2 = false;
    let filterId3 = false;
    let filterId4 = false;


    document.addEventListener("click", documentActions);

    // Actions (делегирование события click)
    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('filter__button')) {
            updateServices(targetElement);
            e.preventDefault();
        }
    }

    async function updateServices(button1) {
        let categoryId = button1.dataset.cid;
        //console.log(categoryId);
        if (categoryId === "0") {
            filterAll = true;
            filterId1 = false;
            filterId2 = false;
            filterId3 = false;
            filterId4 = false;
        }
        if (categoryId === "1") {
            filterAll = false;
            filterId1 = !filterId1;
        }
        if (categoryId === "2") {
            filterAll = false;
            filterId2 = !filterId2;
        }
        if (categoryId === "3") {
            filterAll = false;
            filterId3 = !filterId3;
        }
        if (categoryId === "4") {
            filterAll = false;
            filterId4 = !filterId4;
        }
        updateButtons();

        const file = "js/services.json";
        let response = await fetch(file, {
            method: "GET"
        });
        if (response.ok) {
            let result = await response.json();
            //console.log(result);
            if (!filterAll) {
                let filteredServices = result.services.filter(filterByCategory);
                addServices(filteredServices);
                //console.log(filteredServices);
            } else addServices(result.services);//console.log(result.services);
            //button.classList.remove('_hold');
            //button.remove();
        } else {
            alert("Ошибка");
        }
        //}
    }
    function filterByCategory(service) {
        return (filterId1 && service.category[0].id === 1) ||
            (filterId2 && service.category[0].id === 2) ||
            (filterId3 && service.category[0].id === 3) ||
            (filterId4 && service.category[0].id === 4)
    }
    function updateButtons() {
        let buttons = document.querySelectorAll(".filter__button");
        buttons.forEach(button => {
            let c_Id = button.dataset.cid;
            if (c_Id === "0") {
                if (!filterAll) {
                    button.classList.remove('filter__button_active')
                }
                else {
                    button.classList.add('filter__button_active')
                }
            }
            if (c_Id === "1") {
                if (!filterId1) { button.classList.remove('filter__button_active') }
                else {
                    button.classList.add('filter__button_active')
                }
            }
            if (c_Id === "2") {
                if (!filterId2) { button.classList.remove('filter__button_active') }
                else {
                    button.classList.add('filter__button_active')
                }
            }
            if (c_Id === "3") {
                if (!filterId3) { button.classList.remove('filter__button_active') }
                else {
                    button.classList.add('filter__button_active')
                }
            }
            if (c_Id === "4") {
                if (!filterId4) { button.classList.remove('filter__button_active') }
                else {
                    button.classList.add('filter__button_active')
                }
            }
        });
    }

    function addServices(arr) {
        const servicesItems = document.querySelector('.services__items');
        while (servicesItems.firstChild) {
            servicesItems.removeChild(servicesItems.firstChild);
        };
        console.log(arr);
        arr.forEach(item => {
            const serviceId = item.id;
            const servicetUrl = item.url;
            const serviceImage = item.image;
            const serviceTitle = item.title;
            const serviceCategory = item.category;
            const serviceInfo = item.info;

            let serviceTemplateStart = `<article data-pid="${serviceId}" class="services__item item-service">`;
            let serviceTemplateEnd = `</article>`;

            let serviceTemplateImage = `
		<a href="${servicetUrl}" class="item-service__image _ibg">
			<img src="img/portfolio/${serviceImage}" alt="${serviceTitle}">
		</a>`;
            let serviceTemplateInfo = `<div class="item-service__info">${serviceInfo}</div>`;

            let serviceMain = `<div class="item-service__main">` + serviceTemplateImage + serviceTemplateInfo + `</div>`;

            let serviceTemplateBody = `<div class="item-service__body"><h3 class="item-service__title">${serviceTitle}</h3>
								<div class="item-service__category">${serviceCategory[0].name}</div></div>`;

            servicesItems.insertAdjacentHTML('beforeend', serviceTemplateStart + serviceMain + serviceTemplateBody + serviceTemplateEnd);

        });

    }

}