export class Modal{

    static container = document.querySelector('.modal-container')
    static box = document.querySelector('.modal-box')
    static success = 'The subscription has been successfully issued!';
    static error = 'You have already subscribed to our updates!';

    static renderLoader()
    {
        let loader = document.createElement('div');
        let span = '';
        for(let i=0;i<21;i++){
            span += '<span></span>';
        }

        loader.className = 'loader';
        loader.innerHTML = span;
        this.box.append(loader);
    }

    static sendStatus(status)
    {
        let statusBox = document.createElement('div');
        statusBox.className = 'modal-status-box';
        if(status === 'success'){
            statusBox.innerHTML = `<i class="ri-checkbox-circle-line"></i><p>${this.success}</p>`

        }else if(status === 'error'){
            statusBox.innerHTML += `<i class="ri-close-circle-line"></i><p>${this.error}</p>`
        }else{
            statusBox.innerHTML += '<i class="ri-close-circle-line"></i><p>Ошибка подключения попробуйте позже!!!</p>';
        }

        this.box.innerHTML =  '';
        this.box.append(statusBox);
    }

    static start()
    {
        this.container.style.display = 'flex';
        document.body.overflow = 'hidden';
        setTimeout(() => {
            this.box.style.transform = 'scale(1)';
        });
        setTimeout(() => {
            this.renderLoader();
        },600);

    }

    static close(res)
    {
        if(res === 'done') {
            //console.log(this.container);
            this.container.addEventListener('click', function (e) {
                e.stopPropagation();

                setTimeout(() => {
                    Modal.box.innerHTML = '';
                    Modal.box.style.transform = 'scale(0.1)';
                });

                setTimeout(() => {
                    this.style.display = 'none';
                    document.body.overflow = '';
                }, 600);
            })
        }
    }

}