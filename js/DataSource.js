class DataSource {
    constructor() {
        this.table = $('#outputTable')

    }


    init() {
        let that = this;
        let btnGetData = $('#getData');
        let btnUpdateData = $('#updateData');
        let btnCreateData = $('#createData');
        let btnDeleteData = $('#deleteData');

        btnGetData.on('click', function () {
            that.getBlogs();
    });

        btnCreateData.on('click', function () {
            that.createData();
            that.getBlogs();
        } );


        btnUpdateData.on('click', function () {
            that.updateTitle(); // TEST
            that.refreshData();
        });

        btnDeleteData.on('click', function () {

            that.deleteData();
            that.getBlogs();
           
            
        });


    }

    refreshData() {
        let that = this;
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            const data = JSON.parse(request.responseText);
            that.resetTable();
            that.fillTable(data);
            
        });
    }

    getBlogs() {
        let that = this;
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status ===200) {
                const data = JSON.parse(request.responseText);
                console.log('from getBlogs(): ' + data.data[0].body);

                that.resetTable();
                that.fillTable(data);
                // that.fillRow();
                console.log('ASDGAGADGDGAFGFA');
            } else if (request.readyState === 4) {
                callback('ALAMADI', undefined  )
                that.fillTable(data);
            }

        });

        request.open('GET', 'http://localhost:8080/php_rest_myblog/api/post/read.php');
        request.send();

        


    };

    updateTitle() {
        console.log('clicked update button');
            let idInput = $('#idUpdate');
            let titleInput = $('#titleUpdate');
            let bodyInput = $('#bodyUpdate');
            let authorInput = $('#authorUpdate');
            let category_idInput = $('#category_idUpdate');
            
            const updateData = new XMLHttpRequest();
            updateData.open('PUT', 'http://localhost:8080/php_rest_myblog/api/post/update.php');
            updateData.setRequestHeader('Content-type', 'application/json');
            updateData.send(JSON.stringify(
                {
                    "title" : titleInput.val(),
                    "body" : bodyInput.val(),
                    "author" : authorInput.val(),
                    "category_id" : category_idInput.val(),
                    "id" : idInput.val()
                }
            ));

            setTimeout( () => {
                console.log('blop');
                this.getBlogs();
            }, 1000);

    };

    createData() {
        console.log('created button clicked');
        let titleCreate = $('#titleCreate');
        let contentCreate = $('#contentCreate');
        let authorCreate = $('#authorCreate');
        let category_idCreate = $('#category_idCreate');

        const createData = new XMLHttpRequest();
        createData.open('POST', 'http://localhost:8080/php_rest_myblog/api/post/create.php');
        //createData.setRequestHeader('Content-type', 'application/json');
        createData.send(JSON.stringify(
            {
                "title" : titleCreate.val(),
                "body" : contentCreate.val(),
                "author" : authorCreate.val(),
                "category_id": category_idCreate.val()
            }
        ));

        setTimeout( () => {
            console.log('blop');
            this.getBlogs();
        }, 1000);
        
    };


deleteData() {
    let that = this;
    console.log('deleted');
    let idDelete = $('#deleteInput');

    const deleteData = new XMLHttpRequest();
    deleteData.open('DELETE', 'http://localhost:8080/php_rest_myblog/api/post/delete.php');
    deleteData.send(JSON.stringify(
        {
            "id" : idDelete.val()
        }
    ));

    setTimeout( () => {
        console.log('blop');
        this.getBlogs();
    }, 1000);
        
};


fillTable(data) {
    console.log('FROM fillTable() ', data);
    // console.log('data: ' + JSON.stringify(data['data'][0]));
    console.log("FROM fillTable() - data['data'][0] : " + data['data'][1])
 //console.log(data['data']);
 //console.log('burda bir aray var : ' + data['data'][1].title);
// for(let key in data['data'][key]) {
//     console.log(key);
// }

this.resetTable();
// for(let headerItem in data['data'][headerItem].title) {
//     console.log('header item: ' + headerItem);
// }

for(let headerItem in data['data']) {
    //console.log('header item: ' + headerItem);
    //console.log(data['data'][headerItem].body);
    this.fillRow(data['data'][headerItem].id, data['data'][headerItem].title, data['data'][headerItem].body, data['data'][headerItem].author, data['data'][headerItem].category_id, data['data'][headerItem].category_name);
}


}

 fillRow(ID, title, body, author, category_id, categoryName) {
   // fillRow(body) {

    let row = $('<tr></tr>');
    // row.append('<td>' + ID + '</td><td>' + title + '</td><td>' + body + '<td>' + author + '</td><td>' + '<td>' + category_id + '</td><td>' + categoryName + '</td>');
    row.append('<td>' + ID + '</td><td>' + title + '</td><td>' + body + '</td><td>' + author + '</td><td>' + category_id + '</td><td>' + categoryName + '</td>');
    
    this.table.find('tbody').append(row);
    //console.log('icinden');
    //console.log(body);
    //this.table.find('tbody').append(row);

}

resetTable() {
    this.table.find("tbody").empty();
}

// fillTable(data) {
//     for(let key in data) {
//         if(typeof data[key] != "object") {
//             this.fillRow(key, data[key]);
//         } else {
//             this.fillTable(data[key]);
//         }
//     }

// }

// fillTable(data) {
//     for(let key in data) {
//         console.log('luep: ', key);
//         this.fillRow(data[key]);
//     }

// }

// fillRow(key, value) {
//     let row = $("<tr></tr>");
//     row.append("<td>" + key + "</td><td>" + value + "</td>");

//     this.table.find("tbody").append(row);
// }

    
}